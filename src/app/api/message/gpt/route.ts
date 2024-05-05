import { chatbotPrompt } from "@/helpers/constants/chatbot-promt";
import {
  type ChatGPTMessage,
  type OpenAIStreamPayload,
  OpenAIStream,
} from "@/lib/openai-stream";
import { GPTMessageArraySchema } from "@/lib/validators/gptMessage";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = GPTMessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

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

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
