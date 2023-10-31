const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function get_friends(email){
    try {
        const query =
            "SELECT c.* FROM Clients c WHERE c.mail_Clients = (SELECT f.mail_Clients FROM friends_with f WHERE c.mail_Clients = f.mail_Clients and f.mail_Clients_1=?) OR c.mail_Clients = (SELECT f.mail_Clients_1 FROM friends_with f WHERE c.mail_Clients = f.mail_Clients_1 and f.mail_Clients=?)";
        const [rows] = await execute_query(query, [email,email], "select");
        return prepare_response(rows.length > 0, rows, 'Friends retrieved', 'No Friends');
    }
    catch (error) {
        console.error("Error during retrieve Friends:", error);
        return prepare_response(false, email, undefined, 'Error of server to retrieve Friends');
    }
}
module.exports = { get_friends };