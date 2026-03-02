import type { SetStateAction } from "react";
import type { Status } from "./LoginModule";
import { parseFormData } from "../../../lib";
import { LoginRequestSchema } from "@pkg/shared";
import { login } from "../api/login";

export function LoginForm(setStatus: React.Dispatch<SetStateAction<Status>>) {
  const tryLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, LoginRequestSchema);

    if (!parsed.success) {
      alert("入力値に不備があります");
      return;
    }

    const data = parsed.data;
    const result = await login({ email: data.email, password:data.password });
    if (!result.ok) {
      setStatus("failed");
      console.error(result.error);
      return;
    }

    setStatus("success");
    return;
  }

  return (
    <form onSubmit={(e) => tryLogin(e)}>
      <label htmlFor="email">email</label>
      <input type="email" placeholder="example@email.com" />

      <label htmlFor="password">password</label>
      <input type="password" min={8} max={20} placeholder="8～20字" />

      <button type="submit">submit</button>
    </form>
  )
}