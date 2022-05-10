import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { SERVER, HOST } from "./constantes";
var axios = require("axios");



export default function CreateFormModal({ setCharged, videoId, videosTitle }) {
  const [draging, setDraging] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [lenVid, setlenVid] = useState(0);
  //const [videosTitle, setVideosTitle] = useState([]);
  //var acc = "";
  //acc = acc + parsedVideo.data.title + ", \n";
  const [inputFileValue, setInputFileValue] = useState(null);
  //const [videoId, setVideoId] = useState(null);

  //console.log("MES VIDEOS", videosTitle);

  const cancelButtonRef = useRef(null);

  const divDropAreaClassCSS = "flex flex-col items-center justify-center w-full mb-8 border border-dashed border-indigo-700 rounded-lg py-8";

  function setupConfig(method, url, headers, data) {
    return {
      method: method,
      url: url,
      headers: headers,
      data: data,
    };
  }

  function handleInputFileValue(e){
    setInputFileValue([e.target.files[0]]);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    //e.stopPropagation()
    if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
      if(e.dataTransfer.files[0].name.endsWith(".mp4")){
        setInputFileValue([e.dataTransfer.files[0]]);
      }   
    }
  };

  const handleDragingLeavingFile = (e) => {
    e.preventDefault();
    //e.target.style.background="white";
    let dropArea = document.getElementById("dropArea");
    //console.log("dropArea", dropArea);
    dropArea.setAttribute("class", "bg-white " + divDropAreaClassCSS);
  }

  const handleDragingOverFile = (e) => {
    e.preventDefault();
    let dropArea = document.getElementById("dropArea");
    //console.log("dropArea", dropArea);
    dropArea.setAttribute("class", "bg-indigo-100 " + divDropAreaClassCSS);
  }

  const handleDragOver = (e) => {
    //console.log("over file", e.dataTransfer.files)
    e.preventDefault();
    setDraging(true);
    //console.log("drag over");
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDraging(true);
    //console.log("drag enter");
  };

  const handleDragLeave = (e) =>{
    e.preventDefault();
    setDraging(false);
    //console.log("drag leave");
  };

  function displayListOfVideos(){
    let acc = "";
    console.log("ici", lenVid);
    videosTitle.forEach(function(elm){
      //console.log("dans la boucle pour acc", elm);
      acc = acc + elm + "\n";
    })
    return acc;
  }

  useEffect(() =>{
    //console.log("useeffect", inputFileValue);
    if(inputFileValue != null){
      /* champs requis pour les videos */
      const titleV = inputFileValue[0].name;
      const dataV = new FormData();
      dataV.append("files", inputFileValue[0]);
      
      //console.log("modif de inputfile", dataV);


      let config = setupConfig('post', HOST + 'upload', { 'Content-Type': 'multipart/form-data' }, dataV);

      axios(config)
      .then(function (response) {
        const fileId = response.data[0].id;
        console.log("La video a été upload:\n" + fileId);

        var data = JSON.stringify({
          "data": {
            "title": titleV,
            "file": fileId
          }
        });

        let config2 = setupConfig('post', HOST + 'videos/', { 'Content-Type': 'application/json' }, data);

        axios(config2)
        .then(function (response) {
          var video = JSON.stringify(response.data);
          var parsedVideo = JSON.parse(video);
          console.log("La video a été ajouté :\n" + parsedVideo.data.id);

          if(videoId.length > 0){
            //console.log("ici1")
            videoId.push(parsedVideo.data.id);
            //console.log("videoId non null", videoId);
          } else {
            //console.log("ici2")
            videoId.push(parsedVideo.data.id);
            //console.log("videoId ", videoId);
          }

          if(videosTitle.includes(parsedVideo.data.attributes.title) == false){
            videosTitle.push(parsedVideo.data.attributes.title)
          }
          alert(`${inputFileValue[0].name} uploaded`);
          let count = lenVid;
          setlenVid(count + 1);
        })
        .catch(function (error) {
          //console.log("Il y a eu un probleme en essayant d'ajouter la video (peut-être deja défini ?)")
        });
      
    })
    .catch(function (error) {
      //console.log("Il y a eu un probleme en essayant d'upload la video (peut-être deja défini ?)\n", error);
    });
    }
      
  }, [inputFileValue])
  
  function CreateFormCall() {
    const titreF = document.getElementById("titleField").value;
    const descriptionF = document.getElementById("descField").value;
    const prixF = document.getElementById("priceField").value;
    let prereqF = "Il n'y a aucun prerequis pour cette formation.";

    if (document.getElementById("prereqField").value !== ""){
      prereqF = document.getElementById("prereqField").value;
    }

    //console.log("Formation", titreF, descriptionF, prixF, prereqF);

    if (
      titreF.length == 0 ||
      inputFileValue == null ||
      prixF.length == 0
    ) {
      setShow(true);
    } else {
      setShow(false);
      //console.log("videoId", videoId);
      var dataF = JSON.stringify({
        "data": {
          "title": titreF,
          "description": descriptionF,
          "prerequisite": prereqF,// prerequisiteF,
          "price": prixF,
          "videos": videoId
        }
      });

      //console.log("DATA F", dataF);
      var config = setupConfig('post', HOST + 'formations/', { 'Content-Type': 'application/json' }, dataF);
      
      axios(config).then(function (response) {
          var formation = JSON.stringify(response.data); // formation ajoutée
          //console.log("La formation a été ajouté:\n" + formation);
          setOpen(false);
          setCharged(false);
      }).catch(() => {
          //console.log("Il y a eu un probleme en essayant d'ajouter la formation (peut-être deja défini ?)");
      });
    }
  }


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
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl w-full">
                <div className="flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Ajouter une formation
                      </Dialog.Title>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="flex grow-0 w-full space-x-6">
                        <form className="w-full mt-6">
                          <div className="flex items-center space-x-5">
                            <input
                              id="titleField"
                              placeholder="Titre"
                              className="w-full focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                            />
                          </div>
                          <div className="mt-4">
                            <textarea
                              id="descField"
                              placeholder="Description"
                              className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                              defaultValue={""}
                            />
                          </div>
                          <div className="flex w-max items-center space-x-2 mt-3">
                            <input
                              id="priceField"
                              placeholder="Prix"
                              type="number"
                              min={0}
                              className="w-3/6 focus:outline-none placeholder-gray-500 py-3 px-2 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                            />
                            <p className="font-semibold mr-3">€</p>
                          </div>
                          <div className="flex items-center space-x-2 mt-3">
                            <textarea
                              id="prereqField"
                              placeholder="Prerequis"
                              className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                              defaultValue={""}
                            />
                          </div>
                          {show && (
                            <p className="text-sm text-red-600 mt-4">
                              Un ou plusieurs champs requis sont vides.
                            </p>
                          )}
                        </form>
                        <div className="relative mt-6 bg-white w-full" 
                          onChange={handleInputFileValue}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                        >
                          <div id="dropArea" onDrop={handleDragingLeavingFile} onDragOver={handleDragingOverFile} onDragLeave={handleDragingLeavingFile} class={divDropAreaClassCSS}>
                            <div className="cursor-pointer mb-5 text-indigo-700 dark:text-indigo-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-cloud-upload"
                                width={60}
                                height={60}
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                <polyline points="9 15 12 12 15 15" />
                                <line x1={12} y1={12} x2={12} y2={21} />
                              </svg>
                            </div>
                            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center">
                              Drag and drop here
                            </p>
                            <p className="text-base font-normal tracking-normal text-gray-800 dark:text-gray-100 text-center my-1">
                              or
                            </p>
                            <label
                              htmlFor="fileUp"
                              className="cursor-pointer text-base font-normal tracking-normal text-indigo-700 dark:text-indigo-600 text-center"
                            >
                              {" "}
                              browse{" "}
                            </label>
                            <input
                              accept=".mp4"
                              onChange={handleInputFileValue}
                              type="file"
                              className="hidden"
                              name="fileUpload"
                              id="fileUp"
                            />
                          </div>
                            <p class="text-center" > {lenVid == 0 ? 'no files uploaded yet' : "File(s) name(s):"}</p>

                            {(lenVid > 0 &&
                              videosTitle.map((vid) => {
                                return(<p class="text-center" > {vid} </p>)
                              })
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => CreateFormCall()}
                  >
                    Ajouter
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setShow(false);
                      setOpen(false);
                    }}
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
      <button
        class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:bg-indigo-500 hover:bg-indigo-500 ml-2 sm:ml-3 font-normal focus:outline-none bg-indigo-600 dark:hover:bg-indigo-700 transition duration-150 ease-in-out  dark:bg-indigo-600 rounded text-white px-6 py-2 text-sm"
        onClick={() => setOpen(true)}
      >
        Ajouter une formation
      </button>
    </div>
  );
}
