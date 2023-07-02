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
            message: `Success !\n` + messageSuccess,
            donnees: reqBody
        };
    }
    else {
        // Aucune donnée n'a été envoyée
        response = {
            status: 'error',
            message: `Failed handling the given data !\n` + messageFail,
            donnees: reqBody
        };
    }

    return response;
}

function afficherMessage(message, duree) {
    alert(message);
    setTimeout(function() {
        alert("");
    }, duree);
}

const port = process.env.PORT || 8090;

// =========================================================
// EXPORTATIONS
module.exports = { prepare_response, port, afficherMessage};