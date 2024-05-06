import { getPusherServerCredentials } from "@/helpers/getPusherCredentials";
import PusherServer from "pusher";

export const pusherServer = new PusherServer({
  ...getPusherServerCredentials(),
  useTLS: true,
});
