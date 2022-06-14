import { useRouter } from "next/router";
import { useMemo } from "react";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { FileListHeader } from "./filelist-header";
import { FileListItem } from "./filelist-item";
import { FileListBreadcrumb } from "./filelist-breadcrumb";

type FilesType = inferQueryResponse<"file.get-all">;

interface Props {
  files: FilesType | undefined;
}

export const FileList = ({ files }: Props) => {
  const router = useRouter();
  const slugs = router.query.path;

  const path = useMemo(() => {
    if (!slugs) return "/";

    return (slugs as string[]).join("/");
  }, [slugs]);

  const contents = useMemo(
    () => files?.filter(({ parent }) => parent === (path === "/" ? "." : path)),
    [files, path]
  );

  return (
    <>
      <FileListBreadcrumb path={path} />
      <div className="w-full border rounded-lg border-slate-200">
        <FileListHeader />
        {contents?.map((file) => (
          <FileListItem key={file.name} path={path} file={file} />
        ))}
      </div>
    </>
  );
};
