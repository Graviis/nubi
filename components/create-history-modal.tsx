"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreateHistoryForm } from "./create-history-form";
import { Icons } from "./icons";

export function CreateHistoryModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        disabled={isOpen}
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-center text-sm font-medium  text-white  hover:ring-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-600 disabled:bg-gray-400"
      >
        Crear historia
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="z-9 relative" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="rounded-4xl w-full max-w-xl transform overflow-hidden rounded-lg border bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mb-4 flex flex-row justify-end">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer rounded-lg border focus:ring-2 focus:ring-sky-500"
                    >
                      <Icons.close />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold text-gray-900"
                  >
                    Crear una nueva historia
                  </Dialog.Title>
                  <div className="mt-8">
                    <CreateHistoryForm />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
