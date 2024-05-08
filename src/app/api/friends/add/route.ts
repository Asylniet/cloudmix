import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { pusherServer } from "@/lib/pusherServer";
import { redis } from "@/lib/redis";
import { convertToPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { id: idToAdd } = body;

    if (!idToAdd) {
      return new Response("No user provided", { status: 404 });
    }

    if (idToAdd === session.user.id) {
      return new Response("You can't add yourself", { status: 400 });
    }

    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as boolean;
    if (isAlreadyAdded) {
      return new Response("Already sent the request", { status: 400 });
    }

    const isAlreadyFriend = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:friends`,
      session.user.id
    )) as boolean;
    if (isAlreadyFriend) {
      return new Response("Already friends", { status: 400 });
    }

    pusherServer.trigger(
      convertToPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      "incoming_friend_requests",
      {
        id: session.user.id,
        email: session.user.email,
        image: session.user.image,
        name: session.user.name,
      }
    );

    redis.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    return new Response("Ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 400 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}
