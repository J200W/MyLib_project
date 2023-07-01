const express = require("express");
const app = express();
const cors = require("cors");
//const port = 8090
const { port } = require("./controllers/Tools_controllers.js");

const firebase = require("./scripts/firebase_function.js");
// const new_user = require("./database/newUser.js");
const retrieveImage = firebase.retrieveImage;
const retrievePDF = firebase.retrievePDF;

const {
  req_listEbooks,
  req_my_books,
  req_books_details,
  req_get_pdf,
} = require("./controllers/Post_ebooks.js");
const {
  req_signIn,
  req_modifyMyAccount,
  req_signUp,
  req_borrowed,
} = require("./controllers/Post_user.js");
const {
  req_new_book,
  req_upload_book_pdf,
  req_upload_book_img,
} = require("./controllers/Post_admin.js");
const { prepare_response } = require("./controllers/Tools_controllers");
const { books, get_particular_books } = require("./controllers/Get_ebooks");
const { get_user_datas } = require("./controllers/Get_user");

const { execute_query } = require("./database/Connection");

// Create the Multer middleware using the MemoryStorage

/*
const requete = require("./database/requete.js");
const verify_signIn = requete.verify_signIn;
const list_books = requete.list_books;
const my_books = requete.my_books;
const research = requete.research;
const new_book = requete.new_book;
const sign_up = requete.sign_up;
const connectToDatabase = requete.connectToDatabase; */

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

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// Vérifie à chaque requête si le dossier public contient le fichier demandé
app.use(express.json()); // for parsing application/json
// for parsing files

app.post("*", async (req, res) => {
  const datas = req.body;
  var response_funct = prepare_response(
    false,
    datas,
    undefined,
    "Erreur de réponse du serveur"
  );
  //console.log(datas, response_funct)

  switch (req.originalUrl) {
    case "/modify_myAccount": // COMPONENT MyAccount.vue
      req_modifyMyAccount(datas).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/req_datas_user": // VIEW: MyAccount
      get_user_datas(datas.email).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/send_signUp": // VIEW: SignUp.vue
      req_signUp(datas.email, datas.pseudo, datas.password).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/send_login": // VIEW: Login
      req_signIn(datas.email, datas.password, datas.admin).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/list_books": // VIEW: ?
      // Retourne une réponse JSON
      req_listEbooks(datas.search, datas.category, datas.theme, datas.sort_filter).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });

      break;

    case "/add_book": // COMPONENT: AddBook.vue
      // Retourne une réponse JSON
      //res.header("Content-Type", "application/json");
      req_new_book(
        datas.title,
        datas.author,
        datas.date,
        datas.language,
        datas.editor,
        datas.page,
        datas.category,
        datas.theme,
        datas.description,
        datas.img,
        datas.pdf,
        datas.admin,
        datas.stock
      ).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/upload_book_pdf": // COMPONENT: AddBookComp.vue
      // Retourne une réponse JSON
      // For uploading pdf files only
      req_upload_book_pdf(datas.pdf, datas.name).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/upload_book_img": // COMPONENT: AddBookComp.vue
      // Retourne une réponse JSON
      // For uploading images files only
      req_upload_book_img(datas.img, datas.name).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/my_books": // COMPONENT: MyBooks.vue
      // Retourne une réponse JSON
      req_my_books(datas.email).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });

    case "/new_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("new", datas.email).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      break;
    case "/current_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("current", datas.email).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      break;
    case "/discover_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("discover", datas.email).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      break;

    case "/similar_books": // VIEW: BookDetails
      res.header("Content-Type", "application/json");
      res.json([{ list: datas.list }]);
      break;

    case "/book_details": // VIEW: BookDetails
      // Retourne une réponse JSON
      req_books_details(datas.id_ebook).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/send_research_fromNavBar": //  VIEW: SearchBook, COMPONENT: SearchBookComponent
      req_listEbooks(datas.search).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;
    
    case "/get_pdf":
      req_get_pdf(datas.id_ebook).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/send_login_forgotMdp": // COMPONENT: ForgottenPassword
      // Retourne une réponse JSON
      res.header("Content-Type", "application/json");
      res.json(
        prepare_response(
          false,
          datas,
          undefined,
          "Pas de forgotMdp géré pour le moment"
        )
      );
      break;
    
      case "/borrowed":
        res.header("Content-Type", "application/json");
        req_borrowed(datas.email, datas.id_ebook).then((result) => {
          res.json(result);
        });
        break;

    default:
      response_funct.messageFail = "Erreur d'URL pour la requête POST";
      res.status(404).json(response_funct);
      break;
  }
});

// Vérifie si la requête est une requête GET
app.get("*", async (req, res) => {
  var datas = req.body;
  var response_funct = prepare_response(
    false,
    datas,
    undefined,
    "Erreur de réponse du serveur pour GET"
  );

  switch (req.originalUrl) {
    case "/test_sql": // VIEW: Nothing
      // Renvoie les éléments en tant que réponse JSON
      execute_query("SELECT * FROM Ebook", [], "select").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(
          prepare_response(true, result, undefined, "Requête SQL réussie")
        );
      });
      break;

    case "/send_research_fromNavBar": // VIEW: SearchBook, COMPONENT: SearchBookComponent
      // Renvoie les éléments en tant que réponse JSON
      res.header("Content-Type", "application/json");
      res.json(
        prepare_response(
          datas,
          datas,
          "datas posted found",
          "datas posted not found"
        )
      );
      break;

    case "/get_books_url": // VIEW: SearchBook
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books(undefined, "url").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      break;

    default:
      response_funct.messageFail = "Erreur d'URL pour la requête GET";
      res.status(404).json(response_funct);
      break;
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
