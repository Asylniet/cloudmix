import { fetchRedis } from "@/helpers/redis";
import {
  Message,
  MessageArraySchema,
  SaveMessage,
  SendMessage,
} from "@/lib/validators/message";
import axios from "axios";
import { z } from "zod";

class MessageAPI {
  getChatMessages = async (chatId: string) => {
    try {
      const results: string[] = await fetchRedis(
        "zrange",
        `chat:${chatId}:messages`,
        0,
        -1
      );
      const dbMessages = results.map(
        (message) => JSON.parse(message) as Message
      );

      const reversedDbMessages = dbMessages.reverse();

      const messages = MessageArraySchema.parse(reversedDbMessages);
      return messages;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0].message);
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An error occurred while fetching messages");
    }
  };

  sendMessage = async (params: SendMessage) => {
    const response = await axios.post("/api/message/send", params);
    return response.data;
  };

  sendGptMessage = async (params: SendMessage) => {
    const response = await fetch("/api/message/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: params }),
    });

    if (!response.ok) throw new Error("Failed to send message");

    return response.body;
  };
}

export const messageAPI = new MessageAPI();
