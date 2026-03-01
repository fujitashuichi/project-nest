export class DatabaseGetError extends Error {
  constructor(database: string, table: string) {
    super(`Failed to get ${table} from ${database}`);
    this.name = "DatabaseGetError";
  }
}