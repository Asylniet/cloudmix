"use client";

import { FC, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { signOut } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import { LogOutIcon } from "lucide-react";

type SignoutButtonProps = ButtonProps & {};

const SignoutButton: FC<SignoutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const { toast } = useToast();
  const handleOnClick = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      toast({
        title: "There was an error signing out",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };
  return (
    <Button
      isLoading={isSigningOut}
      {...props}
      onClick={handleOnClick}
      variant="ghost"
    >
      <LogOutIcon />
    </Button>
  );
};

export default SignoutButton;
