import { Modal } from "@components/modal";
import { Button, Input } from "@components/ui";
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
  path: string;
  fileName: string;
}

export const ShareModal = ({ path, fileName, isOpen, setOpen }: Props) => {
  const [succeed, setSucceed] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(0);
  const [dateLimit, setDateLimit] = useState(0);
  const [slug, setSlug] = useState("");

  const shareFile = trpc.useMutation(["share.share-file"], {
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(slug) {
      toast.success("File shared successfully");

      setSlug(slug);
      setSucceed(true);
    },
  });

  useEffect(() => {
    // Switch back to sharing mode after the transition is done
    const timeout = setTimeout(() => setSucceed(false), 300);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const filePath = path === "/" ? fileName : `${path}/${fileName}`;

    shareFile.mutate({
      path: filePath,
      limits: { shares: downloadLimit, expires: dateLimit, permanent },
    });
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Share file</h2>
        {succeed ? (
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              File shared successfully. You can share it with the following
              link:
            </p>
            <div className="mt-1">
              <Input
                value={`${window.location.origin}/share/${slug}`}
                className="w-full"
                readOnly
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="flex justify-end w-full mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
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
                <label
                  htmlFor="permanent"
                  className="font-medium text-gray-700"
                >
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

              <Button type="submit" isLoading={shareFile.isLoading}>
                Share
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
