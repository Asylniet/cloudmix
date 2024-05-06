import AddFriendButton from "@/components/AddFriendButton";
import { userAPI } from "@/service/api/user";
import { FC } from "react";

type AddFiendPageProps = {};

const AddFiendPage: FC<AddFiendPageProps> = async ({}) => {
  const users = await userAPI.searchUsers("a");
  return (
    <main className="pt-8">
      <h1 className="mb-8 font-bold text-5xl">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default AddFiendPage;
