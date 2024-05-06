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

const MessageNotificationSchema = z.object({
  senderImg: z.string(),
  senderName: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
export type MessageNotification = z.infer<typeof MessageNotificationSchema> &
  Message;
