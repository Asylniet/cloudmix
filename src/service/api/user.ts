import { fetchRedis } from "@/helpers/redis";
import { IncomingFriendRequestSchema } from "@/lib/validators/incomingRequest";
import { UserSchema } from "@/lib/validators/user";

class UserAPI {
  searchUsers = async (query: string) => {
    try {
      const allKeys = await fetchRedis("keys", "user:*");
      const matchingUsers = [];

      for (const key of allKeys) {
        const data = key.split("user:")[1];
        if (!data.includes(":")) {
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

      return matchingUsers;
    } catch (error) {
      throw new Error(`Something went wrong`);
    }
  };

  getIncomingFriendRequests = async (userId: string) => {
    try {
      const incomingRequestIds = (await fetchRedis(
        "smembers",
        `user:${userId}:incoming_friend_requests`
      )) as string[];

      const incomingRequests = [];
      for (const userId of incomingRequestIds) {
        const requestRaw = await fetchRedis("get", `user:${userId}`);
        const request = UserSchema.parse(JSON.parse(requestRaw));
        incomingRequests.push(request);
      }

      return incomingRequests;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  };
}

export const userAPI = new UserAPI();
