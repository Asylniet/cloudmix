import { User } from "@/lib/validators/user";
import { FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "../ui/command";
import { LoaderCircle } from "lucide-react";
import AddFriendButton from "./AddFriendButton";

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
  return (
    <Command ref={commandRef} className="rounded-lg max-h-48 overflow-y-auto">
      <CommandList>
        {isLoading ? (
          <CommandEmpty>
            <LoaderCircle className="mx-auto animate-spin" />
          </CommandEmpty>
        ) : (
          <CommandEmpty>Nothing found</CommandEmpty>
        )}
        {!!data && data.length > 0 ? (
          <CommandGroup
            heading={`Found ${!!data ? data.length : 0} suggestions`}
          >
            {data.map((user) => (
              <AddFriendButton key={user.id} setError={setError} user={user} />
            ))}
          </CommandGroup>
        ) : null}
      </CommandList>
    </Command>
  );
};

export default SearchUsersList;
