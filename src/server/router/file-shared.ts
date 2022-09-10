import * as fs from "fs";
import { z } from "zod";
import { router, TRPCError } from "@trpc/server";
import { getFilePath } from "@server/lib/file";
import { prisma } from "../db/prisma";
import { checkShareExpiry } from "@utils/utils";

export const fileShared = router()
  .query("get-details", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const share = await prisma.share.findFirst({
        where: { id: input.slug },
        include: { file: true },
      });

      if (!share) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share not found",
        });
      }

      if (!share.file) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File not found",
        });
      }

      const expired = checkShareExpiry(share);
      if (expired) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share expired",
        });
      }

      const filePath = getFilePath(share.file.path);
      const stats = fs.lstatSync(filePath);

      return {
        size: stats.size,
      };
    },
  })
  .query("get-content", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const share = await prisma.share.findFirst({
        where: { id: input.slug },
        include: { file: true },
      });

      if (!share) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share not found",
        });
      }

      if (!share.file) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File not found",
        });
      }

      const expired = checkShareExpiry(share);
      if (expired) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Share expired",
        });
      }

      const filePath = getFilePath(share.file.path);
      const fileContent = fs.readFileSync(filePath, "utf8");

      return fileContent;
    },
  });
