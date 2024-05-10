import { chatbot } from "@/helpers/constants/chatbot";
import { chatbotPrompt } from "@/helpers/constants/chatbot-promt";
import { authOptions } from "@/lib/auth";
import {
  type ChatGPTMessage,
  type OpenAIStreamPayload,
  OpenAIStream,
} from "@/lib/openai-stream";
import { redis } from "@/lib/redis";
import { SendMessageSchema } from "@/lib/validators/message";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    const parsedMessage = SendMessageSchema.parse(message);

    await redis.zadd(`chat:${message.chatId}:messages`, {
      score: Date.now(),
      member: JSON.stringify({
        id: parsedMessage.id,
        senderId: session.user.id,
        receiverId: chatbot.id,
        text: parsedMessage.text,
        timestamp: Date.now(),
      }),
    });

    const outboundMessages: ChatGPTMessage[] = [
      {
        role: "user",
        content: parsedMessage.text,
      },
    ];

    outboundMessages.unshift({
      role: "system",
      content: chatbotPrompt,
    });

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo", // because gpt-4 is slower
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload, message.chatId, session.user.id);
    return new Response(stream);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 400 });
    }

    if (error instanceof Error) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
