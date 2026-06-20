import { Button } from "@repo/ui/components/button";
import { Icons } from "@repo/ui/components/icons";
import { toast } from "@repo/ui/components/sonner";
import { createFileRoute } from "@tanstack/react-router";

import { Health } from "@/components/health";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <div className="p-8 flex justify-center items-center flex-col">
        <div className="p-8 flex justify-center items-center flex-col">
          <div className="flex gap-4 items-center justify-center">
            <Icons.Logo className="size-12" />
            <h1 className="text-4xl font-bold font-hedvig-serif">Peow</h1>
          </div>
          <Button
            onClick={() => {
              toast.success("Hello");
            }}
          >
            Button
          </Button>
        </div>
        <div>
          <Health />
        </div>
      </div>
    </>
  );
}
