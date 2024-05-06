import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

type AddFiendPageProps = {};

const AddFiendPage: FC<AddFiendPageProps> = ({}) => {
  return (
    <main className="pt-8">
      <h1 className="mb-8 font-bold text-5xl">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default AddFiendPage;
