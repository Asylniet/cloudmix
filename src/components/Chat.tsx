"use client";

import React, { FC } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatGPTInput";
import ChatMessages from "./ChatMessages";

type ChatProps = {};

export const Chat: FC = () => {
  return (
    <div>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};
