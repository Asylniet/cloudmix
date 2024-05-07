import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google";
import { redis } from "./redis";
import { User } from "./validators/user";
import { fetchRedis } from "@/helpers/redis";
import { getGoogleCredentials } from "@/helpers/getGoogleCredentials";

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV !== "development",
  theme: {
    colorScheme: "auto",
    brandColor: "#9969FF",
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [GoogleProvider(getGoogleCredentials())],
  callbacks: {
    async jwt({ token, user }) {
      const dbUserResult = (await fetchRedis("get", `user:${token.id}`)) as
        | string
        | null;
      if (!dbUserResult) {
        token.id = user.id;
        return token;
      }

      const dbUser = JSON.parse(dbUserResult) as User;
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
