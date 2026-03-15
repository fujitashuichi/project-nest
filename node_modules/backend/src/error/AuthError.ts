import { ResponseErrorName } from "@pkg/shared";
import { ResponseError } from "./ResponseError.js";

export class AuthError extends ResponseError {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message, errorName);
  }
}

export class UnAuthorizedError extends AuthError {
  constructor() {
    super("User UnAuthorized: token was undefined or invalid", "UnAuthorizedError");
  }
}

// register
export class EmailAlreadyRegisteredError extends AuthError {
  constructor(email: string) {
    super(`Email already registered: ${email}`, "EmailAlreadyRegisteredError");
  }
}

export class InvalidPasswordError extends AuthError {
  constructor() {
    super("Invalid password", "InvalidPasswordError");
  }
}

// login
export class ConfirmPasswordError extends AuthError {
  constructor() {
    super("Login failed: password is wrong", "ConfirmPasswordError");
  }
}
