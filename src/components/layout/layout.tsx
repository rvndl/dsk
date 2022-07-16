import { IconCircleDown } from "@components/icon";
import { Navbar } from "@components/navbar";
import { Progressbar } from "@components/progressbar";
import { useUploadsStore } from "@store/uploads";
import { Toaster } from "react-hot-toast";

const FileProgress = () => {
  const files = useUploadsStore(({ files }) => files);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="fixed bg-white border border-gray-300 rounded-lg shadow-md w-96 bottom-4 left-4">
      <div className="px-4 py-2 text-base font-semibold text-gray-600 bg-gray-300 rounded-t-md">
        File status
      </div>
      {files.map(({ name, percentage }) => (
        <div
          className="flex items-center justify-between w-full px-2 py-1 border-b border-b-gray-300"
          key={name}
        >
          <div className="flex items-center w-2/5">
            <div className="text-blue-500 rotate-180 shrink-0">
              <IconCircleDown />
            </div>
            <p className="ml-1 text-sm font-medium text-gray-700 truncate">
              {name}
            </p>
          </div>
          <div className="flex items-center w-3/5">
            <Progressbar value={percentage} />
            <p className="ml-2 text-sm font-medium">{percentage}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Layout = ({ children }: any) => {
  return (
    <div className="">
      <Toaster />
      <Navbar />
      <main className="main">{children}</main>
      <FileProgress />
    </div>
  );
};
