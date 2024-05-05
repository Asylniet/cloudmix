import { z } from "zod";

export const GPTMessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
});

export const GPTMessageArraySchema = z.array(GPTMessageSchema);

export type GPTMessage = z.infer<typeof GPTMessageSchema>;
