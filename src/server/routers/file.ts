import * as trpc from "@trpc/server";
import path from "path";
import * as fs from "fs";

interface FileInfo {
  name: string;
  type: "file" | "directory";
  ext?: string;
  size: number;
  parent: string;
  modified: Date;
}

const readDirectory = (dir: string) => {
  const results: FileInfo[] = [];

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
          parent: relativePath,
          modified: fileInfo.mtime,
        });

        traverseDir(fullPath);
      } else {
        results.push({
          name: file,
          ext: file.match(/\.[0-9a-z]+$/i)?.[0],
          type: "file",
          size: fileInfo.size,
          parent: relativePath,
          modified: fileInfo.mtime,
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
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory);
    }

    const files = readDirectory(uploadsDirectory);
    return files;
  },
});
