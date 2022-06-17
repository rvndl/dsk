import { useEffect, useMemo, useState } from "react";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { FileListHeader } from "./filelist-header";
import { FileListItem } from "./filelist-item";
import { FileListBreadcrumb } from "./filelist-breadcrumb";
import { usePath } from "@hooks/usePath";

type FilesType = inferQueryResponse<"file.get-all">;

interface Props {
  files: FilesType | undefined;
}

export const FileList = ({ files }: Props) => {
  const [pathString, setPathString] = useState("/");
  const path = usePath();

  useEffect(() => {
    if (!path.length) return setPathString("/");

    const joined = path.join("/");
    setPathString(joined);
  }, [path]);

  const contents = useMemo(
    () =>
      files
        ?.filter(
          ({ parent }) => parent === (pathString === "/" ? "." : pathString)
        )
        .sort((a, b) => {
          if (a.type === "directory" && b.type === "file") return -1;
          if (a.type === "file" && b.type === "directory") return 1;

          return a.name.localeCompare(b.name);
        }),
    [files, pathString]
  );

  return (
    <>
      <FileListBreadcrumb />
      <div className="w-full border rounded-lg border-slate-200">
        <FileListHeader />
        {contents?.map((file) => (
          <FileListItem key={file.name} path={pathString} file={file} />
        ))}
      </div>
    </>
  );
};
