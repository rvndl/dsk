import { z } from "zod";
import { protectedRouter } from "@server/protected-router";
import { getFilePath } from "@server/lib/file";
import * as fs from "fs";

export const folder = protectedRouter().mutation("create", {
  input: z.object({
    path: z.string(),
    name: z.string(),
  }),
  async resolve({ input }) {
    const directory = getFilePath(input.path + "/" + input.name);

    if (fs.existsSync(directory)) {
      throw new Error("Directory already exists");
    }

    fs.mkdirSync(directory);

    return true;
  },
});
