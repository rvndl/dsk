import { FileList } from "@components/filelist";
import { Navbar } from "@components/navbar/navbar";
import { trpc } from "@utils/trpc";

const Files = () => {
  const { data, error } = trpc.useQuery(["file.get-all"]);

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="justify-center w-full mx-auto mt-10 lg:w-4/5 xl:w-3/5">
        <FileList files={data} />
      </div>
    </div>
  );
};

Files.auth = true;

export default Files;
