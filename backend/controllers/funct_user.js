
const { prepare_response } = require('./Tools_controllers');
const {new_user} = require("../database/newUser");
const mysql = require("mysql2/promise");
const {execute_query} = require("../database/Connection");

async function sign_up(email, pseudo, password) {



    try {
        const [result] = await connection.query(query, [email, pseudo, password]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error during registration:", error);
        const result = false;
        return result;
    }
}
async function req_signUp(email, pseudo, password){
    // Retourne une réponse JSON
    const query =
        "INSERT INTO Clients (mail_Clients, pseudo_Clients, mdp_Clients) VALUES (?, ?, ?)";
    try {
        const result = await execute_query(query, [email, pseudo, password], "insert");
        return prepare_response(result, [email, pseudo, password], 'SignUp réussi', 'SignUp échoué');
    } catch (error) {
        console.error("Error during registration:", error);
        return prepare_response(false, [email, pseudo, password], undefined, 'Erreur du serveur pour SignUp' );
    }
}

async function req_signIn(email, password) {
    try {
        const query = "SELECT * FROM Clients WHERE mail_Clients = ? AND mdp_Clients = ?";
        const [rows] = await execute_query(query, [email, password], "select")
        console.log(rows.length);
        return prepare_response(rows.length > 0,[email, password], 'SignIn réussi', 'SignIn échoué');
    } catch (error) {
        console.error("Error during authentication:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, [email, password], undefined, 'Erreur du serveur pour SignIn' );
    }
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
module.exports = { req_modifyMyAccount, req_signIn, req_signUp};