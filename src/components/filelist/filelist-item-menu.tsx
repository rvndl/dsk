import { Menu, Transition } from "@headlessui/react";
import { IconDots, IconShare, IconTrash } from "@components/icon";
import { Fragment, SyntheticEvent } from "react";
import { trpc } from "@utils/trpc";
import clsx from "clsx";

interface Props {}

export const FileListItemMenu = ({}: Props) => {
  const shareFile = trpc.useMutation(["share.share-file"], {
    onError(error) {},
    onSuccess(data) {
      console.log(data);
    },
  });

  const handleOnShare = (e: SyntheticEvent) => {
    e.stopPropagation();

    shareFile.mutate({ path: "/", limits: { shares: 10 } });
  };

  return (
    <>
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
                    onClick={handleOnShare}
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
    </>
  );
};