import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
  timestamp: z.number(),
});

export const MessageArray = z.array(MessageSchema);

export const ChatShema = z.object({
  id: z.string(),
  messages: z.array(MessageSchema),
});

export type Message = z.infer<typeof MessageSchema>;
