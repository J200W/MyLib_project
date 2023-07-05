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

function verif_stock_date(date_debut, date_fin){
    var date_debut_stock = new Date(date_debut)
    var date_fin_stock = new Date(date_fin)
    var date_now = new Date()
    if (date_now > date_debut && date_now < date_fin){
        return 1
    }
    return 0
}

const port = process.env.PORT || 8090;

// =========================================================
// EXPORTATIONS
module.exports = { prepare_response, port, afficherMessage, verif_stock_date};