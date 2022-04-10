const axios = require('axios').default;

const id = 2;

const SERVER = 'http://localhost:1337/';
const HOST = SERVER + 'api/';

/* champs requis pour les prestations */
const titleP = "carré";
const priceP = 100;
const durationP = 2;
const descriptionP = "ceci est une description de pestation.";

/* champs requis pour les categories */
const nameC = "Sal'mèche";

/* champs requis pour les formations */
const nameF = "Bruler les cheveux des clients";
const descriptionF = "Tout savoir pour éviter de bruler les cheveux";
const prerequisiteF = "Il faut avoir suivi le cours sur les risques chimiques";
const priceF = 200;

/* champs requis pour les employees */
const nameE = "Violet";
const availabilityE = '{"mardi" : "9h00 - 16h00"}';
const reservationE = -1;
const userE = -1;

/* champs requis pour les reservations */
const dateR = "2024-10-20T22:00:00.000Z";
const prestationR = -1; // Il faut preciser l'ID
const employeeR = -1; // Il faut préciser l'ID
const reservationStateR = "canceled";

/* champs requis pour les videos */
const videoId = "4";
const prevV = "10"; // Id de la video à supprimer
const titleV = "video test modif";
var dataV = new FormData();
const pathV = '/Users/paulux/Downloads/yoimiya gifmaker.mp4';
dataV.append('files', fs.createReadStream(pathV));

/* === Fonctions === */

function setupConfig(method, url, headers, data){
    return {
        method: method,
        url: url,
        headers: headers,
        data : data
    };
}

/* === Applications === */

/* === PUT Applications === */

var dataP = JSON.stringify({
    "data": {
      "title": titleP,
      "price": priceP,
      "duration": durationP,
      "description": descriptionP
    }
});

var config = setupConfig('put', HOST + 'prestations/' + id, { 'Content-Type': 'application/json' }, dataP);

axios(config).then(function (response) {
    var prestation = JSON.stringify(response.data); // prestation modifiée
    console.log("La prestation a été modifié:\n" + prestation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant de modifier la prestation " + id);
});

/* ================ */

var dataC = JSON.stringify({
    "data": {
      "name": nameC
    }
});

var config = setupConfig('put', HOST + 'categories/' + id, { 'Content-Type': 'application/json' }, dataC);

axios(config).then(function (response) {
    var categorie = JSON.stringify(response.data); // categorie modifiée
    console.log("La categorie a été modifié:\n" + categorie);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant de modifier la categorie " + id);
});

/* ================ */

var dataF = JSON.stringify({
    "data": {
      "title": nameF,
      "description": descriptionF,
      "prerequisite": prerequisiteF,
      "price": priceF
    }
});

var config = setupConfig('put', HOST + 'formations/' + id, { 'Content-Type': 'application/json' }, dataF);

axios(config).then(function (response) {
    var formation = JSON.stringify(response.data); // formation modifiée
    console.log("La formation a été modifié:\n" + formation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant de modifier la formation " + id);
});

/* ================ */

var dataE = JSON.stringify({
    "data": {
      "availability": availabilityE
    }
});

var config = setupConfig('put', HOST + 'employees/' + id, { 'Content-Type': 'application/json' }, dataE);

axios(config).then(function (response) {
    var formation = JSON.stringify(response.data); // employee modifiée
    console.log("L'employee a été modifié:\n" + formation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant de modifier l'employee " + id);
});

/* ================ */

var dataR = JSON.stringify({
    "data": {
        "date": dateR,
        "reservationState": reservationStateR,
    }
});

var config = setupConfig('put', HOST + 'reservations/' + id, { 'Content-Type': 'application/json' }, dataR);

axios(config).then(function (response) {
    var formation = JSON.stringify(response.data); // reservation modifiée
    console.log("La reservation a été modifié:\n" + formation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant de modifier la reservation " + id);
});

/* ================ */

// Modifier une video c'est implicitement supprimer l'ancienne pour libérer de l'espace, puis upload la nouvelle et mettre à jour la table video
axios.delete(HOST + 'upload/files/' + prevV, {
    headers: {},
    data : ''
}).then(function (response) {
    var video = JSON.stringify(response.data); // video suppr d'upload
    console.log("video\n " + video + "\nsuppr d'upload!");

    var config = setupConfig('post', HOST + 'upload/', { ...dataV.getHeaders() }, dataV);

    axios(config)
    .then(function (response) {
        const fileId = response.data[0].id;
        console.log("La video a été upload:\n" + fileId);

        var data = JSON.stringify({
            "data": {
              "title": titleV,
              "file": fileId
            }
        });

        var config = setupConfig('put', HOST + 'videos/' + videoId, { 'Content-Type': 'application/json' }, data);

        axios(config).then(function (response) {
            var formation = JSON.stringify(response.data); // reservation modifiée
            console.log("La video a été modifié:\n" + formation);
        }).catch(() => {
            console.log("Il y a eu un probleme en essayant de modifier la video " + videoId);
        });
    
    }).catch(function (error) {
        console.log("Il y a eu un probleme en essayant d'upload la video (peut-être deja défini ?)");
    });
}).catch(() => {
    console.log("probleme lors de la suppression de la video dans upload" + id);
});


  