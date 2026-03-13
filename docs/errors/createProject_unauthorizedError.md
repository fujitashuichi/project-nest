### 発生した不具合
2026/03/13 15:55
* E2Eテスト中に、login中にも関わらずcreateProject時に401が返る。また、明示的にloginしても解決しない。
* 直接の原因は```req.cookies.token```が undefined || invalid であることだとログから分かっている

2026/03/13/16:00
* Tokenがundefinedであることが確定
* res.cookieが {} の状態であるため、何らかの理由でcookie情報が消えている可能性あり。

```mermaid
graph TB
  note[/While E2E test/]
  register --> loggedIn((logged in))
  loggedIn --> createProject
  createProject --> Error[[401: UnAuthorized]]

  register --> login
  login --> loggedIn
```


### 考えられる原因
2026/03/13 16:10
* setIntervalによるlogin状態の追跡により、login処理後に再びlogoutしていることが判明した。
```npm run dev```によるE2Eテストにおいて、reload処理がcookieリセットを引き起こしていると考えた。

### reload原因説の否定
2026/03/13 16:25
* 動作フローにおいて、reloadはログイン失敗時以外には行われないため、reloadは原因ではないことが分かった
* したがって、BE側のCookie設定のミスである可能性が高くなっている

### リクエストヘッダーの確認
2026/03/13 16:40
* 少なくともcookieの保存はできているため、その後にorigin不一致などでセキュリティが働いている可能性が高い
```
set-cookie
token=...;
Max-Age=86400;
Path=/;
Expires=Sat, 14 Mar 2026 07:39:59 GMT;
HttpOnly;
Secure;
SameSite=Lax
```

---

### 解決
2026/03/13 17:20

```ts
const tokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env === "product",
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24, // 1日
};
```

* BEのCookie設定をENVで分岐しただけでは解決しなかった。
* その後、AIによるレスポンスヘッダーの解析を通して、
  FE側の``` credentials: 'include'```の欠落が原因だと判明した。
