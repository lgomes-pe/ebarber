import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";

var axios = require("axios");
//var fs = require("fs");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

export default function CreateFormModal({ setCharged }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const cancelButtonRef = useRef(null);

  function setupConfig(method, url, headers, data) {
    return {
      method: method,
      url: url,
      headers: headers,
      data: data,
    };
  }

  function CreateFormCall() {
    /*
    const titreF = document.getElementById("titleField").value;
    const descriptionF = document.getElementById("descField").value;
    const prerequisiteF = document.getElementById("prerequisiteField").value;
    const priceF = document.getElementById("priceField").value;

    if (titreF.length == 0 || priceF.length == 0) {
      //Message pour les champs obligatoires avec setShow (useState)
    } else {
        //API CALL
    }
    */
  }
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl w-full">
                <div className="flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Ajouter une formation
                      </Dialog.Title>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="flex grow-0 w-full space-x-6">
                        <form className="w-full mt-6">
                          <div className="flex items-center space-x-5">
                            <input
                              id="titleField"
                              placeholder="Titre"
                              className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                            />
                          </div>
                          <div className="mt-4">
                            <textarea
                              id="descField"
                              placeholder="Description"
                              className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                              defaultValue={""}
                            />
                          </div>
                          <div className="flex w-max items-center space-x-5 mt-4">
                            <input
                              id="priceField"
                              placeholder="Prix"
                              type="number"
                              min={0}
                              className="w-1/6 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                            />
                            <p className="font-semibold">€</p>
                          </div>
                          {show && (
                            <p className="text-sm text-red-600 mt-4">
                              Un ou plusieurs champs requis sont vides.
                            </p>
                          )}
                        </form>
                        <div className="relative mt-6 bg-white w-full">
                          <div className="flex flex-col items-center justify-center w-full mb-8 border border-dashed border-indigo-700 rounded-lg py-8">
                            <div className="cursor-pointer mb-5 text-indigo-700 dark:text-indigo-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-cloud-upload"
                                width={60}
                                height={60}
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                <polyline points="9 15 12 12 15 15" />
                                <line x1={12} y1={12} x2={12} y2={21} />
                              </svg>
                            </div>
                            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center">
                              Drag and drop here
                            </p>
                            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center my-1">
                              or
                            </p>
                            <label
                              htmlFor="fileUp"
                              className="cursor-pointer text-base font-normal tracking-normal text-indigo-700 dark:text-indigo-600 text-center"
                            >
                              {" "}
                              browse{" "}
                            </label>
                            <input
                              type="file"
                              className="hidden"
                              name="fileUpload"
                              id="fileUp"
                            />
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <div className="items-center text-gray-600 dark:text-gray-400 flex">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-file"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                              </svg>
                              <p className="text-gray-800 dark:text-gray-100 font-normal text-base tracking-normal ml-2 mr-4">
                                Big Project.pdf
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 font-normal text-base tracking-normal">
                                37%
                              </p>
                            </div>
                            <div className="cursor-pointer text-gray-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-x"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                              </svg>
                            </div>
                          </div>

                          <div className="relative mb-6 mt-4">
                            <hr className="h-1 rounded-sm bg-gray-200" />
                            <hr className="absolute top-0 h-1 w-9/12 rounded-sm bg-indigo-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => CreateFormCall()}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setShow(false);
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <button
        class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500 ml-2 sm:ml-3 font-normal focus:outline-none bg-indigo-600 dark:hover:bg-indigo-700 transition duration-150 ease-in-out  dark:bg-indigo-600 rounded text-white px-6 py-2 text-sm"
        onClick={() => setOpen(true)}
      >
        Ajouter une formation
      </button>
    </div>
  );
}
