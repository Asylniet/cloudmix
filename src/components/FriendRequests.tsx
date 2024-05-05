"use client";

import { IncomingFriendRequest } from "@/lib/validators/incomingRequest";
import { CheckIcon, UserPlusIcon, XIcon } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type FriendRequestsProps = {
  incomingRequests: IncomingFriendRequest[];
  sessionId: string;
};

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingRequests,
  sessionId,
}) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] =
    useState<IncomingFriendRequest[]>(incomingRequests);

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", {
      id: senderId,
      sessionId,
    });

    setFriendRequests((prev) =>
      prev.filter((req) => req.senderId !== senderId)
    );

    router.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", {
      id: senderId,
      sessionId,
    });

    setFriendRequests((prev) =>
      prev.filter((req) => req.senderId !== senderId)
    );

    router.refresh();
  };
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-muted text-sm">No friend requests</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4">
            <UserPlusIcon />
            <p className="font-medium text-lg">{request.senderEmail}</p>
            <Button
              aria-label="accept friend"
              size="icon"
              className="transition"
              onClick={() => acceptFriend(request.senderId)}
            >
              <CheckIcon className="w-3/4 h-3/4 font-semibold text-background" />
            </Button>
            <Button
              aria-label="reject friend"
              variant="destructive"
              size="icon"
              onClick={() => denyFriend(request.senderId)}
            >
              <XIcon className="w-3/4 h-3/4 font-semibold text-background" />
            </Button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
