import { createRouter } from "@server/create-router";
import { file } from "./file";
import { share } from "./share";

export const appRouter = createRouter()
  .merge("file.", file)
  .merge("share.", share);

export type AppRouter = typeof appRouter;
