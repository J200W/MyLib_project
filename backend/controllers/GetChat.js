const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrieveImage} = require("../scripts/firebase_function");

async function get_chat(email1,email2){
    try {
        const query =
            "select Post.*,post_to_friend.mail_Clients from post_to_friend join Post on post_to_friend.Id_Post = Post.Id_Post where (post_to_friend.mail_Clients=? and post_to_friend.mail_Clients_1=?) or (post_to_friend.mail_Clients=? and post_to_friend.mail_Clients_1=?) order by Post.Id_Post";
        const [rows] = await execute_query(query, [email1,email2,email2,email1], "select");
        return prepare_response(rows.length > 0, rows, 'Friends retrieved', 'No Friends');
    }
    catch (error) {
        console.error("Error during retrieve Friends:", error);
        return prepare_response(false, email, undefined, 'Error of server to retrieve Friends');
    }
}
module.exports = { get_chat };