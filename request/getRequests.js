const axios = require('axios').default;

const HOST = 'http://localhost:1337/api/';

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
