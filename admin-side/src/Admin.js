import React, { useState } from "react";
import CategoriesBuilder from "./categoriesBuilder";
import CreatePrestModal from "./createPrestModal";
import CreateCatModal from "./createCatModal";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

const categories_list = [];

function Admin() {
  const [charged, setCharged] = useState(false);
  if (charged != true) {
    axios
      .get(HOST + "categories?populate=*", {
        // Recuperer la liste des prestations
        headers: {},
        data: "",
      })
      .then((response) => {
        const categories = JSON.stringify(response.data);
        console.log("Demande de la liste des categories bien reçue!");

        const parsedCategories = JSON.parse(categories).data;
        for (let i = 0; i < parsedCategories.length; i++) {
          categories_list.push(parsedCategories[i]); //ajoute chaque categorie 1 par 1
        }
        setCharged(true);
        console.log(categories_list);
      })
      .catch(() => {
        console.log("Demande de la liste des categories non reçue...");
      });
  }

  if (charged != true) {
    return <p></p>;
  } else {
    return (
      <div class="flex flex-row overflow-y-auto min-h-screen bg-gray-100 text-gray-800">
        <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-600">
          <div class="sidebar-header flex items-center justify-center py-4">
            <img
              className="mx-auto h-14 w-auto"
              src="./logo-top-bar-white.png"
              alt=""
            />
          </div>
          <div class="sidebar-content px-4 py-6">
            <ul class="flex flex-col w-full">
              <li class="my-px">
                <a
                  href="/Admin"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="cut-sharp"></ion-icon>
                  </span>
                  <span class="ml-3">Prestations</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/Formations"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="school"></ion-icon>
                  </span>
                  <span class="ml-3">Formations</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/Informations"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="person"></ion-icon>
                  </span>
                  <span class="ml-3">Infos</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/Achats"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="cart-sharp"></ion-icon>
                  </span>
                  <span class="ml-3">Achats</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/Clients"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="people-sharp"></ion-icon>
                  </span>
                  <span class="ml-3">Clients</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/Employes"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="man-sharp"></ion-icon>
                  </span>
                  <span class="ml-3">Employés</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/Utilisateurs"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-yellow-600">
                    <ion-icon name="people-circle-outline"></ion-icon>
                  </span>
                  <span class="ml-3">Utilisateurs</span>
                </a>
              </li>

              <li class="my-px">
                <a
                  href="/"
                  class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
                >
                  <span class="flex items-center justify-center text-lg text-red-500">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                  <span class="ml-3">Déconnexion</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <header class="header bg-white shadow py-4 px-4">
            <div class="header-content flex items-center flex-row">
              <div class="flex ml-auto">
                <a href class="flex flex-row items-center">
                  <img
                    src="https://pbs.twimg.com/profile_images/378800000298815220/b567757616f720812125bfbac395ff54_normal.png"
                    alt
                    class="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                  <span class="flex flex-col ml-2">
                    <span class="truncate w-20 font-semibold tracking-wide leading-none">
                      John Doe
                    </span>
                    <span class="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      Manager
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </header>

          <CategoriesBuilder />

          <footer class="footer px-4 py-6"></footer>
        </main>
      </div>
    );
  }
}

export default Admin;
