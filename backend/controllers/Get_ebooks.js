const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrievePDF} = require("../scripts/firebase_function");

async function get_particular_books(particularity="current", email=""){
    // Retourne une réponse JSON

    try {
        if (particularity === "current"){
            var query = "SELECT id_ebook FROM emprunter where mail_Clients = ?";
            var result = await execute_query(query, [email], "select");
            var ids = result[0].map((row) => row.id_ebook);
            if (ids.length === 0) {
                return prepare_response(false, [], "No books borrowed", "No books borrowed");
            }
            var query = "SELECT * FROM Ebook where id_ebook in (?) LIMIT 4";
            var result = await execute_query(query, [ids], "select");
            // Get images from firebase
            var imagePromises = [];
            for (var i = 0; i < result[0].length; i++) {
                imagePromises.push(retrieveImageCarousel(result[0][i]));
            }
            var imageUrls = await Promise.all(imagePromises);
            return prepare_response(true, imageUrls, "Success to get books for firebase", "Error while retrieving books");
        }

        else if (particularity === "new"){
            var query = "SELECT * FROM Ebook ORDER BY id_ebook DESC LIMIT 4";
            var result = await execute_query(query, [], "select");
            // Get images from firebase
            var imagePromises = [];
            for (var i = 0; i < result[0].length; i++) {
                imagePromises.push(retrieveImageCarousel(result[0][i]));
            }
            var imageUrls = await Promise.all(imagePromises);
            return prepare_response(true, imageUrls, "Success to get books for firebase", "Error while retrieving books");
        }

        else if (particularity === "discover"){
            // Choose random books
            var query = "SELECT * FROM Ebook ORDER BY RAND() LIMIT 4";
            var result = await execute_query(query, [], "select");
            // Get images from firebase
            var imagePromises = [];
            for (var i = 0; i < result[0].length; i++) {
                imagePromises.push(retrieveImageCarousel(result[0][i]));
            }
            var imageUrls = await Promise.all(imagePromises);
            return prepare_response(true, imageUrls, "Success to get books for firebase", "Error while retrieving books");
        }
    }
    catch (error) {
        console.error("Error during retrieve user:", error);
        return prepare_response(false, null, "Error during retrieve user", "Error while retrieving user");
    }



    const similarImageUrls = await Promise.all(similarImagePromises);
    return prepare_response(true, similarImageUrls, "Success to get books for firebase", "Error while retrieving books");

}

module.exports = {get_particular_books};