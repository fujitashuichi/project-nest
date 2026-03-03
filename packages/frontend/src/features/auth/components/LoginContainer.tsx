import { useEffect, useState } from "react"
import { isLoggedIn } from "../api/isLoggedIn";
import { LoginForm } from "./LoginForm";
import { AppButton } from "../../../components";

export type Status = "loading" | "loginSession" | "success" | "failed";

export function LoginContainer() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const result = await isLoggedIn();
      if (!result) {
        setStatus("loginSession")
      };
    }
    checkIsLoggedIn();
  }, []);

  return (
    <div>
      {status === "loading" && <LoadingUI />}
      {status === "loginSession" && <LoginForm setStatus={setStatus} /> }
      {status === "failed" && <FailedUI /> }
      {status === "success" && <SuccessUI /> }
    </div>
  )
}


const LoadingUI = () => (
  <div>
    <h1>Now Loading...</h1>
  </div>
)

const FailedUI = () => (
  <div>
    <h1>Loginに失敗しました</h1>
    <AppButton
      variant="primary"
      onClick={() => window.location.reload()}
    >再試行</AppButton>
  </div>
)

const SuccessUI = () => (
  <div>
    <h1>Loginしています</h1>
  </div>
)
