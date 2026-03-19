import { LoginRequestSchema, type LoginRequest } from "@pkg/shared";
import { parseFormData } from "../../../lib";
import { login } from "../api";
import type { AuthCtxType } from "../../../Context";
import { useMutation } from "@tanstack/react-query";

type Result = AuthCtxType["login"];

export const useLogin = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const mutation = useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: (isLoginSucceed) => {
      if (!isLoginSucceed) return setSessionStatus("inactive");
      return setSessionStatus("active");
    },
    onError: () => alert("通信に失敗しました。時間をおいて再度お試しください。")
  });


  const tryLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, LoginRequestSchema);

    if (!parsed.success) {
      setSessionStatus("inactive");
      alert("入力値に不備があります");
      return;
    }

    mutation.mutate(parsed.data);
  }


  const status = mutation.status === "success" ? "loggedIn" : mutation.status;

  return { status: status, login: tryLogin }
}
