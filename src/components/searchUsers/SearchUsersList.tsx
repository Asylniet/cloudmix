import { useAddFriendMutation } from "@/hooks/useAddFriendMutation";
import { User } from "@/lib/validators/user";
import { FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { LoaderCircle, PlusSquareIcon } from "lucide-react";
import { Button } from "../ui/button";
import Avatar from "../Avatar";
import Link from "next/link";

type SearchUsersListProps = {
  commandRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  data?: User[];
  setError: (error: string) => void;
};

const SearchUsersList: FC<SearchUsersListProps> = ({
  commandRef,
  isLoading,
  data,
  setError,
}) => {
  const { mutate, isPending } = useAddFriendMutation(setError);
  return (
    <Command ref={commandRef} className="rounded-lg max-h-48 overflow-y-auto">
      <CommandList>
        {isLoading ? (
          <CommandEmpty>
            <LoaderCircle className="mx-auto animate-spin" />
          </CommandEmpty>
        ) : null}
        {!!data && data.length > 0 ? (
          <CommandGroup
            heading={`Found ${!!data ? data.length : 0} suggestions`}
          >
            {data.map((user) => (
              <CommandItem key={user.id} className="justify-between gap-2">
                <Link
                  href={`/user/${user.id}`}
                  className="flex items-center gap-2"
                >
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
            ))}
          </CommandGroup>
        ) : null}
      </CommandList>
    </Command>
  );
};

export default SearchUsersList;
