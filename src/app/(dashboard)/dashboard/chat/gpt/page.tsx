import ChatProvider from "@/components/ChatProvider";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import Messages from "@/components/chat/Messages";
import { chatbot } from "@/helpers/constants/chatbot";
import { authOptions } from "@/lib/auth";
import { chatHRefConstructor } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { messageAPI } from "@/service/api/message";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

type GPTPageProps = {};

const GPTPage: FC<GPTPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const chatPartner = chatbot;
  const chatId = chatHRefConstructor(session?.user.id, chatPartner.id);
  const initialMessages = await messageAPI.getChatMessages(chatId);

  if (initialMessages.length === 0) {
    const message: Message = {
      id: nanoid(),
      senderId: chatbot.id,
      receiverId: session?.user.id,
      text: "Hello! I'm GPT-3, a language model AI developed by OpenAI. How can I help you today?",
      timestamp: Date.now(),
    };
    initialMessages.push(message);
  }

  return (
    <ChatProvider
      chatType="gpt"
      initialMessages={initialMessages}
      chatId={chatId}
      chatPartner={chatPartner}
    >
      <div className="flex flex-col flex-1 justify-between bg-accent h-full max-h-screen">
        <ChatHeader chatPartner={chatPartner} />
        <Messages />
        <ChatInput />
      </div>
    </ChatProvider>
  );
};

export default GPTPage;
