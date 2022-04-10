const axios = require('axios').default;
var FormData = require('form-data');
var fs = require('fs');

const SERVER = 'http://localhost:1337/';
const HOST = SERVER + 'api/';

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

/* champs requis pour les employees */
const nameE = "Violet";
const availabilityE = JSON.stringify({});
const userIdE = 2;

/* champs requis pour les videos */
const tiltleV = "video test";
var dataV = new FormData();
const pathV = '/Users/paulux/Downloads/yoimiya gifmaker.mp4';
dataV.append('files', fs.createReadStream(pathV));

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
    var prestation = JSON.stringify(response.data); // prestation ajoutée
    console.log("La prestation a été ajouté:\n" + prestation);
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
    var categorie = JSON.stringify(response.data); // categorie ajoutée
    console.log("La categorie a été ajouté:\n" + categorie);
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
    var formation = JSON.stringify(response.data); // formation ajoutée
    console.log("La formation a été ajouté:\n" + formation);
}).catch(() => {
    console.log("Il y a eu un probleme en essayant d'ajouter la formation (peut-être deja défini ?)");
});


/* ================ */

var dataE = JSON.stringify({
    "data": {
      "name": nameE,
      "availability": availabilityE,
      "user": userIdE
    }
});

var config = setupConfig('post', HOST + 'employees/', { 'Content-Type': 'application/json' }, dataE);

axios(config)
.then(function (response) {
    var formation = JSON.stringify(response.data); // formation ajoutée
    console.log("L'employé a été ajouté:\n" + formation);
})
.catch(function (error) {
    console.log("Il y a eu un probleme en essayant d'ajouter l'employé (peut-être deja défini ?)");
});
  
/* ================ */


var config = setupConfig('post', HOST + 'upload/', { ...dataV.getHeaders() }, dataV);

axios(config)
.then(function (response) {
  const fileId = response.data[0].id;
  console.log("La video a été upload:\n" + fileId);

  var data = JSON.stringify({
    "data": {
      "title": "new video!",
      "file": fileId
    }
  });

  var config = setupConfig('post', HOST + 'videos/', { 'Content-Type': 'application/json' }, data);

  axios(config)
  .then(function (response) {
    var video = JSON.stringify(response.data);
    console.log("La video a été ajouté :\n" + video);
  })
  .catch(function (error) {
    console.log("Il y a eu un probleme en essayant d'ajouter la video (peut-être deja défini ?)")
  });
  
})
.catch(function (error) {
  console.log("Il y a eu un probleme en essayant d'upload la video (peut-être deja défini ?)");
});