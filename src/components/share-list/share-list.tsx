import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { ShareListHead } from "./share-list-head";
import { ShareListItem } from "./share-list-item";

interface Props {
  shares: inferQueryResponse<"share.get-all">;
}

export const ShareList = ({ shares }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <ShareListHead />
            <tbody className="bg-white divide-y divide-gray-200">
              {shares.map((share) => (
                <ShareListItem share={share} key={share.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
