import { ResponseError } from "./ResponseError.js";

export class DatabaseGetError extends ResponseError {
  constructor(database: string, table: string) {
    super(`Failed to get ${table} from ${database}`, "InternalServerError");
  }
}