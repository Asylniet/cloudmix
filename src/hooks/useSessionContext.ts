import { SessionContext } from "@/context/SessionContext";
import { useContext } from "react";

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }

  return context;
};
