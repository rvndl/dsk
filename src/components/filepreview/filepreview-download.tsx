import { Button } from "@components/button";
import { trpc } from "@utils/trpc";
import { humanFileSize } from "@utils/utils";

interface Props {
  path: string[];
  filename: string;
}

export const FilePreviewDownload = ({ path, filename }: Props) => {
  const { data, isFetching } = trpc.useQuery(
    ["file.get-details", { path: path.join("/") }],
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-lg border-slate-200">
      <h2 className="font-semibold">This file cannot be previewed</h2>
      <div className="flex flex-col items-center mt-2 gap-y-1">
        <p className="">
          {filename} - {humanFileSize(data?.size || 0)}
        </p>
        <Button className="px-2 py-0.5 text-sm w-min">Download</Button>
      </div>
    </div>
  );
};
