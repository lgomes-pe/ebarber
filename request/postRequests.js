const axios = require('axios').default;

const HOST = 'http://localhost:1337/api/';

/* champs requis pour les prestations */
const titleP = "carré7";
const priceP = 100;
const durationP = 2;
const descriptionP = "ceci est une description de pestation.";

/* champs requis pour les categories */
const nameC = "Sal'mèche7";

/* champs requis pour les formations */
const nameF = "Bruler les cheveux des clients7";
const descriptionF = "Tout savoir pour éviter de bruler les cheveux";
const prerequisiteF = "Il faut avoir suivi le cours sur les risques chimiques";
const priceF = 200;

/* === Fonctions === */

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

/* === POST Applications === */

var dataP = JSON.stringify({
    "data": {
      "title": titleP,
      "price": priceP,
      "duration": durationP,
      "description": descriptionP
    }
});

var config = setupConfig('post', HOST + 'prestations/', { 'Content-Type': 'application/json' }, dataP);

axios(config).then(function (response) {
    var prestation = JSON.stringify(response.data); // prestation modifiée
    console.log("La prestation a été modifié:\n" + prestation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant d'ajouter la prestation (peut-être deja défini ?)");
});


/* ================ */

var dataC = JSON.stringify({
    "data": {
      "name": nameC
    }
});

var config = setupConfig('post', HOST + 'categories/', { 'Content-Type': 'application/json' }, dataC);

axios(config).then(function (response) {
    var categorie = JSON.stringify(response.data); // categorie modifiée
    console.log("La categorie a été modifié:\n" + categorie);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant d'ajouter la categorie (peut-être deja défini ?)");
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

var config = setupConfig('post', HOST + 'formations/', { 'Content-Type': 'application/json' }, dataF);

axios(config).then(function (response) {
    var formation = JSON.stringify(response.data); // formation modifiée
    console.log("La formation a été modifié:\n" + formation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant d'ajouter la formation (peut-être deja défini ?)");
});
  