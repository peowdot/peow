import { os } from "@orpc/server";

export const appRouter = {
  health: os.handler(() => "OK"),
};
