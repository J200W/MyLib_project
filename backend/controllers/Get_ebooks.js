const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrievePDF} = require("../scripts/firebase_function");
var books = [
    {
        id: 1,
        title: "One Piece 96",
        src: "onepiece96.png",
        author: "Eiichiro Oda",
        library: "Bibliothèque de l'Université de Lille",
        theme: "Manga1",
        genre: "Shonen",
        date: "2020-12-16",
        edition: "Glénat",
        language: "Français",
        pdf: "onepiece96.pdf",
        pages: 192,
        description:
            "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
    },
    {
        id: 2,
        title: "One Piece 97",
        src: "onepiece97.png",
        author: "Eiichiro Oda",
        library: "Bibliothèque de l'Université de Lille",
        theme: "Manga2",
        genre: "Shonen",
        date: "2021-02-17",
        edition: "Glénat",
        language: "Français",
        pdf: "onepiece97.pdf",
        pages: 192,
        description:
            "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
    },
    {
        id: 3,
        title: "One Piece 98",
        src: "onepiece98.png",
        author: "Eiichiro Oda",
        library: "Bibliothèque de l'Université de Lille",
        theme: "Manga3",
        genre: "Shonen",
        date: "2021-04-21",
        edition: "Glénat",
        language: "Français",
        pdf: "onepiece98.pdf",
        pages: 192,
        description:
            "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
    },
    {
        id: 4,
        title: "One Piece 99",
        src: "onepiece99.png",
        author: "Eiichiro Oda",
        library: "Bibliothèque de l'Université de Lille",
        theme: "Manga4",
        genre: "Shonen",
        date: "2021-06-16",
        edition: "Glénat",
        pdf: "onepiece99.pdf",
        language: "Français",
        pages: 192,
        description:
            "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
    },
];

async function get_particular_books(particularity="current", email="") {
    // Retourne une réponse JSON

    try {

        if (particularity === "current"){
            var query = "SELECT id_ebook FROM emprunter where mail_Clients = ? AND fin_emprunt > NOW() AND stock_emprunt = 1";

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
        } else if (particularity === "new") {
            var query = "SELECT * FROM Ebook ORDER BY id_ebook DESC LIMIT 4";
            var result = await execute_query(query, [], "select");
            // Get images from firebase
            var imagePromises = [];
            for (var i = 0; i < result[0].length; i++) {
                imagePromises.push(retrieveImageCarousel(result[0][i]));
            }
            var imageUrls = await Promise.all(imagePromises);
            return prepare_response(true, imageUrls, "Success to get books for firebase", "Error while retrieving books");
        } else if (particularity === "discover") {
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
        else if (particularity === "library") {
            // Fetch books added by admin of the same library
            var query = "SELECT * FROM Ebook WHERE id_Biblio IN (SELECT mail_admin FROM Admin_Biblio WHERE mail_admin = ?)";
        }
    }
    catch (error) {

        console.error("Error during retrieve user:", error);
        return prepare_response(false, null, "Error during retrieve user", "Error while retrieving user");
    }
}

async function get_particular_books_V0(books, particularity="current", type="image"){
    // Retourne une réponse JSON

    var similarImagePromises = books.map((book) => retrieveImage(book));
    if (type === "pdf1"){ // A REMPLACER PAR "PDF": blocage le temps que ca marche
        similarImagePromises = books.map((book) => retrievePDF(book));
    }

    const similarImageUrls = await Promise.all(similarImagePromises);
    return prepare_response(true, similarImageUrls, "Success to get books for firebase", "Error while retrieving books");

}

module.exports = {books, get_particular_books};