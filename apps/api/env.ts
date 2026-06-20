import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const env = createEnv({
  // Treat empty strings as unset so defaults apply
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  server: {
    NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
    PORT: z.coerce.number().default(3001),
  },
});
