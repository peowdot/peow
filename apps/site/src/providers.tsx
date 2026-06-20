import { Toaster } from "@repo/ui/components/sonner";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Toaster />
    </>
  );
}
