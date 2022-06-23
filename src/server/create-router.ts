import { router, TRPCError } from "@trpc/server";
import { Context } from "./context";

export const createRouter = () =>
  router<Context>().middleware(({ ctx, next }) => {
    if (!ctx.session?.loggedIn) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({ ctx });
  });
