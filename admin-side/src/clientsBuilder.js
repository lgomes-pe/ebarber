import React, { useState } from "react";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

const clients_list = [];

function Clients() {
  /////TODO
  const [charged, setCharged] = useState(false);
  if (charged != true) {
    axios
      .get(HOST + "clients?populate=*", {
        // Recuperer la liste des clients
        headers: {},
        data: "",
      })
      .then((response) => {
        const clients = JSON.stringify(response.data);
        console.log("Demande de la liste des clients bien reçue!");
        console.log(clients);
        const parsedClients = JSON.parse(clients).data;
        for (let i = 0; i < parsedClients.length; i++) {
          clients_list.push(parsedClients[i]); //ajoute chaque categorie 1 par 1
        }
        console.log("LISTE", clients_list);
        setCharged(true);

        console.log(parsedClients[0]);
        console.log(parsedClients[0].attributes.user.data.attributes.email); //Client-user-email
        console.log(
          parsedClients[0].attributes.user.data.attributes.firstName +
            " " +
            parsedClients[0].attributes.user.data.attributes.lastName
        ); //Client-user-prenom/nom
        console.log(
          parsedClients[0].attributes.reservations.data[0].attributes.date
        ); //Client-reservations-date

        // Ce qui suit ne marche pas
        console.log(
          parsedClients[0].attributes.reservations.data[0].attributes
            .prestations.data[0]
        ); //Client-reservations-prestation-title ??
        console.log(
          parsedClients[0].attributes.reservations.data[0].attributes
            .prestations.data[0].attributes.employees
        ); //Client-reservations-employee??
      })
      .catch(() => {
        console.log("Demande de la liste des clients non reçue...");
      });
  }
  if (charged != true) {
    return <p></p>;
  } else {
    /*if(charged != true){
        return(<p></p>);
    }else{*/
    return (
      <div class="container flex overflow-x-auto overflow-y-auto bg-gray-100 items-start hide-scroll-bar mx-auto h-full">
        <div class="w-full">
          <div class="bg-white dark:bg-gray-800  shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto rounded-lg border border-gray-200">
            <table class="w-full whitespace-nowrap">
              <thead>
                <tr
                  tabindex="0"
                  class="focus:outline-none h-16 w-full text-sm leading-none text-gray-800 dark:text-white "
                >
                  <th class="font-bold text-left pl-4">Email</th>
                  <th class="font-bold text-left pl-12">Nom</th>
                  <th class="font-bold text-left pl-12">Prénom</th>
                  <th class="font-bold text-left pl-20">Réservation</th>
                </tr>
              </thead>
              <tbody class="w-full">
                {console.log("Liste des clients ", clients_list)}
                {clients_list.map((item) => (
                  <tr
                    tabindex="0"
                    class="focus:outline-none h-20 text-sm leading-none text-gray-800 dark:text-white  bg-white dark:bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900  border-b border-t border-gray-100 dark:border-gray-700 "
                  >
                    <td class="pl-4 cursor-pointer">
                      <div class="flex items-center">
                        <div class="w-max text-2xl text-indigo-600">
                          <ion-icon name="person-sharp"></ion-icon>
                        </div>
                        <div class="pl-4">
                          <p class="font-medium">
                            {item.attributes.user.data.attributes.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="pl-12">
                      <p class="text-sm font-medium leading-none text-gray-800 dark:text-white ">
                        {item.attributes.user.data.attributes.lastName}
                      </p>
                    </td>
                    <td class="pl-12">
                      <p class="font-medium">
                        {item.attributes.user.data.attributes.firstName}
                      </p>
                    </td>
                    <td class="pl-20">
                      <p class="font-medium">
                        <ion-icon name="cut-sharp"></ion-icon> Crête de
                        crackhead
                      </p>
                      <p class="text-xs leading-3 text-gray-600 dark:text-gray-200  mt-2">
                        <ion-icon name="calendar-outline"></ion-icon> Date
                      </p>
                      <p class="text-xs leading-3 text-gray-600 dark:text-gray-200  mt-2">
                        <ion-icon name="man-outline"></ion-icon> Employé
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Clients;
