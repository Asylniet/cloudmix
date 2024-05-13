import { useSearchUsersDialogStore } from "@/store/useSearchUsersDialog";
import { useEffect } from "react";

/**
 * Custom hook for managing the search users dialog state.
 * The dialog can be opened by pressing "Ctrl + K" or "Cmd + K".
 *
 * @returns An object containing the `isOpen` state and the `setIsOpen` function.
 */
export const useSearchUsersDialog = () => {
  const { isOpen, setIsOpen } = useSearchUsersDialogStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      down(e);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return { isOpen, setIsOpen };
};
