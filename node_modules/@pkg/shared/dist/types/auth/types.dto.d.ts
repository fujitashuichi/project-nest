import z from "zod";
export declare const RegisterRequestSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export declare const RegisterResponseSchema: z.ZodUnion<[z.ZodVoid, z.ZodObject<{}, z.core.$strip>]>;
export type ResisterResponse = z.infer<typeof RegisterResponseSchema>;
