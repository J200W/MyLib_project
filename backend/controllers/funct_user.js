
const { prepare_response } = require('./Tools_controllers');
function modify_myAccount(reqBody){
    // Vérifier si des données ont été envoyées
    let response = {};
    if (reqBody) {
        // Vous pouvez accéder aux données envoyées depuis le composant ici
        const pseudo = reqBody.pseudo;
        const genre = reqBody.genre;
        // ...

        // Faites quelque chose avec les données reçues, comme les enregistrer dans une base de données, les traiter, etc.
        // Exemple de réponse renvoyée au composant

        response = prepare_response(true, `Données on serveur${reqBody.pseudo} ${reqBody.genre}`, reqBody);
    }
    else {
        // Aucune donnée n'a été envoyée
        response = prepare_response(false, `Données pas sur le serveur`, reqBody);
    }

    return response;
}


// =========================================================
// EXPORTATIONS
module.exports = { modify_myAccount};