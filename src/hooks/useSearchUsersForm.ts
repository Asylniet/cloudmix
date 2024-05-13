import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useDebounce from "./useDebouce";
import { SearchUser, searchUserSchema } from "@/lib/validators/searchUser";

type FormData = SearchUser;

/**
 * Custom hook for handling the search users form.
 *
 * @returns An object containing the form, debounced query, and setError function.
 */
export const useSearchUsersForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(searchUserSchema),
    mode: "onChange",
    defaultValues: {
      query: "",
    },
  });

  const debouncedQuery = useDebounce(form.getValues().query, 500);

  const setError = (error: string) => {
    form.setError("query", {
      type: "manual",
      message: error,
    });
  };

  return { form, debouncedQuery, setError };
};
