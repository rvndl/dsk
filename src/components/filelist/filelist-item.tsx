import Link from "next/link";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { format } from "date-fns";
import { humanFileSize } from "@utils/utils";
import { IconFolder, IconMatchExtension } from "@components/icon";

type FileType = inferQueryResponse<"file.get-all">[0];

interface Props {
  path: string;
  file: FileType;
}

export const FileListItem = ({ file, path }: Props) => (
  <Link href={`./${path}/${file.name}/`}>
    <div className="flex w-full p-4 border-b cursor-pointer border-slate-200 hover:bg-slate-100">
      <div className="flex w-1/3">
        <span className="mr-2">
          {file.type === "directory" ? (
            <IconFolder />
          ) : (
            <IconMatchExtension ext={file.ext} />
          )}
        </span>
        <p>{file.name}</p>
      </div>
      <p className="w-1/3">{format(new Date(file.modified), "LLL dd yyyy")}</p>
      <p className="w-1/3">
        {file.type === "file" && humanFileSize(file.size)}
      </p>
    </div>
  </Link>
);
