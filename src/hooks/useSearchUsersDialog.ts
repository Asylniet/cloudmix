import { useSearchUsersDialogStore } from "@/store/useSearchUsersDialog";
import { useEffect } from "react";

export const useSearchUsersDialog = () => {
  const { isOpen, setIsOpen, invert } = useSearchUsersDialogStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        invert();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [invert, setIsOpen]);

  return { isOpen, setIsOpen };
};
