import { FilePreviewContent } from "./filepreview-content";
import { FilePreviewDownload } from "./filepreview-download";
import { isText } from "istextorbinary";

interface Props {
  path: string[];
}

export const FilePreview = ({ path }: Props) => {
  const filename = path.at(-1) || "unknown";
  const previewable = isText(filename);

  return (
    <div className="w-full max-w-3xl md:w-auto">
      {previewable ? (
        <FilePreviewContent path={path} filename={filename} />
      ) : (
        <FilePreviewDownload path={path} filename={filename} />
      )}
    </div>
  );
};
