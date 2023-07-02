
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
        return prepare_response(result, [email, pseudo, password], 'SignUp successful', 'Failed SignUp');
    } catch (error) {
        console.error("Error during registration:", error);
        console.log(error);
        return prepare_response(false, [email, pseudo, password], undefined, 'Server error during SignUp' );
    }
}

async function req_signIn(email, password, admin) {
    try {
        if (admin) {
            const query = "SELECT * FROM Admin_biblio WHERE mail_admin = ? AND mdp_admin = ?";
            const [rows] = await execute_query(query, [email, password], "select")
            return prepare_response(rows.length > 0,{email: email, pseudo : rows[0] ? rows[0].pseudo_admin : rows}
                , 'SignIn successful', 'SignIn fail');
        }
        else {
            const query = "SELECT * FROM Clients WHERE mail_Clients = ? AND mdp_Clients = ?";
            const [rows] = await execute_query(query, [email, password], "select")
            return prepare_response(rows.length > 0,{email: email, pseudo : rows[0] ? rows[0].pseudo_Clients : rows}, 'LogIn successful', 'LogIn failed');
        }
    }
    catch (error) {
        console.error("Error during authentication:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, {email: email}, undefined, 'Server error during SignIn' );
    }
}

async function req_modifyMyAccount(reqBody) {
    // Vérifier si des données ont été envoyées
    try {
        let query ;
        if (reqBody.admin === "false") {
            query = "UPDATE Clients SET pseudo_Clients = ? WHERE mail_Clients = ?";
        }
        else {
            query = "UPDATE Admin_biblio SET pseudo_admin = ? WHERE mail_admin = ?";
        }
        const result = await execute_query(query, [reqBody.pseudo, reqBody.email], "update");
        return prepare_response(result, reqBody,  `Data has been modified for ${reqBody.pseudo}.`,
            `Fail modifying data for ${reqBody.pseudo}.`);
    } catch (error) {
        console.error("Error during modify account:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, reqBody, undefined, 'Error of server to modify your account');
    }

}

async function BorrowBook(id_ebook,mail_Clients,debut_emprunt,fin_emprunt,marquepage) {
    // Vérifier si des données ont été envoyées
    try {
        let query ;
        query = "INSERT INTO emprunter values (id_ebook,mail_Clients,debut_emprunt,fin_emprunt,marquepage) (?,?,?,?,?)";
        const result = await execute_query(query, [id_ebook, mail_Clients,debut_emprunt,fin_emprunt,marquepage], "insert");
        return prepare_response(result, reqBody,  `Data has been modified for ${reqBody.mail_Clients}.`,
            `Fail modifying data for ${reqBody.mail_Clients}.`);
    } catch (error) {
        console.error("Error during Borrow:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, reqBody, undefined, 'Error of server to Borrow');
    }
}


// =========================================================
// EXPORTATIONS
module.exports = { req_modifyMyAccount, req_signIn, req_signUp, BorrowBook};