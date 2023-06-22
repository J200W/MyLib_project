const express = require('express');
const app = express();
const cors = require('cors');
const port = 80;
//import { verify_signIn } from './database/authBDD.js';
//require('./database/authBDD.js')
const { verify_signIn } = require("./database/authBDD");
const { modify_myAccount } = require("./controllers/funct_user");
const { list_books } = require("./database/listBooks");
const { new_user } = require("./database/newUser");
const { my_books } = require("./database/myEbooks");
const { research } = require("./database/research");
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


app.use(cors({
    methods: ['GET', 'POST'] // Spécifiez uniquement les méthodes nécessaires
    , allowedHeaders: ['Authorization', 'Content-Type'] // Ajoutez vos en-têtes personnalisés
}));
// Vérifie à chaque requête si le dossier public contient le fichier demandé
app.use(express.json()); // for parsing application/json

// Vérifie si la requête est une requête POST
app.post('*', (req, res) => {
    const datas = req.body;
    var response_funct = {};

    switch (req.originalUrl) {
        case '/modify_myAccount': // Récupérer les données envoyées par le composant MyAccount.vue
            response_funct = modify_myAccount(datas);
            break;

        case '/send_signIn':
            // Retourne une réponse JSON
            res.header('Content-Type', 'application/json');
            res.json([{ message: 'Données reçues avec succès for' + req.originalUrl + 'from test_serveur.php !' }, { donnees: req.body }]);
            break;

        case '/send_login':
            // Retourne une réponse JSON
            verify_signIn(req.body.email, req.body.password).then((result) => {
                if (result) {
                    res.header('Content-Type', 'application/json');
                    res.json([{ message: 'Authentification réussie !' }, { donnees: req.body }]);
                } else {
                    res.header('Content-Type', 'application/json');
                    res.json([{ message: 'Authentification échouée !' }, { donnees: req.body }]);
                }
            });

            break;

            case '/send_signUp':
            // Retourne une réponse JSON
            new_user(req.body.email, req.body.name, req.body.fname, req.body.password).then((result) => {
                if (result) {
                    res.header('Content-Type', 'application/json');
                    res.json([{ message: 'Account created successfully !' }, { donnees: req.body }]);
                } else {
                    res.header('Content-Type', 'application/json');
                    res.json([{ message: 'Account creation failed !' }, { donnees: req.body }]);
                }
            });

            break;

            case '/list_books':
                // Retourne une réponse JSON
                list_books().then((result) => {
                    if (result.length>0) {
                        res.header('Content-Type', 'application/json');
                        res.json([{ list: result }]);
                    } else {
                        res.header('Content-Type', 'application/json');
                        res.json([{ message: 'empty list' }]);
                    }
                });
    
                break;

            case '/my_books':
                // Retourne une réponse JSON
                my_books(req.body.id_client).then((result) => {
                    if (result.length>0) {
                        res.header('Content-Type', 'application/json');
                        res.json([{ list: result }]);
                    } else {
                        res.header('Content-Type', 'application/json');
                        res.json([{ message: 'empty list' }]);
                    }
                });
    
                break;

                case '/search':
                    // Retourne une réponse JSON
                    research(req.body.title).then((result) => {
                        if (result.length>0) {
                            res.header('Content-Type', 'application/json');
                            res.json([{ list: result }]);
                        } else {
                            res.header('Content-Type', 'application/json');
                            res.json([{ message: 'no book found matching research' }]);
                        }
                    });
        
                    break;

        case '/send_login_forgotMdp':
            // Retourne une réponse JSON
            res.header('Content-Type', 'application/json');
            res.json([{ message: 'Données reçues avec succès from test_serveur.php !' }, { donnees: req.body }]);
            break;
        case '/send_research_fromNavBar':
            // Renvoie les éléments en tant que réponse JSON
            // Utilisez les éléments importés ici selon vos besoins
            res.header('Content-Type', 'application/json');
            res.json(req.body);
            break;
        default:
            response_funct = { message: 'Erreur d\'URL pour la méthode POST'}
            res.status(404).json({ message: 'Erreur d\'URL pour la méthode POST' });
            break;
    }
    res.header('Content-Type', 'application/json');
    res.json(response_funct);
});

// Vérifie si la requête est une requête GET
app.get('*', (req, res) => {
    switch (req.originalUrl) {
        case '/datas_user':
            // Inclure et exécuter le fichier elements_to_send.js
            // Exemple de données à exporter
            const elements = {
                pseudo: "Ethor",
                genre: "homme",
                email: "ethansuissa@efrei.net",
                birthdate: "2002-08-05",
                books: 1
            };

            // Renvoie les éléments en tant que réponse JSON
            res.json(elements);
            break;
        case '/send_research_fromNavBar':
            // Renvoie les éléments en tant que réponse JSON
            // Utilisez les éléments importés ici selon vos besoins
            res.header('Content-Type', 'application/json');
            res.json(req.body);
            break;

        case '/books_for_main_page':
            // Renvoie les éléments en tant que réponse JSON
            // Utilisez les éléments importés ici selon vos besoins

            const images = [
                {
                    id: 1,
                    src: "@/assets/onepiece96.png",
                    title: "One Piece 96",
                },

                {
                    id: 2,
                    src: "@/assets/onepiece97.png",
                    title: "One Piece 97",
                },

                {
                    id: 3,
                    src: "@/assets/onepiece98.png",
                    title: "One Piece 98",
                },

                {
                    id: 4,
                    src: "@/assets/onepiece99.png",
                    title: "One Piece 99",
                }
            ]

            res.header('Content-Type', 'application/json');
            res.json(images);
            break;




        default:
            res.status(404).json({ message: 'Erreur d\'URL pour la méthode GET' + req.originalUrl.toString() });
            break;

    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});