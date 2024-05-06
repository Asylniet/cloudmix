import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { Message, MessageSchema } from "@/lib/validators/message";
import { User } from "@/lib/validators/user";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { pusherServer } from "@/lib/pusherServer";
import { convertToPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { text, chatId } = await req.json();
    // TODO: Validate text and chatId
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const [chatId1, chatId2] = chatId.split("--");

    if (session.user.id !== chatId1 && session.user.id !== chatId2) {
      return new Response("Unauthorized", { status: 401 });
    }

    const friendId = session.user.id === chatId1 ? chatId2 : chatId1;

    const friendList = (await fetchRedis(
      "smembers",
      `user:${session.user.id}:friends`
    )) as string[];
    const isFriend = friendList.includes(friendId);

    if (!isFriend) {
      return new Response("Unauthorized", { status: 401 });
    }

    const senderString = (await fetchRedis(
      "get",
      `user:${session.user.id}`
    )) as string;
    const sender = JSON.parse(senderString) as User;

    const messageData: Message = {
      id: nanoid(),
      senderId: session.user.id,
      receiverId: friendId,
      text,
      timestamp: Date.now(),
    };

    const message = MessageSchema.parse(messageData);

    pusherServer.trigger(
      convertToPusherKey(`chat:${chatId}`),
      "incoming_message",
      message
    );

    pusherServer.trigger(
      convertToPusherKey(`user:${friendId}:chats`),
      "new_message",
      {
        ...message,
        senderImg: sender.image,
        senderName: sender.name,
      }
    );

    await redis.zadd(`chat:${chatId}:messages`, {
      score: Date.now(),
      member: JSON.stringify(message),
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
