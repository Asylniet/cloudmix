import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { Message, MessageArray } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC } from "react";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = MessageArray.parse(reversedDbMessages);
    return messages;
  } catch (error) {
    notFound();
  }
}

const ChatPage: FC<ChatPageProps> = async ({ params }) => {
  const { chatId } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (userId1 !== user.id && userId2 !== user.id) notFound();

  const chatPartnerId = userId1 === user.id ? userId2 : userId1;
  const chatPartnerString = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerString) as User;
  const initialMessages = await getChatMessages(chatId);

  return (
    <div className="flex flex-col flex-1 justify-between h-full max-h-[calc(100vh-6rem)]">
      <div className="flex justify-between sm:items-center py-3 border border-b-2">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Image
                fill
                referrerPolicy="no-referrer"
                src={chatPartner.image}
                alt={`${chatPartner.name}'s profile picture`}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col leading-right">
            <div className="flex items-center text-xl">
              <span className="mr-4 font-semibold text-accent">
                {chatPartner.name}
              </span>
            </div>
            <span className="text-accent text-sm">{chatPartner.email}</span>
          </div>
        </div>
      </div>
      <Messages
        sessionImg={session.user.image}
        sessionName={session.user.name}
        chatPartner={chatPartner}
        sessionId={session.user.id}
        initialMessages={initialMessages}
      />
      <ChatInput chatPartner={chatPartner} chatId={chatId} />
    </div>
  );
};

export default ChatPage;
