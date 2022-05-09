/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PencilAltIcon } from "@heroicons/react/solid";
import { SERVER, HOST } from "./constantes";
var axios = require("axios");

const reservations_list_client = [];

export default function EditFormModal({
  clientId,
  isCharged,
  setCharged,
}) {

    const [open, setOpen] = useState(false);
    const [retrievedR, setRetrievedR] = useState(false);

    //console.log("client id", clientId);

    useEffect(() =>{ // Dès qu'une modif se fait sur toggleDay, on met a jour les infos
        if(open == false){
          reservations_list_client.length = 0;
          setRetrievedR(false);
        }
      }, [open])

    if(open == true){
        axios
        .get(HOST + "clients/" + clientId + "?populate[reservations][populate]=*", {
            // Recuperer la liste des clients
            headers: {},
            data: "",
        })
        .then((response) => {
            const client = JSON.stringify(response.data);
            //console.log("Demande du client", clientId, "bien recu!");
            const parsedClient = JSON.parse(client).data;
            //console.log("liste parsed", parsedClient);
            reservations_list_client.length = 0;
            for (let i = 0; i < parsedClient.attributes.reservations.data.length; i++) {
                reservations_list_client.push(parsedClient.attributes.reservations.data[i]); //ajoute chaque categorie 1 par 1
            }
            //console.log("RESERVATION COURANTE", reservations_list_client);
            setRetrievedR(true);
        })
        .catch(() => {
            //console.log("Demande du client non reçue...");
        });
    } else {
        //console.log("le modal n'est pas ouvert");
    }
    
    function deleteReservation(idR){
        //alert(`triggered : ${id}`);
        axios.delete(HOST + 'reservations/' + idR, {
            headers: {},
            data : ''
        }).then(function (response) {
            var reservation = JSON.stringify(response.data); // reservation suppr
            //console.log("reservation\n " + reservation + "\nsuppr!");
            setOpen(false);
        }).catch(() => {
            //console.log("probleme lors de la suppression de la reservation " + idR);
        });
    }

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
                            Liste des RDVs <br/>
                            <i>Cliquez pour supprimer</i>
                        </Dialog.Title>
                        <div class=" overflow-auto flex space-x-6 mt-4" style={{height: 380}}>
                        <div class="flex space-x-6 " style={{minWidth: 480}}>
                        <div class="flex flex-col">
                        {(reservations_list_client.length > 0 && 
                                reservations_list_client.map((item) => {
                                    if(new Date(item.attributes.date).getTime() >= Date.now()){
                                        return (<button 
                                                    onClick={() => deleteReservation(item.id)} 
                                                    class="bg-gray-100 rounded cursor-pointer hover:shadow hover:bg-red-200 mt-2 text-center text-gray-800" 
                                                    style={{height: 80, width: 450}}>
                                                        <div class="">RDV du <b>{new Date(item.attributes.date).toDateString()}</b> à <b>{new Date(item.attributes.date).getHours()}h{new Date(item.attributes.date).getMinutes()}</b> avec <b>{item.attributes.employee.data.attributes.name}</b> pour <b>{item.attributes.prestation.data.attributes.title}</b> </div>
                                                </button>)
                                    }
                                })
                        )}
                        {(reservations_list_client.length == 0 && 
                                <p> Aucune reservation à venir </p>
                        )}
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
        <button class="h-10 ml-2 hover:shadow hover:bg-indigo-500 p-1 rounded text-white bg-indigo-600" onClick={() => setOpen(true)}> RESERVATIONS</button>
        </div>
    );
}
