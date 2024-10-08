import { z } from "zod";

export const createBugSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be a string." })
    .min(4, { message: "Title must be at least 4 characters." })
    .max(255, { message: "Title must be at most 255 characters." }),
  description: z
    .string({ invalid_type_error: "Description must be a string." })
    .min(4, { message: "Description must be at least 4 characters." })
    .max(255, {
      message: "Description must be at most 255 characters.",
    }),
});
