import cors from "@fastify/cors";
import { RPCHandler } from "@orpc/server/fastify";
import { createContext } from "@repo/rpc/context";
import type { Context } from "@repo/rpc/context";
import { appRouter } from "@repo/rpc/routers/index";
import { evlog } from "@repo/telemetry/evlog/fastify";
import Fastify from "fastify";

const main = async () => {
  const app = Fastify({ logger: false });

  await app.register(cors, {
    credentials: true,
    origin: "https://local.app.peow.id",
  });

  await app.register(evlog);

  const handler = new RPCHandler<Context>(appRouter);

  app.addContentTypeParser("*", (_request, _payload, done) => {
    // Fully utilize oRPC feature by allowing any content type
    // And let oRPC parse the body manually by passing `undefined`
    done(null);
  });

  app.get("/", (_req, res) => res.send("PEOW API"));

  app.all("/api/rpc/*", async (req, reply) => {
    const headers = new Headers(req.headers as Record<string, string>);
    const context = {
      ...createContext({ headers }),
      log: req.log,
    } as unknown as Context;

    const { matched } = await handler.handle(req, reply, {
      context,
      prefix: "/api/rpc",
    });

    if (!matched) {
      reply.status(404).send("Not found");
    }
  });

  return app;
};

const app = await main();

app
  .listen({ port: Number(process.env.PORT) })
  // oxlint-disable-next-line promise/prefer-await-to-then
  .then(() => console.log(`Server running on https://local.api.peow.id`));
