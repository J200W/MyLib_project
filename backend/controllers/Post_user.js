
const { prepare_response } = require('./Tools_controllers');
const {new_user} = require("../database/newUser");
const mysql = require("mysql2/promise");
const {execute_query} = require("../database/Connection");

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
        return prepare_response(rows.length > 0,{email: email}, 'SignIn réussi', 'SignIn échoué');
    } catch (error) {
        console.error("Error during authentication:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, {email: email}, undefined, 'Erreur du serveur pour SignIn' );
    }
}

async function req_modifyMyAccount(reqBody) {
    // Vérifier si des données ont été envoyées
    try {
        let query = "UPDATE Clients SET pseudo_Clients = ? WHERE mail_Clients = ?";
        const result = await execute_query(query, [reqBody.pseudo, reqBody.email], "update");
        return prepare_response(result, reqBody,  `Données modifiées pour ${reqBody.pseudo}`, `Données non modifiées pour ${reqBody.pseudo}`);
    } catch (error) {
        console.error("Error during modify account:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, [reqBody.email, reqBody.pseudo], undefined, 'Error of server to modify your account');
    }

}


// =========================================================
// EXPORTATIONS
module.exports = { req_modifyMyAccount, req_signIn, req_signUp};