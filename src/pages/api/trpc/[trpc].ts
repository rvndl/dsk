import { inferProcedureOutput } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@server/context";
import { AppRouter, appRouter } from "@server/router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
