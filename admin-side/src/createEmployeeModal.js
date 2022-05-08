import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

export default function CreateEmployeeModal({ setCharged, usersList }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const cancelButtonRef = useRef(null);

  function setupConfig(method, url, headers, data) {
    return {
      method: method,
      url: url,
      headers: headers,
      data: data,
    };
  }

  function createEmployeeCall() {
    const emailF = document.getElementById("emailField").value;
    const roleF = document.getElementById("roleField").value;
    console.log("WOW", usersList);
    var found = 0;
    for (var i = 0; i < usersList.length; i++) {
      console.log("SHOWME", usersList[i].email, "NOW", emailF);
      if (usersList[i].email == emailF) {
        found = 1;
        console.log("SWAG");
        const availabilityF = {
          Monday: "null",
          Tuesday: "null",
          Wednesday: "null",
          Thursday: "8-10",
          Friday: "null",
          Saturday: "null",
          Sunday: "null",
        };
        const nameF = usersList[i].firstName + " " + usersList[i].lastName;
        if (nameF.length == 0 || emailF.length == 0 || roleF == "true") {
          setShow(true);
        } else {
          setShow(false);
          var dataP = JSON.stringify({
            data: {
              name: nameF,
              availability: availabilityF,
              role: roleF,
              user: usersList[i],
            },
          });

          console.log("DATA P", dataP);
          var config = setupConfig(
            "post",
            HOST + "employees/",
            { "Content-Type": "application/json" },
            dataP
          );

          axios(config)
            .then(function (response) {
              var employee = JSON.stringify(response.data);
              console.log("L'employé a été ajouté:\n" + employee);
              setOpen(false);
              setCharged(false);
            })
            .catch(() => {
              console.log(
                "Il y a eu un problème en essayant d'ajouter l'employé"
              );
            });
        }
      }
      if (found == 0) {
        setShow2(true);
      }
    }
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
                        Ajouter un employé
                      </Dialog.Title>

                      <form className="mt-6">
                        <div className="flex items-center space-x-5">
                          <input
                            id="emailField"
                            placeholder="Email"
                            className="w-max focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                          />
                        </div>
                        <div className="w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3 mt-3">
                          <select
                            id="roleField"
                            className="text-sm text-gray-500 w-full focus:outline-none"
                          >
                            <option selected disabled value>
                              Role
                            </option>
                            <option value="Administrateur">
                              Administrateur
                            </option>
                            <option value="Employe">Employé</option>
                          </select>
                        </div>
                        {(show || show2) && (
                          <p className="text-sm text-red-600 mt-4">
                            Cette adresse email ne correspond pas à un
                            utilisateur OU certains champs sont vides.
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      createEmployeeCall();
                    }}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setShow(false);
                      setShow2(false);
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
        onClick={() => {
          setOpen(true);
        }}
      >
        Ajouter un employé
      </button>
    </div>
  );
}
