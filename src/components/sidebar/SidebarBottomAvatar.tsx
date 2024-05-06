"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignoutButton from "../SignoutButton";
import { getNameInitials } from "@/helpers/getNameInitials";
import useSessionStore from "@/store/useSessionStore";

type SidebarBottomAvatarProps = {};

const SidebarBottomAvatar: FC<SidebarBottomAvatarProps> = ({}) => {
  const session = useSessionStore((state) => state.session);
  if (!session) return null;
  return (
    <>
      <div className="flex flex-1 items-center gap-x-4 px-6 py-2 w-fit font-semibold text-sm">
        <Avatar>
          <AvatarImage
            src={session.user.image || ""}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback>{getNameInitials(session.user.name)}</AvatarFallback>
        </Avatar>

        <span className="sr-only">Your Profile</span>
        <div className="flex flex-col truncate">
          {/* TODO: Limit the width of the text to prevent overflow */}
          <span aria-hidden="true">
            {session.user.name} ASULNIT
            ZHTEPSIABSJKFALFJKLSAHFJKLSAHFKLJASHFLKJASHLK
          </span>
          <span className="text-accent text-xs" aria-hidden="true">
            {session.user.email}
          </span>
        </div>
      </div>
      <SignoutButton className="mr-6" size="icon" />
    </>
  );
};

export default SidebarBottomAvatar;
