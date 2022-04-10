const axios = require('axios').default;

const SERVER = 'http://localhost:1337/';
const HOST = SERVER + 'api/';

/* === Fonctions === */

/* === Applications === */

/* === GET Applications === */

axios.get(HOST + 'prestations', { // Recuperer la liste des prestations
    headers: {},
    data : ''
}).then((response) => {
    const prestations = JSON.stringify(response.data);
    console.log("Demande de la liste des prestations bien reçue!");
    console.log(prestations);
}).catch(() => {
    console.log("Demande de la liste des prestations non reçue...");
});

/* ================ */

axios.get(HOST + 'categories', { // Recuperer la liste des categories
    headers: {},
    data : ''
}).then((response) => {
    const categories = JSON.stringify(response.data);
    console.log("Demande de la liste des catégories bien reçue!");
    console.log(categories);
}).catch(() => {
    console.log("Demande de la liste des catégories non reçue...");
});

/* ================ */

axios.get(HOST + 'formations', { // Recuperer la liste des categories
    headers: {},
    data : ''
}).then((response) => {
    const formations = JSON.stringify(response.data);
    console.log("Demande de la liste des formations bien reçue!");
    console.log(formations);
}).catch(() => {
    console.log("Demande de la liste des formations non reçue...");
});

/* ================ */

axios.get(HOST + 'achats?populate=*', { // Recuperer la liste des achats
    headers: {},
    data : ''
}).then((response) => {
    const achats = JSON.stringify(response.data);
    console.log("Demande de la liste des achats bien reçue!");
    console.log(achats);
}).catch(() => {
    console.log("Demande de la liste des achats non reçue...");
});

/* ================ */

axios.get(HOST + 'certifications?populate=*', { // Recuperer la liste des certifications
    headers: {},
    data : ''
}).then((response) => {
    const certifications = JSON.stringify(response.data);
    console.log("Demande de la liste des certifications bien reçue!");
    console.log(certifications);
}).catch(() => {
    console.log("Demande de la liste des certifications non reçue...");
});

/* ================ */

axios.get(HOST + 'clients?populate=user', { // Recuperer la liste des clients
    headers: {},
    data : ''
}).then((response) => {
    const clients = JSON.stringify(response.data);
    console.log("Demande de la liste des clients bien reçue!");
    console.log(clients);
}).catch(() => {
    console.log("Demande de la liste des clients non reçue...");
});

/* ================ */

axios.get(HOST + 'employees?populate=*', { // Recuperer la liste des employees 
    headers: {},
    data : ''
}).then((response) => {
    const employees = JSON.stringify(response.data);
    console.log("Demande de la liste des employees bien reçue!");
    console.log(employees);
}).catch(() => {
    console.log("Demande de la liste des employees non reçue...");
});

/* ================ */

axios.get(HOST + 'reservations?populate=*', { // Recuperer la liste des reservations
    headers: {},
    data : ''
}).then((response) => {
    const reservations = JSON.stringify(response.data);
    console.log("Demande de la liste des reservations bien reçue!");
    console.log(reservations);
}).catch(() => {
    console.log("Demande de la liste des reservations non reçue...");
});

/* ================ */

axios.get(HOST + 'videos?populate=*', { // Recuperer la liste des videos
    headers: {},
    data : ''
}).then((response) => {
    const reservations = JSON.stringify(response.data);
    console.log("Demande de la liste des videos bien reçue!");
    console.log(reservations);
}).catch(() => {
    console.log("Demande de la liste des videos non reçue...");
});



