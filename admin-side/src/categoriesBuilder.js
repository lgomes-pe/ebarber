import React, { useState } from "react";
import { render } from "react-dom";

var axios = require('axios');
const SERVER = 'http://localhost:1337/';
const HOST = SERVER + 'api/';

const categories_list = [];


function Test(){
    console.log("page charged");
    const [charged, setCharged] = useState(false);
    if(charged != true){
        axios.get(HOST + 'categories?populate=*', { // Recuperer la liste des prestations
            headers: {},
            data : ''
        }).then((response) => {
            const categories = JSON.stringify(response.data);
            console.log("Demande de la liste des categories bien reçue!");

            const parsedCategories = JSON.parse(categories).data;
            for(let i = 0; i < parsedCategories.length; i++){
                categories_list.push(parsedCategories[i]); //ajoute chaque categorie 1 par 1
            }
            setCharged(true);
            //console.log(categories_list);
        }).catch(() => {
            console.log("Demande de la liste des categories non reçue...");
        });
    }

    if(charged != true){
        return(<p></p>);
    } else {
        /* code promess */
        return(

        <div class="container flex overflow-x-auto overflow-y-auto bg-gray-100 items-start hide-scroll-bar mx-auto h-full">
            {

        categories_list.map(item => (

        <div class="bg-gray-100 flex-none w-full pr-6">
            <div class="border overflow-y-auto shadow-inner-[0_0px_0px_-24px_rgba(243, 244, 246, 0.3)] bg-clip-content bg-white rounded-lg h-full border pb-6 border-gray-200 dark:border-gray-700 ">
                <div class="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
                    <p tabindex="0" class="focus:outline-none text-xl lg:text-xl font-semibold leading-tight text-gray-800 dark:text-white ">{item.attributes.name}</p>
                    <button class="focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:bg-indigo-50 dark:focus:bg-indigo-500 flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100 dark:border-gray-800 ">
                    </button>
                </div>
                <div class="px-6 pt-6 overflow-x-auto overflow-y-auto">
                    <table class="w-full whitespace nowrap ">
                        <tbody>
                            {
                            item.attributes.prestations.data.map((prest, idx_prest) => (
                                <tr tabindex="0" class="focus:outline-none">
                                    <td class="pb-6">
                                        <div class="flex items-center">
                                            <div class="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">

                                            </div>
                                            <div class="pl-3">
                                                <div class="flex items-center text-sm leading-none">
                                                    <p class="font-semibold text-lg text-gray-800 dark:text-white ">{prest.attributes.title}</p>
                                                </div>
                                                <p class="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">{prest.attributes.description}</p>
                                                <div class="flex">
                                                    <a href="javascript: void(0)" class=" my-2 flex items-center bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-gray-600 pl-3 pr-6 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-600">
                                                        <span class="h-4 w-4 mr-2">
                                                            <ion-icon name="pencil-sharp"></ion-icon>
                                                        </span>
                                                        Modifier
                                                    </a>
                                                    <a href="javascript: void(0)" class="mx-2 my-2 flex items-center bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-red-700 pl-3 pr-6 py-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-600">
                                                        <span class="h-4 w-4 mr-2">
                                                            <ion-icon name="trash-sharp"></ion-icon>
                                                        </span>
                                                        Supprimer
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="pl-16">
                                        <div>
                                            <p class="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">{prest.attributes.price + " €"}</p>
                                            <div class="flex items-center justify-end px-2 py-1 mt-2 rounded-full">
                                                <p class="text-xs leading-3 text-green-700">{prest.attributes.duration + " h"}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>



            ))}
            </div>)

    }
}


export default Test;