import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import Messages from "@/components/chat/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { User } from "@/lib/validators/user";
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
  const [userId1, userId2] = chatId.split("--");
  if (![userId1, userId2].includes(user.id)) notFound();

  const chatPartnerId = userId1 === user.id ? userId2 : userId1;
  const chatPartnerString = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerString) as User;

  const initialMessages = await messageAPI.getChatMessages(chatId);
  return (
    <div className="flex flex-col flex-1 justify-between bg-accent h-full max-h-screen">
      <ChatHeader chatPartner={chatPartner} />
      <Messages
        chatId={chatId}
        chatPartner={chatPartner}
        initialMessages={initialMessages}
      />
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default ChatPage;
