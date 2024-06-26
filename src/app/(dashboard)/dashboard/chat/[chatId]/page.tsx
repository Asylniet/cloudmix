import ChatProvider from "@/components/ChatProvider";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import Messages from "@/components/chat/Messages";
import { useGetChatPartner } from "@/hooks/useGetChatPartner";
import { authOptions } from "@/lib/auth";
import { messageAPI } from "@/service/api/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

const ChatPage: FC<ChatPageProps> = async ({ params }) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { user } = session;
  const chatPartner = await useGetChatPartner(chatId, user.id);
  const initialMessages = await messageAPI.getChatMessages(chatId);

  return (
    <ChatProvider
      chatType="friend"
      chatPartner={chatPartner}
      chatId={chatId}
      initialMessages={initialMessages}
    >
      <div className="flex flex-col flex-1 justify-between bg-accent h-full max-h-screen">
        <ChatHeader chatPartner={chatPartner} />
        <Messages />
        <ChatInput />
      </div>
    </ChatProvider>
  );
};

export default ChatPage;
