import { RPCHandler } from "@orpc/server/fastify";
import Fastify from "fastify";

import { appRouter } from "./server/routes";

const handler = new RPCHandler(appRouter);

const app = Fastify();

app.addContentTypeParser("*", (request, payload, done) => {
  // Fully utilize oRPC feature by allowing any content type
  // And let oRPC parse the body manually by passing `undefined`
  done(null);
});

app.all("/rpc/*", async (req, reply) => {
  const { matched } = await handler.handle(req, reply, {
    context: {},
    prefix: "/api/rpc",
  });

  if (!matched) {
    reply.status(404).send("Not found");
  }
});

app
  .listen({ port: 3003 })
  // oxlint-disable-next-line promise/prefer-await-to-then
  .then(() => console.log("Server running on http://localhost:3000"));
