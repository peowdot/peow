import type { EvlogOrpcContext } from "@repo/telemetry/evlog/orpc";

export function createContext(options: { headers: Headers }) {
  return {
    ...options,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>> & EvlogOrpcContext;
