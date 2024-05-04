import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import ReactTextareaAutosize, {
  TextareaAutosizeProps as ReactTextareaAutosizeProps,
} from "react-textarea-autosize";

type TextareaAutoSizeProps = ReactTextareaAutosizeProps;

const TextareaAutoSize = forwardRef<HTMLTextAreaElement, TextareaAutoSizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <ReactTextareaAutosize
        className={cn(
          "w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextareaAutoSize.displayName = "TextareaAutoSize";
export default TextareaAutoSize;
