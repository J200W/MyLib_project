// =========================================================
// FONCTION OUTILS DE CONTROLLERS POUR PREPARER REPONSE
function prepare_response(condition, reqBody, messageSuccess="", messageFail=""){
    // Vérifier si des données ont été envoyées
    let response = {};
    if (condition) {
        // Faites quelque chose avec les données reçues, comme les enregistrer dans une base de données, les traiter, etc.
        // Exemple de réponse renvoyée au composant
        response = {
            status: 'success',
            message: `Données traités avec succès sur le serveur !\n` + messageSuccess,
            donnees: reqBody
        };
    }
    else {
        // Aucune donnée n'a été envoyée
        response = {
            status: 'error',
            message: `Echec du traitement des données sur le serveur !\n` + messageFail,
            donnees: reqBody
        };
    }

    return response;
}

const port = process.env.PORT || 8090;

// =========================================================
// EXPORTATIONS
module.exports = { prepare_response, port};