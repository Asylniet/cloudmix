import { useAddFriendMutation } from "@/hooks/useAddFriendMutation";
import { FC } from "react";
import { CommandItem } from "../ui/command";
import Link from "next/link";
import Avatar from "../Avatar";
import { User } from "@/lib/validators/user";
import { Button } from "../ui/button";
import { PlusSquareIcon } from "lucide-react";

type AddFriendButtonProps = {
  user: User;
  setError: (error: string) => void;
};

const AddFriendButton: FC<AddFriendButtonProps> = ({ setError, user }) => {
  const { mutate, isPending } = useAddFriendMutation(setError, user.id);
  return (
    <CommandItem key={user.id} className="justify-between gap-2">
      <Link href={`/user/${user.id}`} className="flex items-center gap-2">
        <Avatar name={user.name} image={user.image} />
        {user.email}
      </Link>
      <Button
        onClick={() => mutate(user.id)}
        type="button"
        size="icon"
        variant="outline"
        isLoading={isPending}
      >
        <PlusSquareIcon />
      </Button>
    </CommandItem>
  );
};

export default AddFriendButton;
