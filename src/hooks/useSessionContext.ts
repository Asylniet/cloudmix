import { SessionContext } from "@/context/SessionContext";
import { useContext } from "react";

/**
 * Custom hook that provides access to the session context.
 * @returns The session context object.
 * @throws {Error} If used outside of a SessionProvider.
 */
export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }

  return context;
};
