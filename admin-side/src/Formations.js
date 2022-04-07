import React from "react";
function Formations() {
    return (
<div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
    <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-600">
      <div class="sidebar-header flex items-center justify-center py-4">
        <img
        className="mx-auto h-14 w-auto"
        src="./logo-top-bar-white.png"
        alt=""/>
      </div>
      <div class="sidebar-content px-4 py-6">
        <ul class="flex flex-col w-full">

          <li class="my-px">
            <a
              href="/Admin"
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
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
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="flex items-center justify-center text-lg text-yellow-600">
                <ion-icon name="person"></ion-icon>
              </span>
              <span class="ml-3">Infos</span>
            </a>
          </li>

          <li class="my-px">
            <a
              href="/"
              class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
                <span class="truncate w-20 font-semibold tracking-wide leading-none">John Doe</span>
                <span class="truncate w-20 text-gray-500 text-xs leading-none mt-1">Manager</span>
              </span>
            </a>
          </div>
        </div>
      </header>
      <div class="main-content flex flex-col flex-grow p-4">
        <h1 class="font-bold text-2xl text-gray-700">Formations</h1>

        <div
          class="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4"
        ></div>
      </div>
      <footer class="footer px-4 py-6">

      </footer>
    </main>
  </div>
    );
}

export default Formations;