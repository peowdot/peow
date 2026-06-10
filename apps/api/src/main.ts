import fastify from "fastify";

const app = fastify({ logger: false });

app.get("/", (req, res) => {
  console.log(req);
  res.send({ message: "OK" });
});

app.listen({ port: 3001 });
