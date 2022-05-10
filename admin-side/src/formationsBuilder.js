import React, { useState } from "react";
import CreateFormModal from "./createFormModal";
import DeleteFormModal from "./deleteFormModal";
import EditFormModal from "./editFormModal";
import { SERVER, HOST } from "./constantes";
var axios = require("axios");

const formations_list = [];

export default function FormationsBuilder() {
  const [charged, setCharged] = useState(false);

  if (charged != true) {
    formations_list.length = 0;
    axios
      .get(HOST + "formations?populate[videos][populate]=*", {
        // Recuperer la liste des formations
        headers: {},
        data: "",
      })
      .then((response) => {
        const formations = JSON.stringify(response.data);
        //console.log("Demande de la liste des formations bien reçue!");
        const parsedFormations = JSON.parse(formations).data;
        for (let i = 0; i < parsedFormations.length; i++) {
          formations_list.push(parsedFormations[i]);
        }
        setCharged(true);
        //console.log("FORMALIST", formations_list);
      })
      .catch(() => {
        //console.log("Demande de la liste des formations non reçue...");
      });
  }

  if (charged != true) {
    return <p></p>;
  } else {
    return (
      <div class="h-full overflow-y-hidden flex-col px-4 pt-4 pb-16">
        <div class="flex items-center justify-between pb-4 ">
          <h1 class="font-bold text-2xl text-gray-700 ">Formations</h1>
          <div class="">
            <CreateFormModal
              charged={charged}
              setCharged={setCharged}
              videoId={[]}
              videosTitle={[]}
            />
          </div>
        </div>
        <div class="flex flex-col h-full space-y-4 overflow-y-auto">
          {formations_list.map((item, id) => (
            <div class="bg-gray-100 w-full">
              <div class="border overflow-y-auto shadow-inner-[0_0px_0px_-24px_rgba(243, 244, 246, 0.3)] bg-clip-content bg-white rounded-lg h-full border border-gray-200 dark:border-gray-700 ">
                <div class="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
                  <div class="w-3/4 h-full pr-2 overflow-x-auto">
                    <p
                      tabindex="0"
                      class="focus:outline-none text-xl lg:text-xl font-bold leading-tight text-gray-800 dark:text-white "
                    >
                      {item.attributes.title}
                    </p>
                  </div>
                  <div class="flex mx-4 ml-auto">
                    <EditFormModal
                      formId={item.id}
                      title={item.attributes.title}
                      description={item.attributes.description}
                      prerequisite={item.attributes.prerequisite}
                      price={item.attributes.price}
                      videoId={item.attributes.videos.data[0].id}
                      uploadedVidId={
                        item.attributes.videos.data[0].attributes.file.data.id
                      }
                      isCharged={charged}
                      setCharged={setCharged}
                    />
                  </div>
                  <DeleteFormModal
                    vidId={item.attributes.videos.data[0].id}
                    uploadedVidId={
                      item.attributes.videos.data[0].attributes.file.data.id
                    }
                    formId={item.id}
                    isCharged={charged}
                    setCharged={setCharged}
                  />
                </div>
                <div class="px-6 pt-6 pb-6 h-max">
                  <table class="w-5/6 whitespace nowrap table-fixed">
                    <tbody>
                      <tr class="h-full w-20">
                        <td class="h-full">
                          <div class="h-full break-words">
                            <div class="w-3/4 h-full pr-2 overflow-y-auto">
                              <p class="h-10 text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200">
                                {item.attributes.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td rowspan="2" class="align-center h-full">
                          <div class="text-center pt-5 h-20 overflow-scroll">
                            {item.attributes.prerequisite}
                          </div>
                        </td>
                      </tr>
                      {item.attributes.videos.data.map((video) => (
                        <tr>
                          <p>
                            <a
                              href={
                                SERVER +
                                video.attributes.file.data.attributes.url.replace(
                                  /^./,
                                  ""
                                )
                              }
                              class="hover:font-bold  hover:text-indigo-600"
                            >
                              {" "}
                              {video.attributes.title.substring(
                                0,
                                video.attributes.title.length - 4
                              )}
                            </a>
                          </p>
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
    );
  }
}
