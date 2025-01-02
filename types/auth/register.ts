import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 character long" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .trim()
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .trim(),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
