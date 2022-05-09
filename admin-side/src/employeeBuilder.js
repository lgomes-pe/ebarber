import React, { useState, useEffect } from "react";
import CreateEmployeeModal from "./createEmployeeModal";
import { UserCircleIcon } from "@heroicons/react/solid";
import './Informations.css';
import { SERVER, HOST } from "./constantes";
var axios = require("axios");


const employee_list = [];
const users_list = [];
var userAvailability;
const reservations_list = [];

function Employees() {
  const [charged, setCharged] = useState(false);

  if (charged != true) {
    axios
      .get(HOST + "users?populate=*", {
        //recuperer la liste des users
        headers: {},
        data: "",
      })
      .then((response) => {
        const users = JSON.stringify(response.data);
        //console.log("Demande de la liste des users bien reçue !");
        //console.log(users);
        const parsedUsers = JSON.parse(users);
        for (let i = 0; i < parsedUsers.length; i++) {
          users_list.push(parsedUsers[i]);
        }
        //console.log("LISTE", users_list);

        axios
          .get(HOST + "employees?populate[reservations][populate][client][populate]=*&populate[user][populate]=*", {
            headers: {},
            data: "",
          })
          .then((response) => {
            const employees = JSON.stringify(response.data);
            //console.log("Demande de la liste des employés bien reçue!");
            //console.log(employees);
            const parsedEmployees = JSON.parse(employees).data;
            employee_list.length= 0;
            for (let i = 0; i < parsedEmployees.length; i++) {
              employee_list.push(parsedEmployees[i]);
            }
            ////console.log("LIST", employee_list);
            setCharged(true);
          })
          .catch(() => {
            //console.log("Demande de la liste des employés non reçue...");
          });
      })
      .catch(() => {
        //console.log("Demande de la liste des users non reçue...");
      });
  }
  if (charged != true) {
    return <p></p>;
  } else {
    return (
      <div class="main-content bg-gray-100 flex flex-col flex-grow p-4">
        <div class="flex items-center justify-between mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0">
          <h1 class="font-bold text-2xl text-gray-700">Employés</h1>
          <div class="flex">
            <CreateEmployeeModal
              charged={charged}
              setCharged={setCharged}
              usersList={users_list}
              employesList={employee_list}
            />
          </div>
        </div>
        <div class="overflow-x-auto">
          <div class="inline-flex flex-wrap mt-4 overflow-auto" style={{"minWidth": "940px", "height" : "740px"}}>
              {employee_list.map((item, id) => {
                
                  reservations_list.length = 0;
                  for (let i = 0; i < item.attributes.reservations.data.length; i++) {
                    reservations_list.push(item.attributes.reservations.data[i]);
                    //console.log("rl", reservations_list);
                  }
                  //console.log("apres ajout", reservations_list);
                  userAvailability = item.attributes.availability;
                  let role = item.attributes.role;
                  let firstName = item.attributes.user.data.attributes.firstName;
                  let lastName = item.attributes.user.data.attributes.lastName;
                  let mail = item.attributes.user.data.attributes.email;

                  return (<div class="my-2 mx-8 max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-md" style={{"width": "400px"}}>
                      <div class="md:flex">
                          <div class="w-full p-2 py-10">
                              <div class="flex justify-center">
                                  <div class="relative"> <UserCircleIcon  className="w-20 h-20 text-indigo-600" aria-hidden="true" /> </div>
                              </div>
                              <div class="flex flex-col text-center mt-3 mb-4"> <span class="text-2xl font-medium">{firstName + " " + lastName }</span> <span class="text-md text-gray-400">{role}</span> </div>
                              <p class="px-16 text-center text-md text-gray-800 hover:text-indigo-800"><span class="bg-gray-100 h-5 p-1 px-3 rounded  hover:shadow">{mail}</span></p>
                              {(charged && 
                                <div id="table_hour" class="m-1 px-3 overflow-auto rounded hover:shadow mt-4 text-center text-md text-gray-800">
                                  { 
                                    (Object.keys(userAvailability)).map(key => {
                                      let arrHour = userAvailability[key].split('-');
                                      if(arrHour[0]=="null"){
                                        arrHour = ["null", "null"];
                                      }
                                      return (<div id="degre1" class="-mx-3 px-2"><div class="flex flex-row justify-between"><span class="">{key}</span> <span> {userAvailability[key]} </span></div></div>)
                                    })
                                  }
                                </div>
                              )}
                          </div>
                      </div>
                      <div class="flex flex-col text-center mt-3 mb-4 space-y-4"> <span class="text-2xl font-medium">SES RENDEZ-VOUS</span>
                            {reservations_list.map((item2, id) =>{
                                  if(new Date(item2.attributes.date).getTime() >= Date.now() && charged)
                                    return(<p class="px-1 mx-4 hover:shadow bg-gray-100 p-1 rounded text-center" id=""> RDV avec <b>{item2.attributes.client.data.attributes.user.data.attributes.lastName} {item2.attributes.client.data.attributes.user.data.attributes.firstName} </b> le  <b>{new Date(item2.attributes.date).toDateString()}</b> à <b>{new Date(item2.attributes.date).getHours()}h{new Date(item2.attributes.date).getMinutes()}</b></p>)
                            })}
                      </div>  
                  </div>)
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Employees;
