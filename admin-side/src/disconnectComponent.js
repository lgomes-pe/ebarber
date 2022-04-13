import React, { useState } from "react";

export default function DisconnectComponent() {
  function ClearUserInfo() {
    localStorage.setItem("userRole", "");
    localStorage.setItem("firstName", "");
    localStorage.setItem("lastName", "");
  }

  const [state, setState] = useState(false);
  if (state == 1) {
    ClearUserInfo();
  }
  return (
    <li class="my-px">
      <a
        href="/"
        onClick={() => setState(true)}
        class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:bg-opacity-25 hover:text-white"
      >
        <span class="flex items-center justify-center text-lg text-red-500">
          <ion-icon name="log-out-outline"></ion-icon>
        </span>
        <span class="ml-3">Déconnexion</span>
      </a>
    </li>
  );
}
