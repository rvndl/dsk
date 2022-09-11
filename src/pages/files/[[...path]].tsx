import { FileUpload } from "@components/file-upload";
import { FileList, FileListBreadcrumb } from "@components/file-list";
import { IconX } from "@components/icon";
import { trpc } from "@utils/trpc";
import { usePath } from "@hooks/use-path";
import { NewFolder } from "@components/new-folder";

const Files = () => {
  const [path] = usePath();
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
        <FileListBreadcrumb path={path} />
        <div className="flex gap-2 ml-auto shrink-0">
          <NewFolder path={path} />
          <FileUpload path={path} />
        </div>
      </div>
      <FileList path={path} files={data} />
    </div>
  );
};

Files.auth = true;

export default Files;
