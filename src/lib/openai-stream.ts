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

  const stream = new ReadableStream({
    async start(controller) {
      async function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
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
      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
