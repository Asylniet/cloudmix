import { User } from "@/lib/validators/user";
import { FC } from "react";
import Avatar from "../Avatar";

type ChatHeaderProps = {
  chatPartner: User;
};

const ChatHeader: FC<ChatHeaderProps> = ({ chatPartner }) => {
  return (
    <header className="flex justify-between sm:items-center bg-background px-2 py-1 border-b">
      <div className="relative flex items-center space-x-2">
        <Avatar
          className="w-8 h-8"
          image={chatPartner.image}
          name={chatPartner.name}
        />
        <div className="flex flex-col leading-right">
          <span className="mr-4 font-semibold">{chatPartner.name}</span>
          <span className="text-secondary text-sm">{chatPartner.email}</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
