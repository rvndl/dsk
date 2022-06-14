import FileList from "../../components/filelist/filelist";
import { trpc } from "../../utils/trpc";

const Files = () => {
  const { data, error } = trpc.useQuery(["file.get-all"]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-2/3">
        <FileList files={data} />
      </div>
    </div>
  );
};

Files.auth = true;

export default Files;
