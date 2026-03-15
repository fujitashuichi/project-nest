import { ResponseErrorName } from "@pkg/shared";

export class ResponseError extends Error {
  constructor(message: string, errorName: ResponseErrorName) {
    super(message);
    this.name = errorName;
  }
}