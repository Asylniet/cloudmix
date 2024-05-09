import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { pusherServer } from "@/lib/pusherServer";
import { redis } from "@/lib/redis";
import { convertToPusherKey } from "@/lib/utils";
import { UserSchema } from "@/lib/validators/user";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const alreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (alreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    const [userRaw, friendRaw] = (await Promise.all([
      fetchRedis("get", `user:${session.user.id}`),
      fetchRedis("get", `user:${idToAdd}`),
    ])) as [string, string];

    const user = UserSchema.parse(JSON.parse(userRaw));
    const friend = UserSchema.parse(JSON.parse(friendRaw));

    pusherServer.trigger(
      convertToPusherKey(`user:${idToAdd}:friends`),
      "new_friend",
      user
    );

    pusherServer.trigger(
      convertToPusherKey(`user:${session.user.id}:friends`),
      "new_friend",
      friend
    );

    await redis.sadd(`user:${session.user.id}:friends`, idToAdd);

    await redis.sadd(`user:${idToAdd}:friends`, session.user.id);

    await redis.srem(
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    );

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}
