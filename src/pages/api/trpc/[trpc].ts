import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { file } from "../../../server/routers/file";

export const appRouter = trpc.router().merge("file.", file);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
