import { Button } from "@components/ui";
import { useSelectedItemsStore } from "@store/selected-items";
import { trpc } from "@utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export const SelectedItems = () => {
  const { items, clear } = useSelectedItemsStore((state) => state);
  const ctx = trpc.useContext();
  const { mutate: deleteMultiple } = trpc.useMutation(
    ["file.delete-multiple"],
    {
      onError(error) {
        toast.error(error.message);
        clear();
      },
      onSuccess() {
        ctx.invalidateQueries("file.get-all");
        toast.success(`Deleted ${items.length} items`);

        clear();
      },
    }
  );

  const handleOnClear = () => clear();

  const handleOnDelete = () => {
    deleteMultiple({ paths: items.map((item) => item.path) });
  };

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, top: 0 }}
          animate={{ opacity: 1, top: "5rem" }}
          exit={{ opacity: 0, top: 0 }}
          className="fixed flex flex-row items-center w-full max-w-md -translate-x-1/2 bg-white border border-gray-300 shadow-lg top-20 rounded-2xl left-1/2"
        >
          <div className="pl-4">
            <h2 className="font-semibold">Manage selected items</h2>
            <p className="text-sm font-medium text-gray-600">
              {items.length} selected item(s)
            </p>
          </div>
          <div className="flex flex-col ml-auto border-l border-gray-200">
            <Button
              className="bg-red-500 rounded-none rounded-tr-lg hover:bg-red-600"
              onClick={handleOnDelete}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              className="border-none rounded-none rounded-br-lg shadow-none"
              onClick={handleOnClear}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
