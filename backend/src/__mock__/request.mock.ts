import { Request } from "express"
import { mockReq } from "sinon-express-mock"
import { RegisterDto } from "../types/types.dto.js"

export const requestMocks = {
  validRegisterHttpReq: (): Request => {
    const data: RegisterDto = {
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
}