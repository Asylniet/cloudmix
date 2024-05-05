import AddFriendButton from "@/components/AddFriendButton";
import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { User } from "@/lib/validators/user";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

type RequestsPageProps = {};

const RequestsPage: FC<RequestsPageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: senderParsed.email,
      };
    })
  );

  return (
    <main className="pt-8">
      <h1 className="mb-8 font-bold text-5xl">Add a friend</h1>
      <div className="flex-col gap-4 fkex">
        <FriendRequests
          incomingRequests={incomingRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default RequestsPage;