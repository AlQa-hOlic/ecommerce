import { Fragment, ReactChild } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  title?: string;
  open: boolean;
  setOpen: (boolean) => void;
  children?: ReactChild;
}

export default function Modal(props: ModalProps) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={props.setOpen}
      >
        <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden md:block fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex transform transition w-full md:w-auto text-left md:mt-32 md:align-middle md:inline-block md:max-w-2xl lg:max-w-4xl">
              <div className="p-4 relative w-full flex flex-col md:rounded-lg overflow-hidden bg-gray-50 text-gray-900">
                <div className="mb-2 w-full flex justify-between items-center">
                  <div className="grow">
                    {props.title && (
                      <h1 className="text-xl font-normal text-gray-800">
                        {props.title}
                      </h1>
                    )}
                  </div>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="text-gray-800 hover:text-red-500 focus:text-red-500 focus:outline-none"
                    onClick={() => props.setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div>{props.children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
