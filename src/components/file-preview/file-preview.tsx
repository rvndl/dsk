import { FilePreviewContent } from "./file-preview-content";
import { FilePreviewDownload } from "./file-preview-download";
import { isText } from "istextorbinary";

interface Props {
  path: string[];
  shareId?: string;
}

export const FilePreview = ({ path, shareId }: Props) => {
  const fileName = path.at(-1) || "unknown";
  const previewable = isText(fileName);

  return (
    <div className="w-full max-w-3xl md:w-auto">
      {previewable ? (
        <FilePreviewContent path={path} fileName={fileName} shareId={shareId} />
      ) : (
        <FilePreviewDownload
          path={path}
          fileName={fileName}
          shareId={shareId}
        />
      )}
    </div>
  );
};
