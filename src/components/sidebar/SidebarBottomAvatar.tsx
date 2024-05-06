"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignoutButton from "../SignoutButton";
import { getNameInitials } from "@/helpers/getNameInitials";
import { useSessionContext } from "@/hooks/useSessionContext";

type SidebarBottomAvatarProps = {};

const SidebarBottomAvatar: FC<SidebarBottomAvatarProps> = ({}) => {
  const session = useSessionContext();
  if (!session) return null;
  return (
    <>
      <div className="flex flex-1 items-center gap-x-4 p-2 max-w-[70%] font-semibold text-sm">
        <Avatar>
          <AvatarImage
            src={session.user.image || ""}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{getNameInitials(session.user.name)}</AvatarFallback>
        </Avatar>

        <span className="sr-only">Your Profile</span>
        <div className="flex flex-col flex-1 w-full">
          <span aria-hidden="true" className="w-full truncate">
            {session.user.name}
          </span>
          <span className="text-secondary text-xs" aria-hidden="true">
            {session.user.email}
          </span>
        </div>
      </div>
      <SignoutButton className="m-2 ml-auto" size="icon" />
    </>
  );
};

export default SidebarBottomAvatar;
