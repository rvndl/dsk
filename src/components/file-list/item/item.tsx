import Link from "next/link";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { format } from "date-fns";
import { humanFileSize } from "@utils/utils";
import { IconFolder, IconMatchExtension } from "@components/icon";
import { useEffect, useState } from "react";
import { FileListItemMenu } from "./item-menu";
import { Checkbox } from "@components/ui";
import { useSelectedItemsStore } from "@store/selected-items";

type FileType = inferQueryResponse<"file.get-all">[0];

interface Props {
  path: string;
  file: FileType;
}

export const FileListItem = ({ file, path }: Props) => {
  const [checked, setChecked] = useState(false);
  const [linkPath, setLinkPath] = useState("");
  const { add, remove, items } = useSelectedItemsStore((state) => state);

  useEffect(() => {
    if (file.type === "file") {
      setLinkPath(`/preview/${path}/${file.name}`);
    } else {
      setLinkPath(`./${path}/${file.name}/`);
    }
  }, [file, path]);

  useEffect(() => {
    const itemPath = `${path}/${file.name}`;
    const item = items.find((item) => item.path === itemPath);
    if (!item) {
      setChecked(false);
    }
  }, [items, linkPath, path, file.name]);

  const handleOnChange = () => {
    const itemPath = `${path}/${file.name}`;
    checked ? remove(itemPath) : add(itemPath);
    setChecked((b) => !b);
  };

  return (
    <div className="flex items-center w-full p-4 border-b border-slate-200 hover:bg-slate-100/25 group">
      {file.type === "file" ? (
        <div className="flex items-center pr-3">
          <Checkbox checked={checked} onChange={handleOnChange} />
        </div>
      ) : (
        <div className="pr-6">&nbsp;</div>
      )}
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
