import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface FormModalProps {
  open: boolean;
  setOpen: (boolean) => void;
  children: any;
}

export default function FormModal(props: FormModalProps) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={props.setOpen}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative rounded-md flex pt-14 overflow-hidden shadow-2xl bg-gray-50 text-gray-900">
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute top-4 right-4 text-gray-800 hover:text-red-500"
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

                <div className="w-full gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  {props.children}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
