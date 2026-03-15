import { ResponseErrorName } from "@pkg/shared";
import { ResponseError } from "./ResponseError.js";

export class SecurityError extends ResponseError {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message, errorName);
  }
}

export class InvalidCharacterDetectedError extends SecurityError {
  constructor() {
    super("Security: InvalidCharacterDetected", "InvalidCharacterDetectedError");
  }
}

export class InvalidRequestDataError extends SecurityError {
  constructor() {
    super("Security: InvalidRequestData", "InvalidRequestDataError");
  }
}
