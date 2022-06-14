import { useEffect, useState } from "react";

interface Props {
  path: string;
}

export const FileListBreadcrumb = ({ path }: Props) => {
  const [directories, setDirectories] = useState<string[]>([]);

  useEffect(() => {
    setDirectories(path === "/" ? [] : path.split("/"));
  }, [path]);

  return (
    <div className="flex px-4 py-1 my-2 border rounded-lg border-slate-200">
      <div className="text-slate-400">/</div>
      {directories.map((dir) => (
        <div className="flex">
          <p className="px-1 mx-1 text-blue-700 bg-blue-500 rounded-lg bg-opacity-20">
            {dir}
          </p>
          <p className="text-slate-400">/</p>
        </div>
      ))}
    </div>
  );
};
