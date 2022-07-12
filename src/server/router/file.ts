import path from "path";
import * as fs from "fs";
import { z } from "zod";
import { router } from "@trpc/server";
import { readDirectory } from "@server/lib/file";

export const file = router()
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
      const uploadsDirectory = path.join(process.cwd(), "uploads");
      const filePath = path.join(uploadsDirectory, input.path);
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
      const uploadsDirectory = path.join(process.cwd(), "uploads");
      const filePath = path.join(uploadsDirectory, input.path);

      const fileContent = fs.readFileSync(filePath, "utf8");

      return fileContent;
    },
  });
