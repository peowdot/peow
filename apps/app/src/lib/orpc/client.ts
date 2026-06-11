import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { AppRouterClient } from "@repo/rpc/contract";

const link = new RPCLink({
  url: "https://local.api.peow.id/api/rpc",
});

export const client: AppRouterClient = createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
