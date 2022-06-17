import { FileList } from "@components/filelist";
import { IconX } from "@components/icon";
import { trpc } from "@utils/trpc";

const Files = () => {
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
    <div className="w-full mx-auto mt-10 lg:w-4/5 xl:w-3/5">
      <FileList files={data} />
    </div>
  );
};

Files.auth = true;

export default Files;
