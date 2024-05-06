import { fetchRedis } from "@/helpers/redis";
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
}

export const userAPI = new UserAPI();
