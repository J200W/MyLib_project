const {execute_query} = require("../database/Connection");
const {prepare_response} = require("./Tools_controllers");

async function get_user_datas(email) {
    try {
        const query =
            "SELECT * FROM Clients WHERE mail_Clients = ?";
        const [rows] = await execute_query(query, [email], "select");
        let pseudo_res = rows[0].pseudo_Clients ? rows[0].pseudo_Clients : "";
        return prepare_response(rows.length > 0, {email: email, pseudo: pseudo_res}, 'User retrieved', 'User not retrieved');
    }
    catch (error) {
        console.error("Error during retrieve user:", error);
        return prepare_response(false, email, undefined, 'Error of server to retrieve user');
    }
}

module.exports = { get_user_datas };