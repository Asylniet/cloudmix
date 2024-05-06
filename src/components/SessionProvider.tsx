"use client";

import { SessionContext } from "@/context/SessionContext";
import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";

type SessionProviderProps = PropsWithChildren & {
  session: Session;
};

const SessionProvider: FC<SessionProviderProps> = ({ session, children }) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
