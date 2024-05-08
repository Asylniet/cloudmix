import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { UserSchema } from "@/lib/validators/user";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    const allKeys = await fetchRedis("keys", "user:*");
    const matchingUsers = [];

    for (const key of allKeys) {
      const data = key.split("user:")[1];
      if (!data.includes(":")) {
        const userId = key.split("user:")[1];
        if (userId === session.user.id) continue;
        const userRaw = await fetchRedis("get", key);
        const user = UserSchema.parse(JSON.parse(userRaw));
        if (
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        ) {
          matchingUsers.push(user);
        }
      }
    }

    return new Response(JSON.stringify(matchingUsers));
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
