import { z } from "zod";

export const IncomingFriendRequestSchema = z.object({
  senderId: z.string(),
  senderEmail: z.string().email(),
});

export type IncomingFriendRequest = z.infer<typeof IncomingFriendRequestSchema>;
