import { useTransferStore } from "@store/transfer";
import { FileProgressItem } from "./file-progress-item";

export const FileProgress = () => {
  const transfers = useTransferStore(({ transfers: files }) => files);

  if (transfers.length === 0) {
    return null;
  }

  return (
    <div className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-96 bottom-4 left-4">
      <div className="px-4 py-2 text-base font-semibold text-gray-600 bg-gray-300 rounded-t-md">
        File status
      </div>
      {transfers.map(({ name, percentage }) => (
        <FileProgressItem
          name={name}
          percentage={percentage}
          type="upload"
          key={name}
        />
      ))}
    </div>
  );
};
