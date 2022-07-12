import { router } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../db/prisma";

export const share = router()
  .query("get-shared-file", {
    input: z.object({
      slug: z.string().length(25),
    }),
    async resolve({ input }) {
      return true;
    },
  })
  .mutation("share-file", {
    input: z.object({
      path: z.string(),
      limits: z.object({
        shares: z.number().min(0).optional(),
        expires: z.number().optional(),
        permanent: z.boolean().default(false).optional(),
      }),
    }),
    async resolve({ input }) {
      const { shares, expires, permanent } = input.limits;

      const share = await prisma.share.create({
        data: {
          name: "todo",
          path: input.path,
          active: true,
          permanent,
          expires: new Date(expires || 0),
          shares,
        },
      });

      return share;
    },
  });
