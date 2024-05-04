"use client";

import { FC, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AddFriend, addFriendValidator } from "@/lib/validators/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";

type AddFriendButtonProps = {};
type FormData = AddFriend;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const { toast } = useToast();
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });
  // TODO: Make the error checking onChange
  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      await axios.post("/api/friends/add", { email: validatedEmail.email });
      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong" });
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="email">Add friend by E-mail</Label>
      <div className="flex gap-4 mt-2">
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="you@example.com"
        />
        <p className="mt-1 text-destructive text-sm">{errors.email?.message}</p>
        <Button>Add</Button>
        {showSuccessState ? (
          <p className="mt-1 text-sm text-success">Friend request sent!</p>
        ) : null}
      </div>
    </form>
  );
};

export default AddFriendButton;
