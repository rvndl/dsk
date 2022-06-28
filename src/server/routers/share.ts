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
        shares: z.number().optional(),
        expires: z.string().optional(),
      }),
    }),
    async resolve({ input }) {
      const { shares, expires } = input.limits;

      const share = await prisma.share.create({
        data: {
          name: "todo",
          path: input.path,
          shared: true,
          expires,
          shares,
        },
      });

      return share;
    },
  });
