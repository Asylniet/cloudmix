import { useSearchUsersDialogStore } from "@/store/useSearchUsersDialog";
import { useEffect } from "react";

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
