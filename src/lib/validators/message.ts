import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
  timestamp: z.number(),
});

export const MessageArraySchema = z.array(MessageSchema);

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

export const SendMessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  chatId: z.string(),
});

export type SendMessage = z.infer<typeof SendMessageSchema>;

export const SaveMessageSchema = z.object({
  chatId: z.string(),
  message: MessageSchema,
});

export type SaveMessage = z.infer<typeof SaveMessageSchema>;
