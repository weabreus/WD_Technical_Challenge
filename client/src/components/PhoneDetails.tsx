import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhoneType } from "../hooks";

type PhoneDetailsPropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedPhone: PhoneType | undefined;
  setSelectedPhone: Dispatch<SetStateAction<PhoneType | undefined>>;
};
// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PhoneDetails({
  open,
  setOpen,
  selectedPhone,
  setSelectedPhone,
}: PhoneDetailsPropsType) {
  const [color, setColor] = useState<string>("white");

  useEffect(() => {
    if (selectedPhone?.color === "black" || selectedPhone?.color === "white") {
      setColor(`bg-${selectedPhone.color}`);
    } else {
      setColor(`bg-${selectedPhone?.color.trim()}-500`);
    }
  }, [selectedPhone]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setSelectedPhone(undefined);
          setOpen(false);
        }}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {`${selectedPhone?.name} details`}
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="relative h-40 sm:h-56">
                            <img
                              className="absolute h-full w-full object-contain"
                              src={`/images/${selectedPhone?.imageFileName}`}
                              alt=""
                            />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center justify-between">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    {selectedPhone?.manufacturer} -{" "}
                                    {selectedPhone?.name}
                                  </h3>
                                  <h3 className="text-xl font-normal text-gray-900 sm:text-2xl">
                                    US$ {selectedPhone?.price}
                                  </h3>
                                </div>
                                <div className="flex gap-2 ">
                                  <div
                                    className={classNames(
                                      color,
                                      `p-2 border w-0 rounded`
                                    )}
                                  ></div>
                                  <p className="text-sm text-gray-500">
                                    {selectedPhone?.color}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p>{selectedPhone?.description}</p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Screen size
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {selectedPhone?.screen}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Processor
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {selectedPhone?.processor}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Ram
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              {selectedPhone?.ram} GB
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
