import Link from "next/link";
import { inferQueryResponse } from "../../pages/api/trpc/[trpc]";

type FileType = inferQueryResponse<"file.get-all">[0];

interface Props {
  path: string;
  file: FileType;
}

const FileListItem = ({ file, path }: Props) => (
  <Link href={`./${path}${file.name}`}>
    <div className="flex w-full p-4 border-b cursor-pointer border-slate-200 hover:bg-slate-100">
      <p className="w-1/3">{file.name}</p>
      <p className="w-1/3">{file.type}</p>
      <p className="w-1/3">{file.size}</p>
    </div>
  </Link>
);

export default FileListItem;
