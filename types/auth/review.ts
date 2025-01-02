import { z } from "zod";

export const reviewSchema = z.object({
  sitename: z.string().min(1, { message: "Site Name is required" }),
  placeid: z
    .string()
    .min(2, { message: "Place Id must be at least 2 characters long" })
    .trim(),
});
export type reviewSchemaType = z.infer<typeof reviewSchema>;
