import { z } from "zod";

const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
const statusEnum = z.enum(["OPEN", "IN_PROGRESS", "RESOLVED"]);

export const createBugSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be a string." })
    .min(4, { message: "Title must be at least 4 characters." })
    .max(50, { message: "Title must be at most 50 characters." }),
  summary: z
    .string({ invalid_type_error: "Summary must be a string." })
    .min(4, { message: "Summary must be at least 4 characters." })
    .max(50, { message: "Summary must be at most 50 characters." }),
  description: z
    .string({ invalid_type_error: "Description must be a string." })
    .min(4, { message: "Description must be at least 4 characters." })
    .max(1000, { message: "Description must be at most 1000 characters." }),
  status: statusEnum.default("OPEN"),
  priority: priorityEnum.default("LOW"),
});

export const patchBugSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 character.")
    .max(50, "Title must be at most 50 characters.")
    .optional(),
  summary: z
    .string()
    .min(4, "Summary must be at least 4 character.")
    .max(50, "Summary must be at most 50 characters.")
    .optional(),
  description: z
    .string()
    .min(4, "Description must be at least 4 character.")
    .max(1000, "Description must be at most 1000 characters.")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned to must be at least 1 character.")
    .max(255, "Assigned to must be at most 255 characters.")
    .optional()
    .nullable(),
});
