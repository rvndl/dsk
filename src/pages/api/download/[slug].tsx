import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@server/db/prisma";
import path from "path";
import * as fs from "fs";
import { getFilePath } from "@server/lib/file";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;
  if (!slug) {
    res.status(400).json({ error: "Missing slug" });
    return;
  }

  const session = await getServerSession({ req, res }, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const file = await prisma.file.findFirst({ where: { id: slug } });
  if (!file) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  const filePath = getFilePath(file.path);
  const readStream = fs.createReadStream(filePath);

  res.setHeader("Content-Length", file.size);

  await new Promise((resolve, reject) => {
    readStream.pipe(res);

    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
}
