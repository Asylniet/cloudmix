"use client";

import { CheckIcon, InboxIcon, XIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import { useFriendRequestsStore } from "@/store/useFriendRequestsStore";
import Avatar from "../Avatar";
import { useSearchUsersDialogStore } from "@/store/useSearchUsersDialog";
import { useDenyFriendMutation } from "@/hooks/useDenyFriendMutation";
import { useAcceptFriendMutation } from "@/hooks/useAcceptFriendMutation";

interface SidebarFriendRequestsProps {}

const SidebarFriendRequests: FC<SidebarFriendRequestsProps> = ({}) => {
  const { setIsOpen } = useSearchUsersDialogStore();
  const { friendRequests, removeFriendRequest } = useFriendRequestsStore();

  const { mutate: accept, isPending: acceptIsPending } =
    useAcceptFriendMutation(removeFriendRequest);
  const { mutate: deny, isPending: denyIsPending } =
    useDenyFriendMutation(removeFriendRequest);

  return (
    <div className="relative">
      {friendRequests.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 mt-6">
          <InboxIcon className="m-auto w-12 h-12 text-secondary" />
          <p className="text-center text-secondary text-sm">
            No friend requests
          </p>
          <Button onClick={() => setIsOpen(true)}>Add friend</Button>
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
            <div className="flex items-center gap-2 ml-auto">
              <Button
                aria-label="accept friend"
                size="icon"
                variant="outline"
                onClick={() => accept(request.id)}
                isLoading={acceptIsPending}
              >
                <CheckIcon className="w-3/4 h-3/4 font-semibold" />
              </Button>
              <Button
                aria-label="reject friend"
                variant="ghost"
                size="icon"
                onClick={() => deny(request.id)}
                isLoading={denyIsPending}
              >
                <XIcon className="w-3/4 h-3/4 font-semibold" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SidebarFriendRequests;
