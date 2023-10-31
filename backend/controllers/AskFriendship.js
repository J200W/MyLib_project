const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function AskFriendship(his_pseudo){
    try {
        const query =
            "select * from Clients where pseudo_Clients = ?; "
        const [rows] = await execute_query(query, [his_pseudo], "select");
        return prepare_response(rows.length>0, rows, 'FUTURE FRIEND ID KEPT', 'FUTURE FRIEND ID HERETICAL TREASON');
    }
    catch (error) {
        console.error("Error during RETRIEVE FUTURE FRIEND ID:", error);
        return prepare_response(false, his_pseudo, undefined, 'Error of server to RETRIEVE ID');
    }
}

async function AskFriendship2(us_mail,his_mail){
    try {
        const query =
            "insert into Ask_Friend (mail_Clients,mail_Clients_1,Status) values (?,?,'Pending'); "
        const rows = await execute_query(query, [us_mail,his_mail], "insert");
        return prepare_response(rows, rows, 'FRIENDSHIP REQUEST SENT', 'FRIENDSHIP HERETICAL TREASON');
    }
    catch (error) {
        console.error("Error during REQUESTING FRIENDSHIP:", error);
        return prepare_response(false, us_mail, undefined, 'Error of server to ASK FOR FRIENDSHIP');
    }
}

module.exports = { AskFriendship,AskFriendship2 };