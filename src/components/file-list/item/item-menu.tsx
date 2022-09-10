import { Menu, Transition } from "@headlessui/react";
import { IconDots, IconShare, IconTrash } from "@components/icon";
import { Fragment, useState } from "react";
import clsx from "clsx";
import { ShareModal } from "./modals";
import { DeleteModal } from "./modals/modal-delete";

interface Props {
  path: string;
  fileName: string;
}

export const FileListItemMenu = ({ path, fileName }: Props) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div>
      <Menu>
        <Menu.Button className="flex justify-center w-full transition opacity-0 group-hover:opacity-100 text-black/40 hover:text-black">
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
                    className={clsx(
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors",
                      active && "bg-blue-500/20 text-blue-600"
                    )}
                    onClick={() => setIsShareOpen(true)}
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
                    className={clsx(
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors",
                      active && "bg-red-500/20 text-red-600"
                    )}
                    onClick={() => setIsDeleteOpen(true)}
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

      <ShareModal
        path={path}
        fileName={fileName}
        isOpen={isShareOpen}
        setOpen={setIsShareOpen}
      />

      <DeleteModal
        fileName={fileName}
        isOpen={isDeleteOpen}
        setOpen={setIsDeleteOpen}
      />
    </div>
  );
};
