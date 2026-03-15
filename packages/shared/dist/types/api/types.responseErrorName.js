import z from "zod";
const AuthErrorNameSchema = z.enum([
    "UnAuthorizedError", "EmailAlreadyRegisteredError", "InvalidPasswordError", "ConfirmPasswordError", "AuthError"
]);
const UserErrorNameSchema = z.enum([
    "UserUndefinedError", "UserError"
]);
const ProjectErrorNameSchema = z.enum([
    "DuplicateProjectError", "ProjectUndefinedError", "ProjectError"
]);
const SecurityErrorNameSchema = z.enum([
    "InvalidCharacterDetectedError", "InvalidRequestDataError", "SecurityError"
]);
export const ResponseErrorNameSchema = z.union([
    AuthErrorNameSchema,
    UserErrorNameSchema,
    ProjectErrorNameSchema,
    SecurityErrorNameSchema,
    z.literal("InternalServerError")
]);
