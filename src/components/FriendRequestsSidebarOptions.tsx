"use client";

import { pusherClient } from "@/lib/pusherClient";
import { convertToPusherKey } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import SidebarItem from "./sidebar/SidebarItem";

interface FriendRequestSidebarOptionsProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  useEffect(() => {
    pusherClient.subscribe(
      convertToPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = () => {
      setUnseenRequestCount((prev) => prev + 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        convertToPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  return (
    <div className="relative">
      <SidebarItem
        name="Friend Requests"
        Icon={<UserIcon />}
        href="/dashboard/requests"
      />
      {unseenRequestCount > 0 ? (
        <div className="flex justify-center items-center bg-primary rounded-full w-5 h-5 text-background text-xs">
          {unseenRequestCount}
        </div>
      ) : null}
    </div>
  );
};

export default FriendRequestSidebarOptions;
