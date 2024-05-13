"use client";

import { FC, useRef } from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import SearchUsersList from "./SearchUsersList";
import { useSearchUsersForm } from "@/hooks/useSearchUsersForm";
import { useSearchUsersQuery } from "@/hooks/useSearchUsersQuery";
import { Dialog, DialogContent } from "../ui/dialog";
import { useSearchUsersDialog } from "@/hooks/useSearchUsersDialog";

type SearchUsersDialogProps = {};

const SearchUsersDialog: FC<SearchUsersDialogProps> = ({}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useSearchUsersDialog();
  const { form, debouncedQuery, setError } = useSearchUsersForm();
  const { data, isLoading } = useSearchUsersQuery(debouncedQuery);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="query">
                    Search users to add as a friend
                  </FormLabel>
                  <FormControl>
                    <>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="Search users..."
                        name="query"
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") ref.current?.focus();
                        }}
                      />
                      <FormMessage />
                      <SearchUsersList
                        commandRef={ref}
                        isLoading={isLoading}
                        data={data}
                        setError={setError}
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUsersDialog;
