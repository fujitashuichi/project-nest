import { createAppDb } from "../db/app.db.js"
import { RegisterService } from "../service/register.service.js"

const db = await createAppDb(":memory:");

export const serviceMock = {
  register: () => {
    return new RegisterService(db);
  }
}