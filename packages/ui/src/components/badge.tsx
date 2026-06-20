import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { cn, cva } from "../lib/utils";
import type { VariantProps } from "../lib/utils";

const badgeVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "group/badge",
    "h-5 w-fit shrink-0",
    "gap-1 px-2 py-0.5",
    "has-data-[icon=inline-start]:pl-1.5 has-data-[icon=inline-end]:pr-1.5",
    "border border-transparent rounded-4xl",
    "text-xs font-medium whitespace-nowrap",
    "overflow-hidden",
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
    "transition-colors",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
  ),
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        free: "border-0 bg-gray-500/10 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400 [a]:hover:bg-gray-500/20 dark:[a]:hover:bg-gray-500/25",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        info: "border-0 bg-blue-500/20 text-blue-800 dark:bg-blue-500/25 dark:text-blue-300 [a]:hover:bg-blue-500/30 dark:[a]:hover:bg-blue-500/35",
        link: "text-primary underline-offset-4 hover:underline",
        negative:
          "border-0 bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-400 [a]:hover:bg-red-500/20 dark:[a]:hover:bg-red-500/25",
        neutral:
          "border-0 bg-gray-500/10 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400 [a]:hover:bg-gray-500/20 dark:[a]:hover:bg-gray-500/25",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        paid: "border-0 bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 [a]:hover:bg-blue-500/20 dark:[a]:hover:bg-blue-500/25",
        pending:
          "border-0 bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 [a]:hover:bg-amber-500/20 dark:[a]:hover:bg-amber-500/25",
        positive:
          "border-0 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 [a]:hover:bg-emerald-500/20 dark:[a]:hover:bg-emerald-500/25",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
      },
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
