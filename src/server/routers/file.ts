import * as trpc from "@trpc/server";
import path from "path";
import * as fs from "fs";

const readDirectory = (dir: string) => {
  const results: {
    name: string;
    type: string;
    size: number;
    fullPath: string;
    parent: string;
  }[] = [];

  const traverseDir = (dir: string) => {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path
        .normalize(path.join(dir, file))
        .replaceAll("\\", "/");

      const relativePath = path
        .normalize(path.relative(path.join(process.cwd(), "/uploads"), dir))
        .replaceAll("\\", "/");

      const fileInfo = fs.lstatSync(fullPath);

      if (fileInfo.isDirectory()) {
        results.push({
          name: file,
          type: "directory",
          size: fileInfo.size,
          fullPath,
          parent: relativePath,
        });

        traverseDir(fullPath);
      } else {
        results.push({
          name: file,
          type: "file",
          size: fileInfo.size,
          fullPath,
          parent: relativePath,
        });
      }
    });
  };

  traverseDir(dir);

  return results;
};

export const file = trpc.router().query("get-all", {
  resolve() {
    const uploadsDirectory = path.join(process.cwd(), "uploads");
    const files = readDirectory(uploadsDirectory);

    return files;
  },
});
