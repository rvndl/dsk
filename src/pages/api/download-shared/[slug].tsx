import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/prisma";
import * as fs from "fs";
import { checkShareExpiry } from "@utils/utils";
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

  const share = await prisma.share.findFirst({
    where: { id: slug },
    include: { file: true },
  });
  if (!share) {
    res.status(404).json({ error: "Share not found" });
    return;
  }

  const expired = checkShareExpiry(share);
  if (expired) {
    res.status(404).json({ error: "Share expired" });
    return;
  }

  if (!share.file) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  await prisma.share.update({
    data: { downloads: share.downloads + 1 },
    where: { id: share.id },
  });

  const filePath = getFilePath(share.file.path);
  const readStream = fs.createReadStream(filePath);

  res.setHeader("Content-Length", share.file.size);

  await new Promise((resolve, reject) => {
    readStream.pipe(res);

    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
}
