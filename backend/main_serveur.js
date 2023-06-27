const express = require("express");
const app = express();
const cors = require("cors");
const port = 80;

const firebase = require("./scripts/firebase_function.js");
const new_user = require("./database/newUser.js");
const retrieveImage = firebase.retrieveImage;
const retrievePDF = firebase.retrievePDF;
//import { verify_signIn } from './database/authBDD.js';
//require('./database/authBDD.js')
const requete = require("./database/requete.js");
const verify_signIn = requete.verify_signIn;
const list_books = requete.list_books;
const my_books = requete.my_books;
const research = requete.research;
const new_book = requete.new_book;
const sign_up = requete.sign_up;
const connectToDatabase = requete.connectToDatabase;

const connection = connectToDatabase();
//const { my_books } = require("./database/myEbooks");
//const { research } = require("./database/research");
//const {execute_query} = require("./database/Connection");


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

app.post("*", async (req, res) => {
  const datas = req.body;
  var response_funct = {};

  switch (req.originalUrl) {
    case "/modify_myAccount": // Récupérer les données envoyées par le composant MyAccount.vue
      response_funct = req_modifyMyAccount(datas);
      break;

    case "/send_signUp":
      // Retourne une réponse JSON
      res.header("Content-Type", "application/json");
      await sign_up(req.body.email, req.body.pseudo, req.body.password).then(
        (result) => {
          if (result) {
            res.json([
              { message: "Inscription réussie !" },
              { donnees: req.body },
            ]);
          } else {
            res.json([
              { message: "Inscription échouée !" },
              { donnees: req.body },
            ]);
          }
        }
      );
    break;

    case "/send_login":
      // Retourne une réponse JSON
      res.header("Content-Type", "application/json");
      verify_signIn(req.body.email, req.body.password).then((result) => {
        if (result) {
          res.json([
            { message: "Authentification réussie !" },
            { donnees: req.body },
          ]);
        } else {
          res.json([
            { message: "Authentification échouée !" },
            { donnees: req.body },
          ]);
        }
      });

    break;

    case "/list_books":
		// Retourne une réponse JSON
		list_books().then((result) => {
			if (result.length > 0) {
				res.header("Content-Type", "application/json");
				res.json([{ list: result }]);
			} 
			else {
				res.header("Content-Type", "application/json");
				res.json([{ message: "empty list" }]);
			}
		});
    break;

	case "/add_book":
		// Retourne une réponse JSON
		res.header("Content-Type", "application/json");
		new_book(req.body.title, req.body.author, req.body.date, req.body.language, 
			req.body.editor, req.body.page, req.body.category, req.body.theme, 
			req.body.biblio, req.body.description, req.body.img, req.body.pdf).then((result) => {
			if (result) {
				res.json([{ message: "book added" }]);
			}
			else {
				res.json([{ message: "book not added" }]);
			}
		});

    case "/my_books":
      	// Retourne une réponse JSON
		my_books(req.body.id_client).then((result) => {
			if (result.length > 0) {
				res.header("Content-Type", "application/json");
				res.json([{ list: result }]);
			} else {
				res.header("Content-Type", "application/json");
				res.json([{ message: "empty list" }]);
			}
		});

		break;
      
    case "/search":
      // Retourne une réponse JSON
      research(req.body.title).then((result) => {
        if (result.length > 0) {
			res.header("Content-Type", "application/json");
			res.json([{ list: result }]);
        } 
		else {
			res.header("Content-Type", "application/json");
			res.json([{ message: "no book found matching research" }]);
        }
      });

      break;

    case "/send_login_forgotMdp":
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
      response_funct = { message: "Erreur d'URL pour la méthode POST" };
      res.status(404).json({ message: "Erreur d'URL pour la méthode POST" });
      break;
  }
});

// Vérifie si la requête est une requête GET
app.get("*", async (req, res) => {
  switch (req.originalUrl) {
     case "/test_sql":
        // Renvoie les éléments en tant que réponse JSON
        execute_query('SELECT * FROM Ebook', [], "select").then((result) => {
            res.header("Content-Type", "application/json");
            res.json(result);
        });
        break;

    case "/datas_user":
      // Inclure et exécuter le fichier elements_to_send.js
      // Exemple de données à exporter
      const elements = {
        pseudo: "Ethor",
        genre: "homme",
        email: "ethansuissa@efrei.net",
        birthdate: "2002-08-05",
        books: 1,
      };
    case "/send_research_fromNavBar":
		// Renvoie les éléments en tant que réponse JSON
		// Utilisez les éléments importés ici selon vos besoins
		res.header("Content-Type", "application/json");
		res.json(req.body);
		break;
    case "/get_books_url":
		// Renvoie les images des livres en tant que réponse JSON venant de firebase
		res.header("Content-Type", "application/json");
		console.log("books : ", books);
		const imagePromises = books.map((book) => retrieveImage(book));
		const imageUrls = await Promise.all(imagePromises);
		res.json(imageUrls);
		break;
    case "/get_pdf_url":
		// Renvoie les images des livres en tant que réponse JSON venant de firebase
		res.header("Content-Type", "application/json");
		console.log("books : ", books);
		const pdfPromises = books.map((book) => retrieveImage(book));
		const pdfUrls = await Promise.all(pdfPromises);
		res.json(pdfUrls);
		break;
    case "/get_new_books":
		// Renvoie les images des livres en tant que réponse JSON venant de firebase
		res.header("Content-Type", "application/json");
		const newImagePromises = books.map((book) => retrieveImage(book));
		const newImageUrls = await Promise.all(newImagePromises);
		res.json(newImageUrls);
		break;
    case "/get_current_books":
		// Renvoie les images des livres en tant que réponse JSON venant de firebase
		res.header("Content-Type", "application/json");
		const currentImagePromises = books.map((book) => retrieveImage(book));
		const currentImageUrls = await Promise.all(currentImagePromises);
		res.json(currentImageUrls);
		break;
    case "/get_discover_books":
		// Renvoie les images des livres en tant que réponse JSON venant de firebase
		res.header("Content-Type", "application/json");
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
