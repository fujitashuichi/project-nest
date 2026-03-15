import z from "zod";
export declare const ResponseErrorNameSchema: z.ZodUnion<readonly [z.ZodEnum<{
    UnAuthorizedError: "UnAuthorizedError";
    EmailAlreadyRegisteredError: "EmailAlreadyRegisteredError";
    InvalidPasswordError: "InvalidPasswordError";
    ConfirmPasswordError: "ConfirmPasswordError";
    AuthError: "AuthError";
}>, z.ZodEnum<{
    UserUndefinedError: "UserUndefinedError";
    UserError: "UserError";
}>, z.ZodEnum<{
    DuplicateProjectError: "DuplicateProjectError";
    ProjectUndefinedError: "ProjectUndefinedError";
    ProjectError: "ProjectError";
}>, z.ZodEnum<{
    InvalidCharacterDetectedError: "InvalidCharacterDetectedError";
    InvalidRequestDataError: "InvalidRequestDataError";
    SecurityError: "SecurityError";
}>, z.ZodLiteral<"InternalServerError">]>;
export type ResponseErrorName = z.infer<typeof ResponseErrorNameSchema>;
