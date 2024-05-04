import { getRedisCredentials } from "@/helpers/getRedisCredentials";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { addFriendValidator } from "@/lib/validators/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, token } = getRedisCredentials();

    const { email: emailToAdd } = addFriendValidator.parse(body);

    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd) {
      return new Response("User not found", { status: 404 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
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

    redis.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    return new Response("Ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 400 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}
