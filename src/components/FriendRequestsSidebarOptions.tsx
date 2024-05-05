"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

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
  return (
    <Link
      href="/dashboard/requests"
      className="flex items-center gap-x-3 hover:bg-accent p-2 rounded-md font-semibold text-foreground text-sm hover:text-primary leading-6 group"
    >
      <div className="group-hover:text-primary flex justify-center items-center border-accent group-hover:border-primary bg-background border rounded-lg w-6 h-6 font-medium text-[0.625rem] text-muted shrink-0">
        <User className="w-4 h-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {unseenRequestCount > 0 ? (
        <div className="flex justify-center items-center bg-primary rounded-full w-5 h-5 text-background text-xs">
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebarOptions;
