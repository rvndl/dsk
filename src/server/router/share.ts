import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db/prisma";
import * as fs from "fs";
import path from "path";
import { protectedRouter } from "@server/protected-router";

export const share = protectedRouter()
  .query("get-all", {
    async resolve() {
      const shares = await prisma.share.findMany({ include: { file: true } });
      return shares;
    },
  })
  .query("get-statiscs", {
    async resolve() {
      const [shares, fileCount] = await Promise.all([
        prisma.share.findMany(),
        prisma.file.count(),
      ]);

      const downloadCount = shares.reduce((acc, share) => {
        return acc + share.downloads;
      }, 0);

      return {
        fileCount,
        downloadCount,
        shareCount: shares.length,
      };
    },
  })
  .mutation("share-file", {
    input: z.object({
      path: z.string(),
      limits: z.object({
        downloadLimit: z.number().min(-1).optional(),
        expires: z.number().optional(),
        permanent: z.boolean().default(false).optional(),
      }),
    }),
    async resolve({ input }) {
      const { downloadLimit, expires, permanent } = input.limits;

      const uploadsDirectory = path.join(process.cwd(), "uploads");
      const filePath = path.join(uploadsDirectory, input.path);

      const { ino } = fs.lstatSync(filePath);

      try {
        const share = await prisma.share.create({
          data: {
            fileInode: ino + "",
            permanent,
            /* TODO: remove this workaround */
            downloadLimit: downloadLimit === 0 ? -1 : downloadLimit,
            expires: new Date(expires || 0),
          },
        });

        return share.id;
      } catch (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "File already shared",
        });
      }
    },
  });
