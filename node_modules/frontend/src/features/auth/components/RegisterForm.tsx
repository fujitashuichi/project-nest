import { useState } from "react"

function RegisterForm() {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const confirmPassword = (): boolean => {
    if (password !== passwordConfirm) {
      alert("パスワード確認が一致しません");
      return false;
    }
    return true;
  }

  const register = () => {
    const confirmResult = confirmPassword();
    if (!confirmResult) return;

  }

  return (
    <form action={register}>
      <label htmlFor="email">email</label>
      <input type="email" />

      <label htmlFor="password">password</label>
      <input
        type="password" min={8} max={20}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="passwordConfirm">type password again</label>
      <input
        type="password" min={8} max={20}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button type="submit">submit</button>
    </form>
  )
}

export default RegisterForm
