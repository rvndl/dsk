import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, ReactNode, SetStateAction, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const Modal = ({ isOpen, setOpen, children }: Props) => {
  const contentRef = useRef(null);

  return createPortal(
    <>
      <Transition.Root show={isOpen}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-50 overflow-y-auto"
          initialFocus={contentRef}
          open={isOpen}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-50" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                ref={contentRef}
              >
                {children}
                {/* FocusTrap fix */}
                <button className="absolute bottom-0 opacity-0"></button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>,
    document.getElementById("modal-root")!
  );
};
