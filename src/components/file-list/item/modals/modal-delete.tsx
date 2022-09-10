import { Modal } from "@components/modal";
import { Button } from "@components/ui";
import { trpc } from "@utils/trpc";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fileName: string;
}

export const DeleteModal = ({ fileName, isOpen, setOpen }: Props) => {
  const ctx = trpc.useContext();
  const deleteFile = trpc.useMutation(["file.delete"], {
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      ctx.invalidateQueries(["file.get-all"]);

      toast.success("File removed successfully");
      setOpen(false);
    },
  });

  const handleOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    deleteFile.mutate({ fileName });
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Delete file</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete this file? This action cannot be
            undone.
          </p>
          <div className="flex justify-end w-full gap-2 mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              variant="primary"
              className="text-white bg-red-500 hover:bg-red-600"
              isLoading={deleteFile.isLoading}
              onClick={handleOnSubmit}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
