import { usePath } from "@hooks/usePath";
import Link from "next/link";

export const FileListBreadcrumb = () => {
  const path = usePath();

  return (
    <div className="flex px-4 py-1 my-2 border rounded-lg border-slate-200">
      <div className="text-slate-400">/</div>
      {path.map((dir, idx) => (
        <Link
          href={(path && path.filter((_, id) => id < idx + 1).join("/")) || "/"}
          key={dir}
        >
          <div className="flex">
            <div className="px-1 mx-1 text-blue-700 transition-colors bg-blue-500 rounded-lg cursor-pointer bg-opacity-20 hover:bg-opacity-30">
              {dir}
            </div>
            <p className="text-slate-400">/</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
