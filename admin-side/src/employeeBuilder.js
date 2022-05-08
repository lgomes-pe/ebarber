import React, { useState } from "react";
import CreateEmployeeModal from "./createEmployeeModal";

var axios = require("axios");
const SERVER = "http://localhost:1337/";
const HOST = SERVER + "api/";

const employee_list = [];
const users_list = [];

function Employees() {
  const [charged, setCharged] = useState(false);
  if (charged != true) {
    axios
      .get(HOST + "employees?populate=*", {
        headers: {},
        data: "",
      })
      .then((response) => {
        const employees = JSON.stringify(response.data);
        console.log("Demande de la liste des employés bien reçue!");
        console.log(employees);
        const parsedEmployees = JSON.parse(employees).data;
        for (let i = 0; i < parsedEmployees.length; i++) {
          employee_list.push(parsedEmployees[i]);
        }
        console.log("LIST", employee_list);
        setCharged(true);
      })
      .catch(() => {
        console.log("Demande de la liste des employés non reçue...");
      });

    axios
      .get(HOST + "users?populate=*", {
        //recuperer la liste des users
        headers: {},
        data: "",
      })
      .then((response) => {
        const users = JSON.stringify(response.data);
        console.log("Demande de la liste des users bien reçue !");
        console.log(users);
        const parsedUsers = JSON.parse(users);
        for (let i = 0; i < parsedUsers.length; i++) {
          users_list.push(parsedUsers[i]);
        }
        console.log("LISTE", users_list);
      })
      .catch(() => {
        console.log("Demande de la liste des users non reçue...");
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Employees;
