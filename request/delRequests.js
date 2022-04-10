const axios = require('axios').default;

const id = 1;

const SERVER = 'http://localhost:1337/';
const HOST = SERVER + 'api/';

/* === Fonctions === */

/* === Applications === */

/* === DELETE Applications === */

axios.delete(HOST + 'prestations/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var prestation = JSON.stringify(response.data); // prestation suppr
    console.log("prestation\n " + prestation + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de la prestation " + id);
});

/* ================ */

axios.delete(HOST + 'categories/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var categorie = JSON.stringify(response.data); // categorie suppr
    console.log("categorie\n " + categorie + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de la categorie " + id);
});

/* ================ */

axios.delete(HOST + 'formations/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var formation = JSON.stringify(response.data); // formation suppr
    console.log("formation\n " + formation + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de la formation " + id);
});

/* ================ */

axios.delete(HOST + 'clients/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var client = JSON.stringify(response.data); // client suppr
    console.log("client\n " + client + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression du client " + id);
});

/* ================ */

axios.delete(HOST + 'employees/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var employee = JSON.stringify(response.data); // employee suppr
    console.log("employee\n " + client + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de l'employee " + id);
});

/* ================ */

axios.delete(HOST + 'users/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var user = JSON.stringify(response.data); // user suppr
    console.log("user\n " + user + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression du user " + id);
});

/* ================ */

axios.delete(HOST + 'reservations/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var reservation = JSON.stringify(response.data); // reservation suppr
    console.log("reservation\n " + reservation + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de la reservation " + id);
});

/* ================ */

axios.delete(HOST + 'videos/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var video = JSON.stringify(response.data); // video suppr
    console.log("video\n " + video + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de la video " + id);
});