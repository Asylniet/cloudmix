import { fetchRedis } from "@/helpers/redis";
import { Message, MessageArray } from "@/lib/validators/message";
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

      const messages = MessageArray.parse(reversedDbMessages);
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

  sendMessage = async (params: { chatId: string; text: string }) => {
    const response = await axios.post("/api/message/send", params);
    return response.data;
  };
}

export const messageAPI = new MessageAPI();
