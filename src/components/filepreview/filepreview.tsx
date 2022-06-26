import { Button } from "@components/button";
import { isText } from "istextorbinary/compiled-types";
import { FilePreviewContent } from "./filepreview-content";
import { FilePreviewDownload } from "./filepreview-download";

interface Props {
  path: string[];
}

export const FilePreview = ({ path }: Props) => {
  const filename = path.at(-1) || "unknown";
  const previewable = isText(filename);

  return (
    <div className="w-full">
      {previewable ? (
        <FilePreviewContent path={path} filename={filename} />
      ) : (
        <FilePreviewDownload filename={filename} />
      )}
    </div>
  );
};
