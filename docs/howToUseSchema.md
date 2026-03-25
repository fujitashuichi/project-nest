## shared: 2種類のスキーマについて

* 大きく分けて以下の2種類のスキーマを置く
  * **types.data**: アプリ全体での基本となるデータ定義。Prismaスキーマと整合する
  * **types.dto**: dto用に pick/omit や transform を施したもの

---

## frontend: Form用スキーマについて
* 基本的にsharedの types.dto からrequest用のスキーマを使用する
* ### Formの空文字の扱いについて
  * 未入力のFormは空文字を返すため、types.dto に合わせる必要がある
* ### parseFormData の利用
  * parseFormData() は、空文字の扱いを指定しつつパースする
  ```ts
  const parsed = await parseFormData({
    formData,
    schema: PatchProjectRequestSchema,
    useFor: "update"
  });
  ```
  * useFor プロパッティによって、Prismaスキーマに整合するように空文字を変換する
  * create: "" が null に変換された後にパースする
  * update: "" が undefined に変換された後にパースする
  * noEmptyValues: "" を変換せずにパースする

---

## shared: schemaTransformerについて
* toPrismaUpdateのは以下の2つの機能がある
  * undefined の項目が排除される
  * 全項目が { set: xxx } に整形される
```ts
schema.transform(schemaTransformer.toPrismaUpdate);
```
※toPrismaCreateは types.data そのものになるので、必要がない
