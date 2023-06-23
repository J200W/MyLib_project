// =========================================================
// FONCTION OUTILS DE CONTROLLERS POUR PREPARER REPONSE
function prepare_response(condition, message, reqBody){
    // Vérifier si des données ont été envoyées
    let response = {};
    if (condition) {
        // Faites quelque chose avec les données reçues, comme les enregistrer dans une base de données, les traiter, etc.
        // Exemple de réponse renvoyée au composant
        response = {
            status: 'success',
            message: `Données traités avec succès !\n` + message,
            donnees: reqBody
        };
    }
    else {
        // Aucune donnée n'a été envoyée
        response = {
            status: 'error',
            message: `Echec du traitement des données !\n` + message,
            donnees: reqBody
        };
    }

    return response;
}

// =========================================================
// EXPORTATIONS
module.exports = { prepare_response};