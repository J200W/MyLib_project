const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function refuser(friend_email,user_email){
    try {
        const query =
            "delete from Ask_Friend where mail_Clients=? and mail_Clients_1=?;";
        const rows = await execute_query(query, [friend_email,user_email], "update");
        console.log(rows)
        return prepare_response(rows, friend_email, 'Friends retrieved', 'No Friends');
    }
    catch (error) {
        console.error("Error during retrieve Friends:", error);
        return prepare_response(false, friend_email, undefined, 'Error of server to retrieve Friends');
    }
}
module.exports = { refuser };