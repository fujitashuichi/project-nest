import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodEmail;
    createdAt: z.ZodNumber;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
