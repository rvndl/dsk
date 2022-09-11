import { Modal } from "@components/modal";
import { Button, Input } from "@components/ui";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  path: string[];
}

export const NewFolder = ({ path }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const ctx = trpc.useContext();
  const { mutate: createFolder } = trpc.useMutation(["folder.create"], {
    onError(error) {
      toast.error(error.message);
    },
    onSuccess() {
      toast.success("Folder created");
      ctx.invalidateQueries(["file.get-all"]);

      setName("");
      setIsOpen(false);
    },
  });

  const handleOnCreate = async () =>
    createFolder({ path: path.join("/"), name });

  return (
    <>
      <Button
        variant="secondary"
        className="shadow-none"
        onClick={() => setIsOpen(true)}
      >
        New folder
      </Button>

      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <div className="p-4">
          <h2 className="font-semibold font-lg">Create new folder</h2>
          <div className="mt-4">
            <Input
              placeholder="Folder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-end mt-4 gap-x-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOnCreate} disabled={name.length < 1}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
