const axios = require('axios').default;

const username = "ok@yes.com";
const password = "ouidemain";
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
    console.log(username)
    console.log(password)
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