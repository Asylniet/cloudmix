"use client";

import GoogleIcon from "@/components/svg/google";
import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 min-h-full">
      <div className="flex flex-col items-center space-y-8 w-full max-w-md">
        <div className="flex flex-col items-center gap-8">
          LOGO
          <h2 className="mt-6 font-bold text-3xl text-center text-gray-800 tracking-tight">
            Sign in to your account
          </h2>
        </div>
      </div>
      <Button
        isLoading={isLoading}
        type="button"
        className="mx-auto mt-4 w-full max-w-sm"
        onClick={handleLogin}
      >
        <GoogleIcon />
        Google
      </Button>
    </div>
  );
};

export default LoginPage;
