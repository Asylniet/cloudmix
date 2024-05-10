import { User } from "@/lib/validators/user";
import { FC } from "react";
import Avatar from "../Avatar";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

type ChatHeaderProps = {
  chatPartner: User;
};

const ChatHeader: FC<ChatHeaderProps> = ({ chatPartner }) => {
  return (
    <header className="flex justify-between sm:items-center bg-background/80 backdrop-blur-sm px-2 py-1 border-b">
      <div className="relative flex items-center space-x-auto sm:space-x-2 w-full">
        <Link href="/dashboard" className="flex items-center sm:hidden">
          <ChevronLeftIcon size={20} />
          <span>Back</span>
        </Link>
        <Avatar
          className="order-3 sm:-order-none w-8 h-8"
          image={chatPartner.image}
          name={chatPartner.name}
        />
        <div className="flex flex-col mx-auto sm:mx-0 text-center sm:text-start leading-right">
          <span className="sm:mr-4 font-semibold">{chatPartner.name}</span>
          <span className="text-secondary text-sm">{chatPartner.email}</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
