const axios = require('axios').default;

const id = 1;
const HOST = 'http://localhost:1337/api/';

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
