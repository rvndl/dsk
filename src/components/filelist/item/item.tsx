import Link from "next/link";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { format } from "date-fns";
import { humanFileSize } from "@utils/utils";
import { IconFolder, IconMatchExtension } from "@components/icon";
import { useEffect, useState } from "react";
import { FileListItemMenu } from "./item-menu";

type FileType = inferQueryResponse<"file.get-all">[0];

interface Props {
  path: string;
  file: FileType;
}

export const FileListItem = ({ file, path }: Props) => {
  const [linkPath, setLinkPath] = useState("");

  useEffect(() => {
    if (file.type === "file") {
      setLinkPath(`/preview/${path}/${file.name}`);
    } else {
      setLinkPath(`./${path}/${file.name}/`);
    }
  }, [file, path]);

  return (
    <div className="flex w-full p-4 border-b border-slate-200 hover:bg-slate-100/25 group">
      <Link href={linkPath}>
        <div className="flex w-1/3 cursor-pointer">
          <span className="mr-2">
            {file.type === "directory" ? (
              <IconFolder />
            ) : (
              <IconMatchExtension ext={file.ext} />
            )}
          </span>
          <p className="truncate">{file.name}</p>
        </div>
      </Link>
      <p className="w-1/3">{format(new Date(file.modified), "LLL dd yyyy")}</p>
      <div className="flex w-1/3">
        <p>{file.type === "file" && humanFileSize(file.size)}</p>
        <div className="relative ml-auto">
          <FileListItemMenu path={path} fileName={file.name} />
        </div>
      </div>
    </div>
  );
};
