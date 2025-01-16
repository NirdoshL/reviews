import { z } from "zod";

export const singleReviewSchema = z.object({
  sitename: z.string().min(1, { message: "Site Name is required" }),
});
export type singleReviewSchemaType = z.infer<typeof singleReviewSchema>;
