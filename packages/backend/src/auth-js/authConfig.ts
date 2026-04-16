import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { verifyToken } from "../lib/jwt.js";
import { AuthError, UnAuthorizedError } from "../error/AuthError.js";
import { ExpressAuthConfig } from "@auth/express";
import { UserUndefinedError } from "../error/UserError.js";
import { JWTPayload } from "../types/types.payload.js";


const service = new UserService();

export const authConfig: ExpressAuthConfig = {
  basePath: "/api/auth/v2",
  cookies: {
    sessionToken: {
      name: `token`, // ここを既存の名称に合わせる
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  jwt: {
    decode: async ({ token }) => {
      // getSession / auth() / getToken

      if (!token) return null;

      try {
        const verified = verifyToken(token);

        const user = await service.findByEmail(verified.email);
        if (!user) throw new UserUndefinedError();

        // これが callbacks.jwt( { token } ) の引数になる
        return {
          sub: user.id,
          email: user.email
        };
      } catch (e) {
        return null;
      }
    }
  },


  // どうやってユーザーを特定するか
  providers: [
    Credentials({
      authorize: async (_credentials, req) => {
        // signIn (POSTリクエストのみ)

        const cookies: string[] | undefined = req.headers.get("cookie")?.split("; ");
        const token: string | undefined = cookies?.find(
          str => str.startsWith("token=")
        )?.split("=").slice(1).join("=");
        if (!token) throw new UnAuthorizedError();

        const verified: JWTPayload = verifyToken(token);

        const user = await service.findByEmail(verified.email);
        if (user === null) throw new UserUndefinedError();

        return user;
      }
    })
  ],


  // 認証成功時のデータ制御
  callbacks: {
    jwt: ({ token, user }) => {
      // getSession / signIn

      if (user) {
        if (!user.id) throw new AuthError("user.id undefined", "AuthError");
        if (!user.email) throw new AuthError("user.email undefined", "AuthError");

        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      // getSession / auth()

      if (session.user) {
        if (!token.sub) throw new AuthError("token.sub undefined", "AuthError");
        if (!token.email) throw new AuthError("token.email undefined", "AuthError");

        session.user.id = token.sub;
        session.user.email = token.email
      }

      return session;
    }
  }
}
