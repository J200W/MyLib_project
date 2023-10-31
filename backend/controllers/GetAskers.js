const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function get_askers(email){
    try {
        const query =
            "SELECT friend.*,Status FROM Clients as currentuser JOIN Ask_Friend on Ask_Friend.mail_Clients_1=currentuser.mail_Clients JOIN Clients as friend on Ask_Friend.mail_Clients=friend.mail_Clients where currentuser.mail_Clients=? and Status='Pending';";
        const [rows] = await execute_query(query, [email], "select");
        return prepare_response(rows.length > 0, rows, 'Friends retrieved', 'No Friends');
    }
    catch (error) {
        console.error("Error during retrieve Friends:", error);
        return prepare_response(false, email, undefined, 'Error of server to retrieve Friends');
    }
}
module.exports = { get_askers };