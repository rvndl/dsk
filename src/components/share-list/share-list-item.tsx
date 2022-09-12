import { IconMatchExtension } from "@components/icon";
import { Badge, Input } from "@components/ui";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { checkShareExpiry } from "@utils/utils";
import { format } from "date-fns";
import { useState } from "react";
import { ModalEdit } from "./modals/modal-edit";

interface Props {
  share: inferQueryResponse<"share.get-all">[0];
}

export const ShareListItem = ({ share }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = `${window.location.origin}/share/${share.id}`;
  const expired = checkShareExpiry(share);
  const extension = "." + share.file?.name?.split(".").pop();

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex items-center text-sm font-medium text-gray-900 truncate gap-x-2">
              <IconMatchExtension ext={extension} />
              {share.file?.name}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm text-gray-900">
              <Input
                className="px-1 py-1 text-sm sm:text-sm"
                value={shareUrl}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {expired ? (
            <Badge variant="warning">Expired</Badge>
          ) : (
            <Badge variant="success">Active</Badge>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{share.downloads}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {share.downloadLimit === -1 ? "-" : share.downloadLimit}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          {!!share.expires && new Date(share.expires).getTime() > 0
            ? format(new Date(share.expires), "yyyy-MM-dd HH:mm:ss")
            : "-"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {share.permanent ? "Yes" : "No"}
          </div>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <a
            href="#"
            className="text-sky-600 hover:text-sky-900"
            onClick={() => setIsOpen(true)}
          >
            Edit
          </a>
        </td>
      </tr>

      <ModalEdit share={share} isOpen={isOpen} setOpen={setIsOpen} />
    </>
  );
};
