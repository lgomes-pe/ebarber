const axios = require('axios').default;

const username = "Master";
const password = "coucou1";
const id = 1;
const HOST = 'http://localhost:1337/api/';

/* === Fonctions === */

async function login(user, pwd){
    const { data } = await axios.post(HOST + 'auth/local?populate=*', {
        identifier: user,
        password: pwd,
    });
    return data;
}

/* === Applications === */

/* === Login === */

login(username, password).then(res => { // Requete pour s'authentifier sur le backend
    var id_login = res.user.id;

    axios.get(HOST + 'employees?populate=*&filters[user][id][$eq]=' + id_login, { 
        headers: {},
        data : ''
    }).then((response) => {
        const data_user = JSON.stringify(response.data);
        console.log("connexion possible!");
        console.log(data_user);
    }).catch(() => {
        console.log("Il y a un probleme...");
    });

}).catch(() => { console.error('Invalid password or username!');});

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

/* === PUT Applications === */

/* === DELETE Applications === */

axios.delete(HOST + 'prestations/' + id, {
    headers: {},
    data : ''
}).then(function (response) {
    var prestation = response.data; // prestation suppr
    console.log("prestation\n " + prestation + "\nsuppr!");
}).catch(() => {
    console.log("probleme lors de la suppression de la prestation " + id);
});

