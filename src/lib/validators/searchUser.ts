import { z } from "zod";

export const searchUserSchema = z.object({
  query: z.string(),
});

export type SearchUser = z.infer<typeof searchUserSchema>;
