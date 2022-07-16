import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import formidable, { File } from "formidable";
import * as path from "path";
import * as fs from "fs";
import { prisma } from "../../../server/db/prisma";

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
  // const session = await getServerSession({ req, res }, authOptions);
  // if (!session) {
  //   res.status(401).json({ message: "Unauthorized" });
  //   return;
  // }

  const form = await new Promise<FormResults | undefined>((resolve, reject) => {
    let response: FormResults = { files: [], directory: "" };

    const form = new formidable.IncomingForm();
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
  });

  if (!form?.files) {
    res.status(400).json({ message: "No files" });
    return;
  }

  const target = path.join(process.cwd(), "/uploads/");
  await Promise.all(
    form.files.map(async ([, file]) => {
      const tempPath = file.filepath;

      await fs.rename(tempPath, `${target}${file.originalFilename}`, () => {});
      await prisma.file.create({
        data: {
          name: file.originalFilename || "unknown",
          path: `${target}${file.originalFilename}`,
          size: file.size,
        },
      });
    })
  );

  res.status(200).json({ success: true });
}
