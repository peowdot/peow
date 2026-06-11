import { os } from "@orpc/server";
import { evlog } from "@repo/telemetry/evlog/orpc";

import { configApiLogger } from "./bootstrap/logger";
import type { Context } from "./context";

configApiLogger();

export const base = os.$context<Context>().use(evlog());
export const publicProcedure = base;

export const protectedProcedure = publicProcedure.use(({ context, next }) =>
  next({
    context,
  })
);

export const adminProcedure = publicProcedure.use(({ context, next }) =>
  next({
    context,
  })
);
