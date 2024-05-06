import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

type loadingProps = {};

const loading: FC<loadingProps> = ({}) => {
  return (
    <main className="pt-8 w-full">
      <Skeleton className="mb-4 w-64 h-14" />
      <Skeleton className="mb-2 w-32 h-4" />
      <Skeleton className="w-64 h-10" />
    </main>
  );
};

export default loading;
