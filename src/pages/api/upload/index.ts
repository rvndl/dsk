import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import formidable, { File } from "formidable";
import * as path from "path";
import * as fs from "fs";
import { prisma } from "@server/db/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormResults = {
  directory: string;
  files: Array<[string, File]>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession({ req, res }, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const form = await new Promise<FormResults | undefined>((resolve, reject) => {
    let response: FormResults = { files: [], directory: "" };

    const form = new formidable.IncomingForm({
      maxFileSize: 100 * 1024 * 1024 * 1024,
    });
    form.parse(req, (err, { directory }) => {
      if (err) {
        reject(err);
      }

      if (!directory) {
        reject(new Error("No directory specified"));
      }

      response.directory = directory as string;
    });

    form.on("file", (field, file) => {
      response.files.push([field, file]);
    });

    form.on("error", (err) => reject(err));
    form.on("end", () => resolve(response));
  }).catch((err) => {
    res.status(400).json({ message: err.message });
    return;
  });

  if (!form?.files) {
    res.status(400).json({ message: "No files" });
    return;
  }

  const target = path.join(process.cwd(), "/uploads/" + form.directory);
  await Promise.all(
    form.files.map(([, file]) => {
      const tempPath = file.filepath;

      const targetName = `${target}${file.originalFilename}`;

      fs.rename(tempPath, targetName, async (err) => {
        if (err) {
          console.error(err);
          return;
        }

        const { ino } = fs.lstatSync(targetName);

        await prisma.file.create({
          data: {
            inode: ino + "",
            name: file.originalFilename || "unknown",
            path: form.directory + file.originalFilename,
            size: file.size,
          },
        });
      });
    })
  );

  res.status(200).json({ success: true });
}
