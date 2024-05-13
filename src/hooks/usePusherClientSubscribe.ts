import { pusherClient } from "@/lib/pusherClient";
import { convertToPusherKey } from "@/lib/utils";
import { useEffect } from "react";

type PusherClientSubscribeProps = {
  subscribeKey: string;
  bindKey: string;
  handler: (data: any) => void;
};
/**
 * Subscribes to a Pusher channel and binds an event handler.
 *
 * @param subscribeKey - The key of the channel to subscribe to.
 * @param bindKey - The key of the event to bind the handler to.
 * @param handler - The event handler function.
 */
export const usePusherClientSubscribe = async ({
  subscribeKey,
  bindKey,
  handler,
}: PusherClientSubscribeProps) => {
  useEffect(() => {
    pusherClient.subscribe(convertToPusherKey(subscribeKey));
    pusherClient.bind(bindKey, handler);
    return () => {
      pusherClient.unsubscribe(subscribeKey);
      pusherClient.unbind(bindKey);
    };
  }, [bindKey, handler, subscribeKey]);
};
