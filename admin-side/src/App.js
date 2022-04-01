import {Navigate, NavLink,  Routes, Route } from "react-router-dom";
import React from 'react';
import Admin from "./Admin"

const axios = require('axios').default;
const HOST = 'http://localhost:1337/api/';

async function login(user, pwd){
  const { data } = await axios.post(HOST + 'auth/local?populate=*', {
      identifier: user,
      password: pwd,
  });
  return data;
}

const HandleSubmit = (event) => {login(username, password).then(res => { // Requete pour s'authentifier sur le backend
  var id_login = res.user.id;

  axios.get(HOST + 'employees?populate=*&filters[user][id][$eq]=' + id_login, {
      headers: {},
      data : ''
  }).then((response) => {
      const data_user = JSON.stringify(response.data);
      console.log("connexion possible!");
      console.log(data_user);
      <Navigate to="./Admin"/>
  }).catch(() => {
      console.log("Il y a un probleme...");
  });

}).catch(() => { console.error('Invalid password or username!');});}


function App() {
  return (
    <div className='app'>
      <Main />
    </div>
  );
}


const Main = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/Admin' element={<Admin/>}/>
    </Routes>
  );
}

const Home = () => {
  return (
    <div>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="./logo.png"
          alt=""
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion à votre compte</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
          </a>
        </p>
      </div>

      <form className="mt-8 space-y-6" action="" onSubmit={HandleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              E-mail
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="E-mail"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">


          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <div>

        <button
          type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >

          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
          </svg>
          </span>
          Connexion
        </button>


        </div>
      </form>
    </div>
  </div>
  </div>
  );
}

export default App;
