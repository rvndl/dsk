import path from "path";
import * as fs from "fs";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getFilePath, readDirectory } from "@server/lib/file";
import { prisma } from "../db/prisma";
import { protectedRouter } from "@server/protected-router";

export const file = protectedRouter()
  .query("get-all", {
    resolve() {
      const uploadsDirectory = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadsDirectory)) {
        fs.mkdirSync(uploadsDirectory);
      }

      const files = readDirectory(uploadsDirectory);
      return files;
    },
  })
  .query("get-details", {
    input: z.object({
      path: z.string(),
    }),
    resolve({ input }) {
      const filePath = getFilePath(input.path);
      const stats = fs.lstatSync(filePath);

      return {
        size: stats.size,
      };
    },
  })
  .query("get-content", {
    input: z.object({
      path: z.string(),
    }),
    resolve({ input }) {
      const filePath = getFilePath(input.path);
      const fileContent = fs.readFileSync(filePath, "utf8");

      return fileContent;
    },
  })
  .query("get-id", {
    input: z.object({
      path: z.string(),
    }),
    async resolve({ input }) {
      const file = await prisma.file.findFirst({
        where: { ...input },
      });

      if (!file) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File not found",
        });
      }

      return file.id;
    },
  })
  .mutation("delete", {
    input: z.object({
      fileName: z.string(),
    }),
    async resolve({ input }) {
      const { fileName } = input;

      const file = await prisma.file.findFirst({
        where: {
          name: fileName,
        },
      });

      if (!file) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "File not found",
        });
      }

      const filePath = getFilePath(file.name);
      fs.unlinkSync(filePath);

      await prisma.file.deleteMany({
        where: {
          name: fileName,
        },
      });

      return true;
    },
  });
