import { Session } from "next-auth";
import { createContext } from "react";

export const SessionContext = createContext<Session | undefined>(undefined);
