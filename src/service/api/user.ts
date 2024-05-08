import { fetchRedis } from "@/helpers/redis";
import { IncomingFriendRequestSchema } from "@/lib/validators/incomingRequest";
import { User, UserSchema } from "@/lib/validators/user";
import axios from "axios";

class UserAPI {
  searchUsers = async (query: string) => {
    const response = await axios.get<User[]>(
      `/api/users/search?query=${query}`
    );
    return response.data;
  };

  addFriend = async (id: string) => {
    const response = await axios.post(`/api/friends/add`, { id });
    return response.data;
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
