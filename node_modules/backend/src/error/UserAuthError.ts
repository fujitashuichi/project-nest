export class UserAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserAuthError";
  }
}

export class EmailAlreadyRegisteredError extends UserAuthError {
  constructor(email: string) {
    super(`Email already registered: ${email}`);
    this.name = "EmailAlreadyRegisteredError";
  }
}

export class InvalidPasswordError extends UserAuthError {
  constructor() {
    super("Invalid password");
    this.name = "InvalidPasswordError";
  }
}
