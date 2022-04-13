/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

export default function CreateCatModal({ isCharged, setCharged }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  function setupConfig(method, url, headers, data) {
    return {
      method: method,
      url: url,
      headers: headers,
      data: data,
    };
  }

  function CreateCatCall() {
    const catNameF = document.getElementById("titleField").value;
    if (catNameF.length == 0) {
      console.log("Le nom de la catégorie ne peut pas être vide");
      setShow(true);
    } else {
      setShow(false);
      var dataC = JSON.stringify({
        data: {
          name: catNameF,
        },
      });

      var config = setupConfig(
        "post",
        HOST + "categories/",
        { "Content-Type": "application/json" },
        dataC
      );

      axios(config)
        .then(function (response) {
          var categorie = JSON.stringify(response.data); // categorie ajoutée
          console.log("La categorie a été ajouté:\n" + categorie);
          setOpen(false);
          setCharged(false);
        })
        .catch(() => {
          console.log(
            "Il y a eu un probleme en essayant d'ajouter la categorie (peut-être deja défini ?)"
          );
        });
    }
  }

  const cancelButtonRef = useRef(null);

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
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
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
                        Ajouter une catégorie de prestations
                      </Dialog.Title>

                      <form className="mt-6">
                        <div className="flex-col items-center">
                          <input
                            onChange={() => setShow(false)}
                            id="titleField"
                            placeholder="Titre"
                            className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                          />
                          {show && (
                            <p className="text-sm text-red-600 mt-2">
                              Le nom de la catégorie ne peut pas être vide.
                            </p>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      CreateCatCall();
                    }}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                      setShow(false);
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
        class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-gray-300 hover:bg-gray-300 ml-2 sm:ml-3 font-normal focus:outline-none bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out  dark:bg-indigo-600 rounded text-gray-600 px-6 py-2 text-sm"
        onClick={() => setOpen(true)}
      >
        Ajouter une catégorie
      </button>
    </div>
  );
}
