import React, { useState } from "react";
import CreateFormModal from "./createFormModal";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

const formations_list = [];
export default function FormationsBuilder() {
  const [charged, setCharged] = useState(false);

  if (charged != true) {
    formations_list.length = 0;
    axios
      .get(HOST + "formations?populate=*", {
        // Recuperer la liste des formations
        headers: {},
        data: "",
      })
      .then((response) => {
        const formations = JSON.stringify(response.data);
        console.log("Demande de la liste des formations bien reçue!");
        const parsedFormations = JSON.parse(formations).data;
        for (let i = 0; i < parsedFormations.length; i++) {
          formations_list.push(parsedFormations[i]);
        }
        setCharged(true);
        console.log("FORMALIST", formations_list);
      })
      .catch(() => {
        console.log("Demande de la liste des formations non reçue...");
      });
  }

  if (charged != true) {
    return <p></p>;
  } else {
    return (
      <div class="main-content bg-gray-100 flex flex-col flex-grow p-4">
        <div class="flex items-center justify-between mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">
          <h1 class="font-bold text-2xl text-gray-700">Formations</h1>
          <div class="flex">
            <CreateFormModal setCharged={setCharged} />
          </div>
        </div>
        <div class="flex flex-col flex-grow bg-white rounded mt-4">
          <div class="container flex overflow-x-auto overflow-y-auto bg-gray-100 items-start hide-scroll-bar mx-auto h-full">
            {formations_list.map((item) => (
              <div class="bg-gray-100 flex-none w-full pr-6">
                <div class="border overflow-y-auto shadow-inner-[0_0px_0px_-24px_rgba(243, 244, 246, 0.3)] bg-clip-content bg-white rounded-lg h-full border border-gray-200 dark:border-gray-700 ">
                  <div class="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
                    <p
                      tabindex="0"
                      class="focus:outline-none text-xl lg:text-xl font-bold leading-tight text-gray-800 dark:text-white "
                    >
                      {item.attributes.title}
                    </p>
                    <p>DeleteCatModal button</p>
                  </div>
                  <div class="px-6 pt-6 overflow-x-auto overflow-y-auto">
                    <table class="w-full whitespace nowrap ">
                      <tbody>
                        <tr>
                          <p class="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200 ">
                            {item.attributes.description}
                          </p>
                        </tr>
                        {item.attributes.videos.data.map((video) => (
                          <tr>
                            <p>{video.attributes.title}</p>
                            {video.attributes.file}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
