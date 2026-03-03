import { LoginRequest, RegisterRequest } from "@pkg/shared";
import { Request } from "express"
import { mockReq } from "sinon-express-mock"

export const requestMocks = {
  register: {
    validRegisterHttpReq: (): Request => {
      const data: RegisterRequest = {
        email: "example@github.com",
        password: "password"
      }

      return mockReq({ body: data });
    },

    invalidRegisterHttpReq_1: (): Request => {
      return mockReq({
        email: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaa"],
        password: "password".repeat(9),
        role: "admin",
        isAdmin: true,
        __proto__: { "polluted": true }
      })
    },
    invalidRegisterHttpReq_2: (): Request => {
      return mockReq({
        email: "><script>document.location='http://attacker.com</script>@example.com",
        password: null
      })
    },
  },

  login: {
    validRequestHttpReq: (): Request => {
      const data: LoginRequest = {
        email: "example@gmeil.com",
        password: "password"
      }

      return mockReq({ body: data });
    },

    invalidRegisterHttpReq_1: (): Request => {
      return mockReq({
        email: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaa"],
        password: "password".repeat(9),
        role: "admin",
        isAdmin: true,
        __proto__: { "polluted": true }
      })
    },
    invalidRegisterHttpReq_2: (): Request => {
      return mockReq({
        email: "><script>document.location='http://attacker.com</script>@example.com",
        password: null
      })
    },
  }
}