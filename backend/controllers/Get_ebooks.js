const {prepare_response} = require("./Tools_controllers");
const {retrieveImage, retrievePDF} = require("../scripts/firebase_function");
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

async function get_particular_books(particularity="current", type="image"){
    // Retourne une réponse JSON

    var similarImagePromises = books.map((book) => retrieveImage(book));
    if (type === "pdf1"){ // A REMPLACER PAR "PDF": blocage le temps que ca marche
        similarImagePromises = books.map((book) => retrievePDF(book));
    }

    const similarImageUrls = await Promise.all(similarImagePromises);
    return prepare_response(true, similarImageUrls, "Success to get books for firebase", "Error while retrieving books");

}

module.exports = {books, get_particular_books};