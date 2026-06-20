import cors from "@fastify/cors";
import { OpenAPIHandler } from "@orpc/openapi/fastify";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { RPCHandler } from "@orpc/server/fastify";
import { createContext } from "@repo/rpc/context";
import type { Context } from "@repo/rpc/context";
import { appRouter } from "@repo/rpc/routers/index";
import { evlog } from "@repo/telemetry/evlog/fastify";
import Fastify from "fastify";
import type { FastifyRequest } from "fastify";

import { env } from "#env";

const createRequestContext = (req: FastifyRequest) => {
  const headers = new Headers(req.headers as Record<string, string>);

  return {
    ...createContext({ headers }),
    log: req.log,
  } as unknown as Context;
};

const main = async () => {
  const app = Fastify({ logger: false });

  await app.register(cors, {
    credentials: true,
    origin: "https://local.app.peow.id",
  });

  await app.register(evlog);

  const rpcHandler = new RPCHandler<Context>(appRouter);
  const restHandler = new OpenAPIHandler<Context>(appRouter, {
    plugins: [
      new OpenAPIReferencePlugin({
        docsPath: "/docs",
        docsProvider: "scalar",
        docsTitle: "PEOW API Reference",
        specGenerateOptions: {
          info: {
            title: "PEOW API",
            version: "1.0.0",
          },
          servers: [{ url: "/api" }],
        },
        specPath: "/openapi.json",
      }),
    ],
  });

  app.addContentTypeParser("*", (_request, _payload, done) => {
    // Fully utilize oRPC feature by allowing any content type
    // And let oRPC parse the body manually by passing `undefined`
    done(null);
  });

  app.get("/", (_req, res) => res.send("PEOW API"));

  app.all("/api/rpc/*", async (req, reply) => {
    const { matched } = await rpcHandler.handle(req, reply, {
      context: createRequestContext(req),
      prefix: "/api/rpc",
    });

    if (!matched) {
      reply.status(404).send("Not found");
    }
  });

  app.all("/api/*", async (req, reply) => {
    const { matched } = await restHandler.handle(req, reply, {
      context: createRequestContext(req),
      prefix: "/api",
    });

    if (!matched) {
      reply.status(404).send("Not found");
    }
  });

  return app;
};

const app = await main();

app
  .listen({ port: env.PORT })
  // oxlint-disable-next-line promise/prefer-await-to-then
  .then(() => console.log(`Server running on https://local.api.peow.id`));
