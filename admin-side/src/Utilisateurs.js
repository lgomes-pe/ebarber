import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserInfoHeader from "./userInfoHeader";
import DisconnectComponent from "./disconnectComponent";

function Utilisateurs() {
  return (
    <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
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
                class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
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
                class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
              >
                <span class="flex items-center justify-center text-lg text-yellow-600">
                  <ion-icon name="people-circle-outline"></ion-icon>
                </span>
                <span class="ml-3">Utilisateurs</span>
              </a>
            </li>

            <DisconnectComponent />
          </ul>
        </div>
      </aside>
      <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <header class="header bg-white shadow py-4 px-4">
          <UserInfoHeader />
        </header>
        <div class="main-content flex flex-col flex-grow p-4">
          <h1 class="font-bold text-2xl text-gray-700">Utilisateurs</h1>

          <div class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4"></div>
        </div>
        <footer class="footer px-4 py-6"></footer>
      </main>
    </div>
  );
}

export default Utilisateurs;
