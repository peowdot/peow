import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc/client";

function getHealthStatus(isPending: boolean, isError: boolean, ok?: boolean) {
  if (isPending) {
    return {
      color: "text-muted-foreground",
      dot: "bg-muted",
      label: "checking...",
    };
  }
  if (isError || !ok) {
    return {
      color: "text-destructive",
      dot: "bg-destructive",
      label: "unavailable",
    };
  }
  return {
    color: "text-emerald-600",
    dot: "bg-emerald-500",
    label: "operational",
  };
}

export function Health() {
  const { data, isPending, isError } = useQuery(orpc.health.queryOptions());
  const { label, color, dot } = getHealthStatus(isPending, isError, data?.ok);

  return (
    <div className="flex items-center gap-2 rounded-lg w-fit border border-neutral-300 px-3 py-2 text-sm">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className="text-muted-foreground">API health</span>
      <span className={`font-medium ${color}`}>{label}</span>
    </div>
  );
}
