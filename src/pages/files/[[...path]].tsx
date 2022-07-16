import { Button } from "@components/button";
import { FileUpload } from "@components/file-upload";
import { FileList, FileListBreadcrumb } from "@components/filelist";
import { IconX } from "@components/icon";
import { Modal } from "@components/modal";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const Files = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = trpc.useQuery(["file.get-all"]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex p-4 text-red-500 bg-red-100 border border-red-300 rounded-lg">
          <IconX />
          <p className="ml-2 font-medium">
            An error occurred while fetching files
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-10 mx-auto lg:w-4/5 xl:w-3/5">
      <div className="flex items-center w-full mb-2">
        <FileListBreadcrumb />
        <div className="ml-auto shrink-0">
          <FileUpload path={[]} />
        </div>
      </div>
      <FileList files={data} />
    </div>
  );
};

Files.auth = true;

export default Files;
