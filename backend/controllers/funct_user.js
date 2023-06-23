
const { prepare_response } = require('./Tools_controllers');
const {new_user} = require("../database/newUser");
function req_signUp(reqBody){
    // Retourne une réponse JSON
    new_user(reqBody.email, reqBody.name, reqBody.fname, reqBody.password).then((result) => {
        return prepare_response(result, 'SignUp réussi', 'SignUp échoué', reqBody);
    });

}

function req_modifyMyAccount(reqBody){
    // Vérifier si des données ont été envoyées
    let response = {};
    if (reqBody) {
        // Vous pouvez accéder aux données envoyées depuis le composant ici
        const pseudo = reqBody.pseudo;
        const genre = reqBody.genre;
        // ...

        // Faites quelque chose avec les données reçues, comme les enregistrer dans une base de données, les traiter, etc.
        // Exemple de réponse renvoyée au composant
    }
    response = prepare_response(reqBody, `Données on serveur${reqBody.pseudo} ${reqBody.genre}`, `Données pas sur le serveur`, reqBody);

    return response;
}


// =========================================================
// EXPORTATIONS
module.exports = { req_modifyMyAccount, req_signUp};