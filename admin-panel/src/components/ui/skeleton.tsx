import { cn } from "@/libs";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-foreground/20 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
