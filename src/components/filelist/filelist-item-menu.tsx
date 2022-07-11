import { Menu, Transition } from "@headlessui/react";
import { IconDots, IconShare, IconTrash } from "@components/icon";
import { Fragment, SyntheticEvent, useState } from "react";
import { trpc } from "@utils/trpc";
import clsx from "clsx";
import { Modal } from "@components/modal";
import { Button } from "@components/button";
import { Input } from "@components/input";

interface Props {}

export const FileListItemMenu = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [downloadLimit, setDownloadLimit] = useState(0);
  const [dateLimit, setDateLimit] = useState(0);

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
                    onClick={() => setIsOpen(true)}
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

      <Modal isOpen={isOpen} setOpen={setIsOpen}>
        <div className="w-full p-4">
          <h2 className="text-lg font-semibold">Share file</h2>
          <div className="flex-row w-full mt-4">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="permanent"
                  aria-describedby="permanent-description"
                  name="permanent"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded text-sky-600 focus:ring-sky-500"
                  checked={permanent}
                  onChange={() => setPermanent((b) => !b)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="permanent"
                  className="font-medium text-gray-700"
                >
                  Permanent
                </label>
                <p id="comments-description" className="text-gray-500">
                  File will be shared forever untill disabled.
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <div className="flex items-center">
                <div className="w-2/5 text-sm font-medium text-gray-700">
                  Download limit
                </div>
                <Input
                  min="0"
                  type="number"
                  disabled={permanent}
                  placeholder="0"
                  onChange={(e) => setDownloadLimit(Number(e.target.value))}
                  sideText="Downloads"
                />
              </div>
              <div className="relative w-full h-px my-4 text-center border-b">
                <p className="absolute left-0 right-0 text-sm font-semibold text-center text-gray-600 -bottom-2.5 select-none">
                  OR
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-2/5 text-sm font-medium text-gray-700">
                  Date limit
                </div>
                <Input
                  type="datetime-local"
                  disabled={permanent}
                  onChange={(e) => setDateLimit(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mt-8 ml-auto gap-x-2">
              <Button variant="secondary">Cancel</Button>
              <Button>Share</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
