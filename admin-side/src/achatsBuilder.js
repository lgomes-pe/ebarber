import React, { useState } from "react";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";
const achats_list = [];

function Achats() {
  const [charged, setCharged] = useState(false);
  
  if (charged != true) {
    axios.get(HOST + 'achats?populate[client][populate]=*&populate[formation][populate]=*', { // Recuperer la liste des achats
      headers: {},
      data : ''
    }).then((response) => {
        const achats = JSON.stringify(response.data);
        const parsedAchats = JSON.parse(achats).data;
        for (let i = 0; i < parsedAchats.length; i++) {
          achats_list.push(parsedAchats[i]);
        }
        console.log("Demande de la liste des achats bien reçue!");
        console.log(achats_list);
        setCharged(true);
    }).catch(() => {
        console.log("Demande de la liste des achats non reçue...");
    });
  }

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
                <th class="font-bold text-left pl-4">Nom</th>
                <th class="font-bold text-left pl-12">Prénom</th>
                <th class="font-bold text-left pl-12">Numéro d'achat</th>
                <th class="font-bold text-left pl-20">Formation</th>
                <th class="font-bold text-left pl-20">Prix</th>
                <th class="font-bold text-left pl-20">Date</th>
              </tr>
            </thead>
            <tbody class="w-full">
            {achats_list.map((item, id) => (
            <tr
                tabindex="0"
                class="focus:outline-none h-20 text-sm leading-none text-gray-800 dark:text-white  bg-white dark:bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900  border-b border-t border-gray-100 dark:border-gray-700 "
              >
                <td class="pl-4 cursor-pointer">
                  <div class="flex items-center">
                    <div>
                      <p class="font-medium"> {item.attributes.client.data.attributes.user.data.attributes.email} </p>
                    </div>
                  </div>
                </td>
                <td class="pl-4 cursor-pointer">
                  <div class="flex items-center">
                    <div>
                      <p class="font-medium">{item.attributes.client.data.attributes.user.data.attributes.lastName}</p>
                    </div>
                  </div>
                </td>
                <td class="pl-12">
                  <p class="text-sm font-medium leading-none text-gray-800 dark:text-white ">
                  {item.attributes.client.data.attributes.user.data.attributes.firstName}
                  </p>
                </td>
                <td class="pl-12">
                  <p class="font-medium">#{item.id}</p>
                </td>
                <td class="pl-20">
                  <p class="font-medium">{item.attributes.formation.data.attributes.title}</p>
                </td>
                <td class="pl-20">
                  <p class="font-medium">{item.attributes.formation.data.attributes.price}</p>
                </td>
                <td class="pl-20">
                  <p class="font-medium">{item.attributes.date}</p>
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

export default Achats;
