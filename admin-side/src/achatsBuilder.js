import React, { useState } from "react";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

function Achats() {
  /////TODO
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
                <th class="font-bold text-left pl-4">Nom</th>
                <th class="font-bold text-left pl-12">Prénom</th>
                <th class="font-bold text-left pl-12">Numéro d'achat</th>
                <th class="font-bold text-left pl-20">Formation</th>
                <th class="font-bold text-left pl-20">Prix</th>
                <th class="font-bold text-left pl-20">Date</th>
              </tr>
            </thead>
            <tbody class="w-full">
              <tr
                tabindex="0"
                class="focus:outline-none h-20 text-sm leading-none text-gray-800 dark:text-white  bg-white dark:bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900  border-b border-t border-gray-100 dark:border-gray-700 "
              >
                <td class="pl-4 cursor-pointer">
                  <div class="flex items-center">
                    <div>
                      <p class="font-medium">delpino@email.com</p>
                    </div>
                  </div>
                </td>
                <td class="pl-4 cursor-pointer">
                  <div class="flex items-center">
                    <div>
                      <p class="font-medium">Delpino</p>
                    </div>
                  </div>
                </td>
                <td class="pl-12">
                  <p class="text-sm font-medium leading-none text-gray-800 dark:text-white ">
                    Emilio
                  </p>
                </td>
                <td class="pl-12">
                  <p class="font-medium">#12468</p>
                </td>
                <td class="pl-20">
                  <p class="font-medium">Formation coiffures homme</p>
                </td>
                <td class="pl-20">
                  <p class="font-medium">560 €</p>
                </td>
                <td class="pl-20">
                  <p class="font-medium">10/10/2020</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Achats;
