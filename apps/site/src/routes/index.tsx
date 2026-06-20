import { Button } from "@repo/ui/components/button";
import { Icons } from "@repo/ui/components/icons";
import { toast } from "@repo/ui/components/sonner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <section>
      <div className="p-4 space-y-8 text-center">
        <div className="flex gap-4 items-center justify-center">
          <Icons.Logo className="size-12" />
          <h1 className="text-4xl font-bold font-hedvig-serif">Peow</h1>
        </div>

        <Button
          onClick={() => {
            toast.info("Hello", { position: "top-right" });
          }}
        >
          Cute Button
        </Button>
      </div>
    </section>
  );
}
