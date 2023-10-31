const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function AcceptFriendShip1(email_sender, us_email){
    try {
        const query =
            "delete from Ask_Friend where mail_Clients = ? and mail_Clients_1=?;"
        const rows = await execute_query(query, [email_sender, us_email], "delete");
        return prepare_response(rows, rows, 'ASKING DELETED', 'ASKING DELETION HERETICAL TREASON');
    }
    catch (error) {
        console.error("Error during DELETING ASKING:", error);
        return prepare_response(false, us_email, undefined, 'Error of server to DELETE ASKING');
    }
}

async function AcceptFriendShip2(email_sender, us_email){
    try {
        const query =
            "insert into friends_with (mail_Clients,mail_Clients_1,date_friendship) values(?,?,now());"
        const rows = await execute_query(query, [email_sender, us_email], "delete");
        return prepare_response(rows, rows, 'FRIEND ACQUIRED', 'FRIEND ACQUISITION HERETICAL TREASON');
    }
    catch (error) {
        console.error("Error during ACCEPTING FRIEND:", error);
        return prepare_response(false, us_email, undefined, 'Error of server to ACCEPT FRIEND');
    }
}

module.exports = { AcceptFriendShip1,AcceptFriendShip2 };