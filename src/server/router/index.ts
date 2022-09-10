import { Context } from "@server/context";
import { router } from "@trpc/server";
import { file } from "./file";
import { fileShared } from "./file-shared";
import { share } from "./share";

export const appRouter = router<Context>()
  .merge("file.", file)
  .merge("share.", share)
  .merge("file-shared.", fileShared);

export type AppRouter = typeof appRouter;
