const express = require("express");
const app = express();
const cors = require("cors");
const port = 80;

const firebase = require("./scripts/firebase_function.js");
const retrieveImage = firebase.retrieveImage;
const retrievePDF = firebase.retrievePDF;

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
    pages: 192,
    description: "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
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
    pages: 192,
    description: "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
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
    pages: 192,
    description: "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",

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
    language: "Français",
    pages: 192,
    description: "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
  },
];

/*
const bodyParser = require('body-parser');

// Middleware pour parser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); */

// MIDDLEWARE : fonction de prétraitement de requête (avant app.get out app.post)
// app.use : active un middleware sur toutes requêtes entrantes
//app.use(express.static('../frontend/src/views'));
// Configurer le middleware pour servir les fichiers statiques
//app.use('/components', express.static('@/frontend/src/components'));
//app.use('/views', express.static('@/frontend/src/views'));

app.use(
  cors({
    methods: ["GET", "POST"], // Spécifiez uniquement les méthodes nécessaires
    allowedHeaders: ["Authorization", "Content-Type"], // Ajoutez vos en-têtes personnalisés
  })
);
// Vérifie à chaque requête si le dossier public contient le fichier demandé
app.use(express.json()); // for parsing application/json

// Vérifie si la requête est une requête POST
app.post("*", async (req, res) => {
  switch (req.originalUrl) {
    case "/test_recup.php":
      // Inclure et exécuter le fichier test_recup.js
      //require('./test_recup.js')(req, res);
      // Récupérer les données envoyées par le composant MyAccount.vue
      const data = req.body;

      // Vérifier si des données ont été envoyées
      if (data) {
        // Vous pouvez accéder aux données envoyées depuis le composant ici
        const pseudo = data.pseudo;
        const genre = data.genre;
        // ...

        // Faites quelque chose avec les données reçues, comme les enregistrer dans une base de données, les traiter, etc.

        // Exemple de réponse renvoyée au composant
        const response = {
          status: "success",
          message: `Données reçues avec succès from test_recup.php : ${pseudo} ${genre}`,
        };
        res.json(response);
      } else {
        // Aucune donnée n'a été envoyée
        const response = {
          status: "error",
          message: "Aucune donnée reçue.",
        };
        res.json(response);
      }

      break;
    case "/send_login":
      // Retourne une réponse JSON
      res.header("Content-Type", "application/json");
      res.json([
        { message: "Données reçues avec succès from test_serveur.php !" },
        { donnees: req.body },
      ]);

      break;
    case "/send_research_fromNavBar":
      // Renvoie les éléments en tant que réponse JSON
      // Utilisez les éléments importés ici selon vos besoins
      res.header("Content-Type", "application/json");
      res.json(req.body);
      break;
    default:
      res.status(404).json({ message: "Erreur d'URL pour la méthode POST" });
      break;
  }
});

// Vérifie si la requête est une requête GET
app.get("*", async (req, res) => {
  switch (req.originalUrl) {
    case "/elements_to_send.php":
      // Inclure et exécuter le fichier elements_to_send.js
      // Exemple de données à exporter
      const elements = {
        pseudo: "Ethor",
        genre: "homme",
        email: "ethansuissa@efrei.net",
        birthdate: "2002-08-05",
        books: 1,
      };

      // Renvoie les éléments en tant que réponse JSON
      res.json(elements);
      break;
    case "/send_research_fromNavBar":
      // Renvoie les éléments en tant que réponse JSON
      // Utilisez les éléments importés ici selon vos besoins
      res.header("Content-Type", "application/json");
      res.json(req.body);
      console.log("req.body : ", req.body);
      break;
    case "/get_books_url":
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const imagePromises = books.map((book) => retrieveImage(book));
      const imageUrls = await Promise.all(imagePromises);
      res.json(imageUrls);
      break;
    case "/get_new_books":
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const newImagePromises = books.map((book) => retrieveImage(book));
      const newImageUrls = await Promise.all(newImagePromises);
      res.json(newImageUrls);
      break;
    case "/get_current_books":
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const currentImagePromises = books.map((book) => retrieveImage(book));
      const currentImageUrls = await Promise.all(currentImagePromises);
      res.json(currentImageUrls);
      break;
    case "/get_discover_books":
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const discoverImagePromises = books.map((book) => retrieveImage(book));
      const discoverImageUrls = await Promise.all(discoverImagePromises);
      res.json(discoverImageUrls);
      break;

    case "/get_similar_books":
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const similarImagePromises = books.map((book) => retrieveImage(book));
      const similarImageUrls = await Promise.all(similarImagePromises);
      res.json(similarImageUrls);
      break;

    default:
      res.status(404).json({ message: "Erreur d'URL pour la méthode GET" });
      break;
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
