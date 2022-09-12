import { Modal } from "@components/modal";
import { Button, Input } from "@components/ui";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { trpc } from "@utils/trpc";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  share: inferQueryResponse<"share.get-all">[0];
}

export const ModalEdit = ({ share, isOpen, setOpen }: Props) => {
  const [permanent, setPermanent] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(0);
  const [dateLimit, setDateLimit] = useState(0);

  const ctx = trpc.useContext();
  const { mutate: update } = trpc.useMutation(["share.update"], {
    onError(error) {
      toast.error(error.message);
      setOpen(false);
    },
    onSuccess() {
      ctx.invalidateQueries("share.get-all");
      toast.success("Share updated successfully");

      setOpen(false);
    },
  });

  useEffect(() => {
    setPermanent(share.permanent);
    setDownloadLimit(share.downloadLimit === -1 ? 0 : share.downloadLimit);
    setDateLimit(new Date(share.expires || 0).getTime());
  }, [share]);

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    update({
      id: share.id,
      limits: { downloadLimit, expires: dateLimit, permanent },
    });
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Edit share</h2>
        <form className="flex-row w-full mt-4" onSubmit={handleOnSubmit}>
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="permanent"
                aria-describedby="permanent-description"
                name="permanent"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-sky-600 focus:ring-sky-500"
                checked={permanent}
                onChange={() => setPermanent((b) => !b)}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="permanent" className="font-medium text-gray-700">
                Permanent
              </label>
              <p id="comments-description" className="text-gray-500">
                File will be shared forever untill disabled.
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center">
              <div className="w-2/5 text-sm font-medium text-gray-700">
                Download limit
              </div>
              <Input
                min="0"
                type="number"
                disabled={permanent}
                placeholder="0"
                value={downloadLimit}
                onChange={(e) => setDownloadLimit(Number(e.target.value))}
                sideText="Downloads"
              />
            </div>
            <div className="relative w-full h-px my-4 text-center border-b">
              <p className="absolute left-0 right-0 text-sm font-semibold text-center text-gray-600 -bottom-2.5 select-none">
                OR
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2/5 text-sm font-medium text-gray-700">
                Expires
              </div>
              <Input
                type="datetime-local"
                value={dateLimit}
                disabled={permanent}
                onChange={(e) => setDateLimit(e.target.valueAsNumber)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-8 ml-auto gap-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" isLoading={false}>
              Edit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
