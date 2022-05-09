/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/solid";
import { SERVER, HOST } from "./constantes";
var axios = require("axios");


export default function EditFormModal({
  formId,
  title,
  description,
  prerequisite,
  price,
  videoId,
  uploadedVidId,
  isCharged,
  setCharged,
}) {

    const [open, setOpen] = useState(false);
    
    function setupConfig(method, url, headers, data) {
        return {
        method: method,
        url: url,
        headers: headers,
        data: data,
        };
    }

    const EditCall = () => {
        const titleF = document.getElementById("titleField").value;
        const descriptionF = document.getElementById("descField").value;
        const prerequisiteF = document.getElementById("prereqField").value;
        const priceF = document.getElementById("priceField").value;

        let data = {
            "data": {
                "title": titleF,
                "description": descriptionF,
                "prerequisite": prerequisiteF,
                "price": priceF,
            }
        };
        
        var dataF = JSON.stringify(data);
        //console.log("ICI POST DE FORMATION AVEC CE DATA", dataF);
        var config = setupConfig('put', HOST + 'formations/' + formId, { 'Content-Type': 'application/json' }, dataF);

        axios(config).then(function (response) {
            var formation = JSON.stringify(response.data); // formation modifiée
            //console.log("La formation a été modifié:\n" + formation);
            setOpen(false);
            setCharged(false);
        }).catch(() => {
            //console.log("Il y a eu un probleme en essayant de modifier la formation " + formId);
        });
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
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl">
                    <div className="bg-white px-4 pt-5 pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilAltIcon
                            className="h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                        />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                        >
                            Modifier la formation
                        </Dialog.Title>
                        <div class="overflow-x-scroll flex space-x-6 mt-4 ">
                        <div class="flex space-x-6 " style={{minWidth: 480}}>
                            <form className="mt-6 w-full">
                                <div className="flex items-center space-x-5">
                                <input
                                    id="titleField"
                                    placeholder="titre"
                                    className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                                    defaultValue={title}
                                />
                                </div>
                                <div className="mt-4">
                                <textarea
                                    id="descField"
                                    placeholder="description"
                                    className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                                    defaultValue={description}
                                />
                                <textarea
                                    id="prereqField"
                                    placeholder="prerequisite"
                                    className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                                    defaultValue={prerequisite}
                                />
                                </div>
                                <div className="flex items-center space-x-5 mt-4">
                                <input
                                    id="priceField"
                                    placeholder="price"
                                    type="number"
                                    min={0}
                                    className="w-1/3 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                                    defaultValue={price}
                                />
                                <p className="font-semibold">€</p>
                                </div>
                            </form>
                            
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={EditCall}
                    >
                        Modifier
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
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
            class=" my-4 flex items-center bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-gray-600 pl-3 pr-6 py-2 text-xs hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-600"
            onClick={() => setOpen(true)}
        >
            <span class="h-4 w-4 mr-2">
            <ion-icon name="pencil-sharp"></ion-icon>
            </span>
            Modifier
        </button>
        </div>
    );
}
