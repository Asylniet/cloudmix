import {
  createParser,
  type ParsedEvent,
  type ReconnectInterval,
} from "eventsource-parser";
import { redis } from "./redis";
import { Message } from "./validators/message";
import { chatbot } from "@/helpers/constants/chatbot";
import { nanoid } from "nanoid";

export type ChatGPTAgent = "user" | "system";

export type ChatGPTMessage = {
  role: ChatGPTAgent;
  content: string;
};

export type OpenAIStreamPayload = {
  model: "gpt-3.5-turbo" | "gpt-4";
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

/**
 * Sends a stream of messages to OpenAI's chat API and returns a readable stream of responses.
 *
 * @param payload - The payload object containing the message input and other parameters.
 * @param chatId - The ID of the chat session.
 * @param userId - The ID of the user initiating the chat.
 * @returns A readable stream of responses from the OpenAI chat API.
 * @throws An error if the API response is invalid.
 */
export async function OpenAIStream(
  payload: OpenAIStreamPayload,
  chatId: string,
  userId: string
) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  let fullText = "";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (res?.status !== 200) {
    throw new Error("Invalid response");
  }

  /**
   * Represents a readable stream used for parsing and processing data from an OpenAI API response.
   */
  const stream = new ReadableStream({
    async start(controller) {
      async function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            // Close the stream and save the final message
            controller.close();
            const message: Message = {
              id: nanoid(),
              senderId: chatbot.id,
              receiverId: userId,
              text: fullText,
              timestamp: Date.now(),
            };
            await redis.zadd(`chat:${chatId}:messages`, {
              score: Date.now(),
              member: JSON.stringify(message),
            });
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            fullText += text;

            if (counter < 2 && (text.match(/\\n/) || []).length) return;

            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (error) {
            controller.error(error);
          }
        }
      }

      // Create a parser to handle parsing the response data
      const parser = createParser(onParse);

      // Iterate over the response body chunks and feed them to the parser
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
