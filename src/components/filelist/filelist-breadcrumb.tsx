import { IconChevronRight, IconHome } from "@components/icon";
import { usePath } from "@hooks/usePath";
import clsx from "clsx";
import Link from "next/link";

export const FileListBreadcrumb = () => {
  const [path] = usePath();

  return (
    <div className="flex items-center p-2 bg-white border rounded-lg w-min">
      <Link href="/">
        <div className="flex items-center justify-center cursor-pointer bg-opacity-20 hover:bg-opacity-30">
          <IconHome />
        </div>
      </Link>
      <div className="text-gray-300">
        <IconChevronRight />
      </div>
      {path.map((dir, idx) => (
        <Link
          href={(path && path.filter((_, id) => id < idx + 1).join("/")) || "/"}
          key={dir}
        >
          <div className="flex items-center">
            <div
              className={clsx(
                "mx-2 font-semibold text-gray-500 cursor-pointer text-sm",
                { "text-sky-500": idx === path.length - 1 }
              )}
            >
              {dir}
            </div>
            {idx !== path.length - 1 && (
              <p className="font-bold text-gray-300">
                <IconChevronRight />
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
