import type { RouterClient } from "@orpc/server";

import { protectedProcedure, publicProcedure } from "../orpc";

export const appRouter = {
  health: publicProcedure
    .route({
      method: "GET",
      path: "/health",
      summary: "Check API health",
    })
    .handler(({ context }) => {
      context.log.set({ route: "health" });
      return { ok: true };
    }),
  privateData: protectedProcedure
    .route({
      method: "GET",
      path: "/private-data",
      summary: "Get private data",
    })
    .handler(() => ({
      message: "This is private",
    })),
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<AppRouter>;
