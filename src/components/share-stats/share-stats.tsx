import { Error } from "@components/error";
import { trpc } from "@utils/trpc";
import { SpinnerCircular } from "spinners-react";
import { ShareStatsItem } from "./share-stats-item";

export const ShareStats = () => {
  const { data, isLoading, error } = trpc.useQuery(["share.get-statiscs"]);

  if (isLoading)
    return (
      <div className="flex items-center px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6 gap-x-4">
        <SpinnerCircular size={38} color="#000" />
        Loading statiscs...
      </div>
    );

  if (error || !data) return <Error msg={error?.message} />;

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Share stats
      </h3>
      <dl className="grid grid-cols-1 gap-5 mt-3 sm:grid-cols-3">
        <ShareStatsItem name="Total Files" value={data.fileCount} />
        <ShareStatsItem name="Shared Files" value={data.shareCount} />
        <ShareStatsItem name="Total Downloads" value={data.downloadCount} />
      </dl>
    </div>
  );
};
