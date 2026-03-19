import { LoginForm } from "./LoginForm";
import { AppButton } from "../../../components";
import { AppLoadingBar } from "../../../components/AppLoadingBar";
import { useAuth } from "../../../Context";

export function LoginContainer() {
  const { login } = useAuth();
  const { status } = login;

  return (
    <div>
      {status === "idle" && <LoginForm />}
      {status === "pending" && <LoadingUI />}
      {status === "error" && <FailedUI /> }
      {status === "loggedIn" && <h1>ログイン成功</h1>}
    </div>
  )
}


const LoadingUI = () => (
  <div>
    <h2>Now Loading...</h2>
    <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
  </div>
)

const FailedUI = () => (
  <div>
    <h2>Loginに失敗しました</h2>
    <AppButton
      variant="primary"
      className="w-auto"
      onClick={() => window.location.reload()}
    >再試行</AppButton>
  </div>
)
