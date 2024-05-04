import { User } from "@/lib/validators/user";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    name: string;
    email: string;
    image: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
