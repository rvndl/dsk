import { Button } from "@components/button";

interface Props {
  filename: string;
}

export const FilePreviewDownload = ({ filename }: Props) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-lg border-slate-200">
      <h2 className="font-semibold">This file cannot be previewed</h2>
      <div className="flex flex-col items-center mt-2 gap-y-1">
        <p className="">{filename} - 34.4 MB</p>
        <Button className="px-2 py-0.5 text-sm w-min">Download</Button>
      </div>
    </div>
  );
};
