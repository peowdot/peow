import { PostgreSqlContainer } from "@testcontainers/postgresql";
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Effect, Redacted } from "effect";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Database, layer } from "./database";

let container: StartedPostgreSqlContainer;

describe(Database, () => {
  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:17").start();
  }, 60_000);

  afterAll(async () => {
    await container?.stop();
  });

  const getLayer = () =>
    layer({
      ssl: false,
      url: Redacted.make(container.getConnectionUri()),
    });

  it("should connect to postgres", async () => {
    const program = Effect.gen(function* program() {
      const db = yield* Database;

      const result = yield* Effect.tryPromise(() => db.execute("SELECT 1 as value"));

      return result;
    });

    const result = await Effect.runPromise(program.pipe(Effect.provide(getLayer()), Effect.scoped));

    expect(result).toBeDefined();
  });

  it("should create table, insert row, and query it", async () => {
    const program = Effect.gen(function* program() {
      const db = yield* Database;

      yield* Effect.tryPromise(() =>
        db.execute(`
          CREATE TABLE IF NOT EXISTS test_messages (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL
          )
        `)
      );

      yield* Effect.tryPromise(() =>
        db.execute(`
          INSERT INTO test_messages (content)
          VALUES ('hello from test')
        `)
      );

      const rows = yield* Effect.tryPromise(() =>
        db.execute(`SELECT * FROM test_messages WHERE content = 'hello from test'`)
      );

      return rows;
    });

    const rows = await Effect.runPromise(program.pipe(Effect.provide(getLayer()), Effect.scoped));

    expect(rows).toHaveLength(1);
  });
});
