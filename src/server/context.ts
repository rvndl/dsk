import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { inferAsyncReturnType } from "@trpc/server";
import { authOptions } from "@pages/api/auth/[...nextauth]";

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session = opts && (await getServerSession(opts, authOptions));

  return {
    req,
    res,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
