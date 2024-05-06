"use client";

import { FC, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type SignoutButtonProps = ButtonProps & {};

const SignoutButton: FC<SignoutButtonProps> = ({ ...props }) => {
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: async () => await signOut(),
    mutationKey: ["signOut"],
    onMutate: () => {
      toast.promise(mutateAsync, {
        loading: "Signing out...",
        success: "Successfully signed out",
        error: "Failed to sign out",
      });
    },
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
