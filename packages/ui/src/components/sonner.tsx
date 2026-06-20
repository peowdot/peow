import { Toaster as Sonner, toast } from "sonner";
import type { ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className="toaster group"
    style={
      {
        "--border-radius": "0px",
        "--normal-bg": "var(--color-popover)",
        "--normal-border": "var(--color-border)",
        "--normal-text": "var(--color-popover-foreground)",
      } as React.CSSProperties
    }
    {...props}
  />
);

export { toast, Toaster };
