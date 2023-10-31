const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function SendMessage(Message){
    try {
        const query =
            "insert into Post (contenu_text_post, date_envoi_post) values (?,now()); "
        const rows = await execute_query(query, [Message], "insert");
        return prepare_response(rows, rows, 'MESSAGE SENT', 'HERETICAL TREASON MESSAGE');
    }
    catch (error) {
        console.error("Error during WRITING MESSAGE:", error);
        return prepare_response(false, Message, undefined, 'Error of server to WRITE MESSAGE');
    }
}

async function SendMessage2(){
    try {
        var query =
            "select * from Post ORDER BY Id_Post DESC LIMIT 1 "
        const [rows] = await execute_query(query, [], "select");
        return  prepare_response(rows.length>0,rows,'ID KEPT','HERETICAL TREASON')
    }
    catch (error) {
        console.error("Error during KEEP MESSAGE ID:", error);
        return prepare_response(false, [], undefined, 'Error of server to KEEP MESSAGE ID');
    }
}

async function SendMessage3(email1,email2,id){
    try {
        var query = "insert into post_to_friend (mail_Clients, mail_Clients_1, Id_Post) values (?,?,?)"
        const rows=await execute_query(query, [email1,email2,id], "insert");
        return prepare_response(rows, rows, 'DESTINATION ET SOURCE SET', 'SET ERROR');
    }
    catch (error) {
        console.error("Error during SET:", error);
        return prepare_response(false, email1, undefined, 'Error of server to SET MESSAGE PORTS');
    }
}
module.exports = { SendMessage,SendMessage2,SendMessage3 };