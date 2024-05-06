import { getPusherClientCredentials } from "@/helpers/getPusherCredentials";
import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(getPusherClientCredentials().key, {
  cluster: getPusherClientCredentials().cluster,
});
