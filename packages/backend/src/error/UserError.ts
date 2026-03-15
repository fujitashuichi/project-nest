import { ResponseErrorName } from "@pkg/shared";
import { ResponseError } from "./ResponseError.js";

export class UserError extends ResponseError {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message, errorName);
  }
}


export class UserUndefinedError extends UserError {
  constructor() {
    super("UserData undefined: searching User is not registered", "UserUndefinedError");
  }
}
