const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function delete_friend(us_email,his_email){
    try {
        const query =
            "delete from friends_with where (mail_Clients=? and mail_Clients_1=?)or(mail_Clients=? and mail_Clients_1=?); "
        const rows = await execute_query(query, [us_email,his_email,his_email,us_email], "delete");
        return prepare_response(rows, rows, 'HERETICAL FRIEND PURGED WITH EPIC SUCCESS', 'ERROR : HERETICAL FRIEND TREASON');
    }
    catch (error) {
        console.error("Error during PURGE HERETICAL FRIEND:", error);
        return prepare_response(false, us_email, undefined, 'Error of server to PURGE HERETICAL FRIEND');
    }
}
module.exports = { delete_friend };