import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserInfoHeader from "./userInfoHeader";
import DisconnectComponent from "./disconnectComponent";
import { UserCircleIcon } from "@heroicons/react/solid";
import './Informations.css';

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

var userAvailability;
const reservations_list = [];

/* === Fonctions === */

function setupConfig(method, url, headers, data){
  return {
      method: method,
      url: url,
      headers: headers,
      data : data
  };
}

function Informations() {
  const role = localStorage.getItem("userRole");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const mail = localStorage.getItem("userEmail");
  const workerId =  localStorage.getItem("workerId");

  const adminRole = "Administrateur";

  const [dataReceived, setDataReceived] = useState(false);
  const [toggleDay, setToggleDay] = useState({
    Monday : false,
    Tuesday : false,
    Wednesday : false,
    Thursday : false,
    Friday : false,
    Saturday : false,
    Sunday : false
  });

  console.log("days onr efresh state", toggleDay);

  function toggleInput(key){
    let val = toggleDay[key];
    console.log("key", key,"current val", val, "new val", !val);
    setToggleDay({...toggleDay, [key]:!val});
    //alert("triggered");
  }

  useEffect(() =>{ // Dès qu'une modif se fait sur toggleDay, on met a jour les infos
    if(dataReceived){
      setDataReceived(false);
    }
  }, [toggleDay])

  function submitNewAvailability(key, bornInf, bornSup){
    console.log("" === bornInf);
    if((bornInf === "" && bornSup !== "") || (bornSup === "" && bornInf !== "")){
      alert(`Vous devez renseigner les deux champs de la ligne ${key} pour n'effectuer aucun changement.`);
    } else {
      if(bornSup !== "" && bornInf !== ""){
        /* PROCEDURE */
        //console.log("useravail", userAvailability);
        userAvailability[key] = `${bornInf}-${bornSup}`;
        //console.log("useravail", userAvailability);
      } else { // Dans ce cas les deux sont vide
        //console.log("useravail", userAvailability);
        userAvailability[key] = `null`;
        //console.log("useravail", userAvailability);
      }
      var dataE = JSON.stringify({
        "data": {
          "availability": userAvailability
        }
      });
      
      var config = setupConfig('put', HOST + 'employees/' + workerId, { 'Content-Type': 'application/json' }, dataE);
      
      axios(config).then(function (response) {
          var employee = JSON.stringify(response.data); // employee modifiée
          console.log("L'employee a été modifié:\n" + employee);
          let val = toggleDay[key];
          setToggleDay({...toggleDay, [key]:!val});
      }).catch(() => {
          console.log("Il y a eu un probleme en essayant de modifier l'employee " + workerId);
      });
    }
  }

  console.log("a ce refresh datareceived:", dataReceived);
  if(dataReceived == false){
    axios.get(HOST + 'employees/' + workerId + '?populate[reservations][populate][client][populate]=*', { // Recuperer la liste des employees 
      headers: {},
      data : ''
    }).then((response) => {

        const employee = JSON.stringify(response.data);
        console.log("Demande des infos pour l'employé", workerId, "bien reçue.");
        const parsedEmployee = JSON.parse(employee);
        reservations_list.length = 0;
        for (let i = 0; i < parsedEmployee.data.attributes.reservations.data.length; i++) {
          reservations_list.push(parsedEmployee.data.attributes.reservations.data[i]);
        }
        console.log(parsedEmployee.data.attributes.availability);
        console.log(parsedEmployee);
        console.log(reservations_list);
        userAvailability = parsedEmployee.data.attributes.availability;
        setDataReceived(true);
    }).catch(() => {
        console.log("Demande des infos pour l'employé", workerId, "non reçue...");
    });
  }

  console.log("VOici le worker Id", workerId);

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
        <div class="w-64 sidebar-content px-4 py-6">
          <ul class="flex flex-col w-full">
            {role===adminRole &&(
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
            </li>)}
            {role===adminRole &&(
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
            </li>)}

            <li class="my-px">
              <a
                href="/Informations"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
              >
                <span class="flex items-center justify-center text-lg text-yellow-600">
                  <ion-icon name="person"></ion-icon>
                </span>
                <span class="ml-3">Infos</span>
              </a>
            </li>
            {role===adminRole &&(
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
            </li>)}
            {role===adminRole &&(
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
            </li>)}
            {role===adminRole &&(
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
            </li>)}

            <DisconnectComponent />
          </ul>
        </div>
      </aside>
      <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <header class="header bg-white shadow py-4 px-4">
          <UserInfoHeader />
        </header>
        <div class="main-content flex flex-col flex-grow p-4">
          <h1 class="font-bold text-2xl text-gray-700">Informations</h1>

          <div>
          <div class="py-12 h-screen bg-gray-100">
              <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
                  <div class="md:flex">
                      <div class="w-full p-2 py-10">
                          <div class="flex justify-center">
                              <div class="relative"> <UserCircleIcon  className="w-20 h-20 text-indigo-600" aria-hidden="true" /> </div>
                          </div>
                          <div class="flex flex-col text-center mt-3 mb-4"> <span class="text-2xl font-medium">{firstName + " " + lastName }</span> <span class="text-md text-gray-400">{role}</span> </div>
                          <p class="px-16 text-center text-md text-gray-800 hover:text-indigo-800"><span class="bg-gray-100 h-5 p-1 px-3 rounded  hover:shadow">{mail}</span></p>
                          {(dataReceived == false && (<p class="bg-gray-100 rounded cursor-pointer hover:shadow mt-4 text-center text-md text-gray-800">En attente d'information...</p>))}
                          {(dataReceived && 
                            <div id="table_hour" class="m-1 px-3 overflow-auto rounded hover:shadow mt-4 text-center text-md text-gray-800">
                              {
                                (Object.keys(userAvailability)).map(key => {
                                  let arrHour = userAvailability[key].split('-');
                                  if(arrHour[0]=="null"){
                                    arrHour = ["null", "null"];
                                  }
                                  if(toggleDay[key] == false){
                                    return (<div id="degre1" class="-mx-3 px-2"><div class="flex flex-row justify-between"><span class="">{key}</span> <span class="cursor-pointer hover:bg-gray-500 hover:p-1 hover:px-3 rounded  hover:shadow"> <button onClick={() => {toggleInput(key)}}> {userAvailability[key]} </button> </span></div></div>)
                                  } else {
                                    return (<div id="degre1" class="-mx-3 px-2"><form action="#" onSubmit={() => {submitNewAvailability(key, document.getElementById(key+"a").value, document.getElementById(key+"b").value);}}> <div class="flex flex-row justify-between px-1 py-1"><span class="">{key}</span> <span class="cursor-pointer"> <input id={key+"a"} class="border-2 invalid:border-red-500" type="number" min="8" max="20" placeholder={arrHour[0]} onChange={() => {document.getElementById(key+"b").min = Math.max(document.getElementById(key+"a").value,8)+1 }}/> - <input id={key+"b"} class="border-2 invalid:border-red-500" type="number" min="8" max="20" placeholder={arrHour[1]} onChange={() => { document.getElementById(key+"a").max = Math.max(document.getElementById(key+"b").value,8) }}/> <button class="ml-2 hover:shadow hover:bg-indigo-500 p-1 rounded text-white bg-indigo-600" > submit </button> </span></div> </form></div>)
                                  }
                                })
                              }
                            </div>
                          )}
                      </div>
                  </div>
                  <div class="flex flex-col text-center mt-3 mb-4 space-y-4"> <span class="text-2xl font-medium">MES RENDEZ-VOUS</span> 
                        {reservations_list.map((item, id) =>{
                              if(new Date(item.attributes.date).getTime() >= Date.now() && dataReceived)
                                return(<p class="px-1 mx-4 hover:shadow bg-gray-100 p-1 rounded text-center" id="display_RDV"> RDV avec <b>{item.attributes.client.data.attributes.user.data.attributes.lastName} {item.attributes.client.data.attributes.user.data.attributes.firstName} </b> le  <b>{new Date(item.attributes.date).toDateString()}</b> à <b>{new Date(item.attributes.date).getHours()}h{new Date(item.attributes.date).getMinutes()}</b></p>)
                        })}
                  </div>
                  
              </div>
          </div>
          </div>
          
        </div>
        <footer class="footer px-4 py-6"></footer>
      </main>
    </div>
  );
}

export default Informations;
//onChange={document.getElementById(key+"b").min=Math.max(document.getElementById(key+"a").value,8)}