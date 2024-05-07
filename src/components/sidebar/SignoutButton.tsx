"use client";

import { FC } from "react";
import { Button, ButtonProps } from "../ui/button";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

type SignoutButtonProps = ButtonProps & {};

const SignoutButton: FC<SignoutButtonProps> = ({ ...props }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await signOut(),
    mutationKey: ["signOut"],
  });
  return (
    <Button
      {...props}
      isLoading={isPending}
      onClick={() => mutate()}
      variant="ghost"
    >
      <LogOutIcon />
    </Button>
  );
};

export default SignoutButton;
