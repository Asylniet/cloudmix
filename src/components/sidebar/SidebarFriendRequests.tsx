"use client";

import { CheckIcon, InboxIcon, XIcon } from "lucide-react";
import { FC } from "react";
import { useSessionContext } from "@/hooks/useSessionContext";
import { usePusherClientSubscribe } from "@/hooks/usePusherClientSubscribe";
import axios from "axios";
import { Button } from "../ui/button";
import { useFriendRequestsStore } from "@/store/useFriendRequestsStore";
import { toast } from "sonner";
import Link from "next/link";
import { User } from "@/lib/validators/user";
import Avatar from "../Avatar";

interface SidebarFriendRequestsProps {}

const SidebarFriendRequests: FC<SidebarFriendRequestsProps> = ({}) => {
  const session = useSessionContext();
  const { friendRequests, addFriendRequest, removeFriendRequest } =
    useFriendRequestsStore();

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", {
      id: senderId,
      sessionId: session.user.id,
    });

    removeFriendRequest(senderId);
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", {
      id: senderId,
      sessionId: session.user.id,
    });

    removeFriendRequest(senderId);
  };

  usePusherClientSubscribe({
    bindKey: "incoming_friend_requests",
    handler: (friend: User) => {
      addFriendRequest(friend);
      toast.info("New friend request");
    },
    subscribeKey: `user:${session.user.id}:incoming_friend_requests`,
  });

  return (
    <div className="relative">
      {friendRequests.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 mt-6">
          <InboxIcon className="m-auto w-12 h-12 text-secondary" />
          <p className="text-center text-secondary text-sm">
            No friend requests
          </p>
          <Button asChild>
            <Link href="/dashboard/add">Add friend</Link>
          </Button>
        </div>
      ) : (
        friendRequests.map((request) => (
          <div key={request.id} className="flex items-center gap-2 mt-2 px-2">
            <Avatar
              className="w-8 h-8"
              image={request.image}
              name={request.name}
            />
            <p className="font-medium text-lg truncate">{request.name}</p>
            <Button
              aria-label="accept friend"
              size="icon"
              variant="outline"
              onClick={() => acceptFriend(request.id)}
            >
              <CheckIcon className="w-3/4 h-3/4 font-semibold" />
            </Button>
            <Button
              aria-label="reject friend"
              variant="ghost"
              size="icon"
              onClick={() => denyFriend(request.id)}
            >
              <XIcon className="w-3/4 h-3/4 font-semibold" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default SidebarFriendRequests;
