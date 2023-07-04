
const { prepare_response } = require('./Tools_controllers');
const {new_user} = require("../database/newUser");
const mysql = require("mysql2/promise");
const {execute_query} = require("../database/Connection");

const moment = require('moment/moment');
const {retrieveImageCarousel} = require("../scripts/firebase_function");
const get_biblio = require("../controllers/Post_ebooks").get_biblio;


async function req_signUp(email, pseudo, password){
    // Retourne une réponse JSON
    if (password.length < 8) 
    return prepare_response(false, [email, pseudo, password], undefined, 'Password too short' );
    // check if the password contains an uppercase letter
    if (!/[A-Z]/.test(password))
    return prepare_response(false, [email, pseudo, password], undefined, 'Password must contain at least one uppercase letter' );
    // check if the password contains a lowercase letter
    if (!/[a-z]/.test(password))
    return prepare_response(false, [email, pseudo, password], undefined, 'Password must contain at least one lowercase letter' );
    // check if the password contains a number
    if (!/[0-9]/.test(password))
    return prepare_response(false, [email, pseudo, password], undefined, 'Password must contain at least one number' );
    var query =
        "INSERT INTO Clients (mail_Clients, pseudo_Clients, mdp_Clients) VALUES (?, ?, ?)";
    try {
        // Check if the user is an admin
        query = "SELECT * FROM Admin_biblio WHERE mail_admin = ?";
        const [rows] = await execute_query(query, [email], "select");
        if (rows.length > 0) {
            return prepare_response(false, [email, pseudo, password], undefined, 'This email is already used' );
        }
        const result = await execute_query(query, [email, pseudo, password], "insert");
        return prepare_response(result, [email, pseudo, password], 'SignUp successful', 'Failed SignUp');
    } catch (error) {
        console.error("Error during registration:", error);
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
        query = "INSERT INTO emprunter (id_ebook,mail_Clients,debut_emprunt,fin_emprunt,marquepage) values (?,?,?,?,?)";
        const result = await execute_query(query, [id_ebook, mail_Clients,debut_emprunt,fin_emprunt,marquepage], "insert");
        return prepare_response(result, [id_ebook,mail_Clients,debut_emprunt,fin_emprunt,marquepage],  `Borrow Successful.`,
            `Borrow FATAL ERROR.`);
    } catch (error) {
        console.error("BORROW HERETICAL ERROR:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, [id_ebook,mail_Clients,debut_emprunt,fin_emprunt,marquepage], undefined, 'HERETICAL Error of server to Borrow');
    }
}

async function req_borrowBook(id_ebook, mail_Clients, debut_emprunt, fin_emprunt) {
    // Vérifier si des données ont été envoyées
    try {
        let query ;
        query = "INSERT INTO emprunter (id_ebook, mail_Clients, debut_emprunt, fin_emprunt, stock_emprunt) values (?,?,?,?,?)";
        const result = await execute_query(query, [id_ebook, mail_Clients,debut_emprunt,fin_emprunt, 1], "insert");
        query = "UPDATE Ebook SET stock = stock - 1 WHERE id_ebook = ?";
        const result2 = await execute_query(query, [id_ebook], "update");
        return prepare_response(result&result2, mail_Clients,  `Data has been modified for ${mail_Clients}.`,
            `Fail modifying data for ${mail_Clients}.`);
    } catch (error) {
        console.error("Error during Borrow:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, mail_Clients, undefined, 'Error of server to Borrow');
    }
}


async function req_add_remove_favorite(id_ebook, mail_Clients) {
    // Vérifier si des données ont été envoyées
    try {
        let query ;
        query = "SELECT * FROM favoris WHERE id_ebook = ? AND mail_Clients = ?";
        const [rows] = await execute_query(query, [id_ebook, mail_Clients], "select");
        if (rows.length > 0) {
            query = "DELETE FROM favoris WHERE id_ebook = ? AND mail_Clients = ?";
            const result = await execute_query(query, [id_ebook, mail_Clients], "delete");
            return prepare_response(result, mail_Clients,  `Book has been removed from favorite for ${mail_Clients}.`,
            `Fail modifying data for ${mail_Clients}.`);
        }
        else {
            query = "INSERT INTO favoris (id_ebook, mail_Clients) values (?,?)";
            const result = await execute_query(query, [id_ebook, mail_Clients], "insert");
            return prepare_response(result, mail_Clients,  `Book has been added to favorite for ${mail_Clients}.`,
            `Fail modifying data for ${mail_Clients}.`);
        }
    }
    catch (error) {
        console.error("Error during Borrow:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, mail_Clients, undefined, 'Error of server to Borrow');
    }
}

async function req_check_favorite(id_ebook, mail_Clients) {
    // Vérifier si des données ont été envoyées
    try {
        let query ;
        query = "SELECT * FROM favoris WHERE id_ebook = ? AND mail_Clients = ?";
        const [rows] = await execute_query(query, [id_ebook, mail_Clients], "select");
        if (rows.length > 0) {
            return prepare_response(true, mail_Clients,  `Book is in favorite for ${mail_Clients}.`,
            `Fail modifying data for ${mail_Clients}.`);
        }
        else {
            return prepare_response(false, mail_Clients,  `Book is not in favorite for ${mail_Clients}.`,
            `Fail modifying data for ${mail_Clients}.`);
        }
    }
    catch (error) {
        console.error("Error during Borrow:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, mail_Clients, undefined, 'Error of server to Borrow');
    }
}

async function req_get_favorites(mail_Clients) {
    // Vérifier si des données ont été envoyées
    try {
        let query ;
        query = "SELECT id_ebook FROM favoris WHERE mail_Clients = ?";
        const [rows] = await execute_query(query, [mail_Clients], "select");
        for (var i = 0; i < rows.length; i++) {
            query = "SELECT * FROM Ebook WHERE id_ebook = ?";
            const [rows2] = await execute_query(query, [rows[i].id_ebook], "select");
            rows[i] = rows2[0];
        }
        // get images with retrieveImageCarousel
        for (var i = 0; i < rows.length; i++) {
            var name_img = await retrieveImageCarousel(rows[i]);
            rows[i].name_img = name_img.src;
            var id_Biblio = await get_biblio(rows[i].id_Biblio);
            rows[i].id_Biblio = id_Biblio.donnees;
        }

        return prepare_response(true, rows,  `Favorite books for ${mail_Clients}.`,
        `Fail getting data for ${mail_Clients}.`);
    }
    catch (error) {
        console.error("Error during Borrow:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, mail_Clients, undefined, 'Error of server to Borrow');
    }
}

async function req_return_book(mail_Clients, id_ebook) {
    console.log(mail_Clients, id_ebook)
    // Vérifier si des données ont été envoyées
    try {
        let query = "UPDATE emprunter SET stock_emprunt = 0, fin_emprunt = NOW() WHERE mail_Clients = ? AND id_ebook = ?";
        const result = await execute_query(query, [mail_Clients, id_ebook], "update");
        console.log(result)
        if (!result) {
            return prepare_response(false, mail_Clients,  `Fail returning book for ${mail_Clients}.`,
            `Fail returning book for ${mail_Clients}.`);
        }
        query = "UPDATE Ebook SET stock = stock + 1 WHERE id_ebook = ?";
        const result2 = await execute_query(query, [id_ebook], "update");
        return prepare_response(result&result2, mail_Clients,  "Book has been returned",
            `Fail returning book for ${mail_Clients}.`);
    } catch (error) {
        console.error("Error during Borrow:", error);
        //res.status(500).send('Internal server error');
        return prepare_response(false, mail_Clients, undefined, 'Error of server to Borrow');
    }
}



// =========================================================
// EXPORTATIONS
module.exports = { req_modifyMyAccount, req_signIn, req_signUp, req_borrowed, 
    req_get_comments, req_get_book_stat, req_add_comment, req_borrowBook, req_add_remove_favorite, 
    req_check_favorite, req_get_favorites,req_return_book, BorrowBook,};

