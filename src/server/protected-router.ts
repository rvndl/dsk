import { router, TRPCError } from "@trpc/server";
import { Context } from "./context";

export const protectedRouter = () =>
  router<Context>().middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({ ctx });
  });
