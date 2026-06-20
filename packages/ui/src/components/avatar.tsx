import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type * as React from "react";

import { cn } from "../lib/utils";

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarPrimitive.Root
      data-size={size}
      data-slot="avatar"
      className={cn(
        "group/avatar flex",
        "size-8 shrink-0",
        "data-[size=sm]:size-6 data-[size=lg]:size-10",
        "relative",
        "rounded-full",
        "overflow-hidden select-none",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex items-center justify-center",
        "size-full",
        "rounded-full",
        "bg-muted",
        "text-sm text-muted-foreground",
        "group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "inline-flex items-center justify-center",
        "group-data-[size=sm]/avatar:size-2",
        "group-data-[size=default]/avatar:size-2.5",
        "group-data-[size=lg]/avatar:size-3",
        "absolute right-0 bottom-0 z-10",
        "rounded-full ring-2 ring-background",
        "bg-primary bg-blend-color",
        "text-primary-foreground",
        "select-none",
        "group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "flex items-center justify-center",
        "size-8 shrink-0",
        "group-has-data-[size=sm]/avatar-group:size-6",
        "group-has-data-[size=lg]/avatar-group:size-10",
        "relative",
        "rounded-full ring-2 ring-background",
        "bg-muted",
        "text-sm text-muted-foreground",
        "[&>svg]:size-4",
        "group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        "group-has-data-[size=lg]/avatar-group:[&>svg]:size-5",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };
