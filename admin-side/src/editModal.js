/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/solid";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

export default function EditModal({
  prestId,
  currentCat,
  titre,
  prix,
  durée,
  catégories,
  description,
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

  function EditCall({
    prestIdP,
    titreP,
    categorieP,
    descriptionP,
    duréeP,
    prixP,
  }) {
    console.log("PREST ID EDITCALL", prestIdP);
    const titreF = document.getElementById("titleField").value;
    if (titreF.length > 0) {
      titreP = titreF;
    }

    console.log(
      "value de option",
      document.getElementById("categoryField").value
    );

    const categorieF = document.getElementById("categoryField").value;
    if (categorieF != "true") {
      categorieP = categorieF;
    }
    console.log("CATEGORIE P", categorieP);
    const descriptionF = document.getElementById("descField").value;
    if (descriptionF.length > 0) {
      descriptionP = descriptionF;
    }
    const duréeF = document.getElementById("durationField").value;
    if (duréeF.length > 0) {
      duréeP = duréeF;
    }
    const prixF = document.getElementById("priceField").value;
    if (prixF.length > 0) {
      prixP = prixF;
    }

    var dataP = JSON.stringify({
      data: {
        title: titreP,
        price: prixP,
        duration: duréeP,
        description: descriptionP,
        category: categorieP,
      },
    });

    console.log("DATA P", dataP);

    var config = setupConfig(
      "put",
      HOST + "prestations/" + prestId,
      { "Content-Type": "application/json" },
      dataP
    );

    axios(config)
      .then(function (response) {
        var prestation = JSON.stringify(response.data); // prestation modifiée
        console.log("La prestation a été modifié:\n" + prestation);
        setOpen(false);
        setCharged(false);
      })
      .catch(() => {
        console.log(
          "Il y a eu un probleme en essayant de modifier la prestation " +
            prestId
        );
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
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                        Modifier la prestation
                      </Dialog.Title>

                      <form className="mt-6">
                        <div className="flex items-center space-x-5">
                          <input
                            id="titleField"
                            placeholder={titre}
                            className="w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                          />
                          <div className="w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3">
                            <select
                              id="categoryField"
                              className="text-sm text-gray-500 w-full focus:outline-none"
                            >
                              <option selected disabled value>
                                Catégorie
                              </option>
                              {console.log("LOG OK", catégories)}
                              {catégories.map((item) => (
                                <option value={item.id}>{item.nom}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="mt-4">
                          <textarea
                            id="descField"
                            placeholder={description}
                            className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                            defaultValue={""}
                          />
                        </div>
                        <div className="flex items-center space-x-5 mt-4">
                          <input
                            id="durationField"
                            placeholder={durée}
                            type="email"
                            className="w-1/12 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                          />
                          <p className="font-semibold">h</p>
                          <input
                            id="priceField"
                            placeholder={prix}
                            type="number"
                            min={0}
                            className="w-1/6 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                          />
                          <p className="font-semibold">€</p>
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
                      EditCall(
                        prestId,
                        titre,
                        currentCat,
                        description,
                        durée,
                        prix
                      );
                      setOpen(false);
                      setCharged(false);
                    }}
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
