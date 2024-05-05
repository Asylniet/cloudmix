import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google";
import { redis } from "./redis";
import { User } from "./validators/user";
import { fetchRedis } from "@/helpers/redis";

function getGoogleCredentials() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!googleClientId || googleClientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!googleClientSecret || googleClientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV !== "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
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
