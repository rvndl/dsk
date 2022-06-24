import Link from "next/link";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";
import { format } from "date-fns";
import { humanFileSize } from "@utils/utils";
import {
  IconDots,
  IconFolder,
  IconMatchExtension,
  IconShare,
  IconTrash,
} from "@components/icon";
import { Fragment, useEffect, useState } from "react";

import { Menu, Transition } from "@headlessui/react";

type FileType = inferQueryResponse<"file.get-all">[0];

interface Props {
  path: string;
  file: FileType;
}

export const FileListItem = ({ file, path }: Props) => {
  const [linkPath, setLinkPath] = useState("");

  useEffect(() => {
    if (file.type === "file") {
      setLinkPath(`/preview/${path}/${file.name}`);
    } else {
      setLinkPath(`./${path}/${file.name}/`);
    }
  }, [file, path]);

  return (
    <Link href={linkPath}>
      <div className="flex w-full p-4 border-b cursor-pointer border-slate-200 hover:bg-slate-100/25 group">
        <div className="flex w-1/3">
          <span className="mr-2">
            {file.type === "directory" ? (
              <IconFolder />
            ) : (
              <IconMatchExtension ext={file.ext} />
            )}
          </span>
          <p>{file.name}</p>
        </div>
        <p className="w-1/3">
          {format(new Date(file.modified), "LLL dd yyyy")}
        </p>
        <div className="flex w-1/3">
          <p>{file.type === "file" && humanFileSize(file.size)}</p>
          <div className="relative ml-auto">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full transition opacity-0 group-hover:opacity-100 text-black/40 hover:text-black">
                <IconDots />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-blue-500/20 text-blue-600" : ""
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="w-5 h-5 mr-2">
                            <IconShare />
                          </div>
                          Share
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-red-500/20 text-red-600" : ""
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="w-5 h-5 mr-2 ">
                            <IconTrash />
                          </div>
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Link>
  );
};
