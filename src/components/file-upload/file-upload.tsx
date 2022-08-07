import { IconDocument } from "@components/icon";
import { Modal } from "@components/modal";
import { Button } from "@components/ui";
import { useTransferStore } from "@store/transfer";
import { trpc } from "@utils/trpc";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  path: string[];
}

export const FileUpload = ({ path }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop(acceptedFiles) {
      setFiles(acceptedFiles);
    },
  });
  const updateFile = useTransferStore(({ updateFile }) => updateFile);
  const trpcContext = trpc.useContext();

  const handleOnUpload = async () => {
    const fileUploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("directory", `${path.join("/")}/`);
      formData.append("file", file);

      return axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/upload`,
        formData,
        {
          onUploadProgress(progressEvent) {
            const percentCompleted =
              (progressEvent.loaded * 100) / progressEvent.total;

            updateFile(file.name, percentCompleted, "upload");
          },
        }
      );
    });

    setIsOpen(false);

    axios
      .all(fileUploaders)
      .then(() => trpcContext.invalidateQueries(["file.get-all"]));
  };

  useEffect(() => {
    if (!isOpen) setFiles([]);
  }, [isOpen]);

  return (
    <>
      <Button
        variant="secondary"
        className="shadow-none"
        onClick={() => setIsOpen(true)}
      >
        Upload
      </Button>

      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <div className="p-4">
          <h2 className="font-semibold font-lg">File upload</h2>
          <div className="mt-4">
            <div
              {...getRootProps()}
              className="flex items-start justify-center w-full transition-colors bg-gray-200 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-300/75 h-52"
            >
              <input {...getInputProps()} />

              <div className="flex flex-col items-center m-auto gap-y-2">
                <div className="p-2 text-gray-500 bg-gray-300 rounded-full">
                  <IconDocument />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-500">
                    Drop your files here
                  </p>
                  <p className="text-xs font-semibold text-gray-500">
                    or browse{" "}
                    <span className="cursor-pointer text-sky-700">
                      directly
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {files.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-row flex-wrap gap-2">
                {files.map((file) => (
                  <div
                    className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 border border-gray-300 rounded"
                    key={file.name}
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-row justify-end mt-4 gap-x-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button disabled={files.length === 0} onClick={handleOnUpload}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
