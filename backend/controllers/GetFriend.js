const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function get_friends(email=""){
    try {
        const query =
            "SELECT friend.* FROM Client as currentuser JOIN friends_with on friends_with.id_Client=currentuser.id_Client JOIN Client as friend on friends_with.id_Client_1=friend.id_Client where currentuser.mail_client=?;";
        const [rows] = await execute_query(query, [email], "select");
        return prepare_response(rows.length > 0, rows, 'Friends retrieved', 'No Friends');
    }
    catch (error) {
        console.error("Error during retrieve Friends:", error);
        return prepare_response(false, email, undefined, 'Error of server to retrieve Friends');
    }
}
module.exports = { get_friends };