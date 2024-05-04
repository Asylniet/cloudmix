import { authOptions } from "@/lib/auth";
import { addFriendValidator } from "@/lib/validators/add-friend";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body);

    const RestResponse = await fetch(
      `${process.env.REDIS_URL}/get/user:email${emailToAdd}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REDIS_SECRET}`,
        },
        cache: "no-store",
      }
    );

    const data = (await RestResponse.json()) as { result: string };
    const idToAdd = data.result;

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
  } catch (error) {}
}
