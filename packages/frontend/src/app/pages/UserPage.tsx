import { useAuth } from "../../Context";
import { LoginContainer } from "../../features/auth/components";

export function UserPage() {
  const { session } = useAuth();
  const { status: sessionStatus } = session;


  return (<div>
    {sessionStatus === "idle" &&
      <div>
        <h1>ログインしていません</h1>
        <LoginContainer />
      </div>
    }
    {sessionStatus === "active" &&
      <h1>ユーザー情報</h1>
    }

  </div>)
}
