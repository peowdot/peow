import { drizzle } from "drizzle-orm/postgres-js";
import { Context, Layer } from "effect";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import postgres from "postgres";

import * as schema from "../schema";

export interface Config {
  url: Redacted.Redacted;
  ssl: boolean;
}

const makeService = (config: Config) =>
  Effect.gen(function* make() {
    const sql = yield* Effect.acquireRelease(
      Effect.sync(() =>
        postgres(Redacted.value(config.url), {
          connect_timeout: 8,
          idle_timeout: 0,
          ssl: config.ssl,
        })
      ),
      (client) => Effect.promise(() => client.end())
    );

    const db = drizzle(sql, { casing: "snake_case", schema });

    return db;
  });

type Shape = Effect.Success<ReturnType<typeof makeService>>;

export class Database extends Context.Service<Database, Shape>()("Databae") {}
export const layer = (config: Config) => Layer.effect(Database, makeService(config));
