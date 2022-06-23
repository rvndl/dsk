import * as trpcNext from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { inferAsyncReturnType } from "@trpc/server";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getSession({ req });
  return {
    req,
    res,
    session,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
