import { initLogger } from "@repo/telemetry/evlog";

export function configApiLogger() {
  initLogger({
    env: { service: "api" },
    pretty: true,
  });
}
