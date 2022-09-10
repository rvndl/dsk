import { Button } from "@components/ui";
import { useDownload } from "@hooks/use-download";
import { trpc } from "@utils/trpc";
import { humanFileSize } from "@utils/utils";

interface Props {
  path: string[];
  fileName: string;
  shareId?: string;
}

export const FilePreviewDownload = ({ path, fileName, shareId }: Props) => {
  const { data } = trpc.useQuery(
    !shareId
      ? ["file.get-details", { path: path.join("/") }]
      : ["file-shared.get-details", { slug: shareId }],
    { refetchOnWindowFocus: false }
  );
  const { data: fileId } = trpc.useQuery(
    ["file.get-id", { path: path.length > 1 ? path.join("/") : `/${path[0]}` }],
    { enabled: !shareId }
  );
  const { download } = useDownload();

  const handleOnDownload = async () => {
    if (shareId) {
      download(fileName, shareId, true);
      return;
    }

    if (!fileId) return;
    download(fileName, fileId);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-lg border-slate-200">
      <h2 className="font-semibold">This file cannot be previewed</h2>
      <div className="flex flex-col items-center mt-2 gap-y-1">
        <p className="">
          {fileName} - {humanFileSize(data?.size || 0)}
        </p>
        <Button
          className="px-2 py-0.5 text-sm w-min bg-blue-600 hover:bg-blue-700"
          onClick={handleOnDownload}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
