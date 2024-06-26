import { fetchRedis } from "@/helpers/redis";
import { User, UserSchema } from "@/lib/validators/user";
import axios from "axios";

class UserAPI {
  getUser = async (id: string) => {
    try {
      const userRaw = await fetchRedis("get", `user:${id}`);
      const user = UserSchema.parse(JSON.parse(userRaw));
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  };
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

  acceptFriend = async (id: string) => {
    const response = await axios.post<string>("/api/friends/accept", {
      id,
    });
    return response.data;
  };

  denyFriend = async (id: string) => {
    const response = await axios.post<string>("/api/friends/deny", {
      id,
    });
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
