import * as trpc from "@trpc/server";
import { inferProcedureOutput } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { file } from "../../../server/routers/file";
import { createContext } from "@server/context";
import { createRouter } from "@server/create-router";

export const appRouter = createRouter().merge("file.", file);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
