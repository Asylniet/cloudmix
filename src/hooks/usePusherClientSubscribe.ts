import { pusherClient } from "@/lib/pusherClient";
import { convertToPusherKey } from "@/lib/utils";
import { useEffect } from "react";

type PusherClientSubscribeProps = {
  subscribeKey: string;
  bindKey: string;
  handler: (data: any) => void;
};
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
