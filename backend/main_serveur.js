const express = require("express");
const app = express();
const cors = require("cors");
//const port = 80;
const { port } = require("./controllers/Tools_controllers.js");

const firebase = require("./scripts/firebase_function.js");
// const new_user = require("./database/newUser.js");
const retrieveImage = firebase.retrieveImage;
const retrievePDF = firebase.retrievePDF;

const {
  req_listEbooks, req_books_details, req_book_details_mod,
  req_read_book, req_my_books, req_emprunt_dates, req_share_book,
  req_new_comment, req_delete_comment, get_comments_for_ebook
} = require("./controllers/Post_ebooks.js");
const {
  req_signIn,
  req_modifyMyAccount,
  req_signUp,
  BorrowBook,
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
      "Error of answer from server"
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

    case "/list_books": // VIEW: ?
      // Retourne une réponse JSON
      req_listEbooks(datas.researched_name, datas.category, datas.theme).then((result) => {
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

    case "/send_share_book": // COMPONENT: ShareBook.vue
      // Retourne une réponse JSON
      req_share_book(datas).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      })
      break;

    case '/share_book': // COMPONENT: ShareBook
      req_emprunt_dates(datas.email, datas.idBook).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      })
      break;

    case "/send_new_comment": // COMPONENT: Comment.vue
      // Retourne une réponse JSON
      req_new_comment(datas).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      })
      break;

    case "/delete_comment": // COMPONENT: Comment.vue
      // Retourne une réponse JSON
      req_delete_comment(datas).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      })
      break;

    case "/recup_comments_for_ebook": // COMPONENT: Comment.vue
      // Retourne une réponse JSON
      get_comments_for_ebook(datas).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      })
      break;


    case "/my_books": // COMPONENT: ?
      // Retourne une réponse JSON
      console.log(req.body)
      req_my_books(req.body.email).then((result) => { //req.body.mail_client
        console.log(result)
        res.header("Content-Type", "application/json");
        res.json(result);

      })
      break;
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


    case "/read_book": // COMPONENT: ?
      // Retourne une réponse JSON
      req_read_book(datas.email, datas.idBook).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);

        if(result.status == 'success'){
          funct_to_read_PDF(result.donnees)
        }
      })

      break;

    case "/send_research_fromNavBar": //  VIEW: SearchBook, COMPONENT: SearchBookComponent
      req_listEbooks(datas.researched_name, datas.category, datas.theme).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      break;

    case "/post_particular_book_url": //  VIEW: SearchBook, COMPONENT: SearchBookComponent
      req_listEbooks(datas.researched_name, datas.category, datas.theme).then((result) => {
        console.log("result partiel ?", [result.donnees])
        res.header("Content-Type", "application/json");
        /*return */ res.json(result);
        /*get_particular_books(result).then((finalresult) => {
          res.header("Content-Type", "application/json");
          res.json(finalresult);
        });*/
      }); /*.then((jisonnedResp) => {
          console.log("result jisonned ?", [jisonnedResp])
          return jisonnedResp;
        }); */
      break;

    case "/borrow":
      BorrowBook(datas.book_id,datas.user_mail,datas.fin_emprunt,datas.debut_emprunt,datas.marquepage).then((result)=> {
        console.log("result partiel ?", [result.donnees])
        res.header("Content-Type", "application/json");
        res.json(result);
    });
      break;

    default:
      response_funct.messageFail = "Erreur d'URL pour la requête POST";
      res.status(404).json(response_funct);
      break;
  }
  //res.header("Content-Type", "application/json");
  //res.json(response_funct);
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
      /*
		res.header("Content-Type", "application/json");
		console.log("books : ", books);
		const imagePromises = books.map((book) => retrieveImage(book));
		const imageUrls = await Promise.all(imagePromises);
		res.json(imageUrls);*/
      break;

    case "/get_pdf_url": // VIEW: MainPage
      get_particular_books("undefined", "pdf").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      /*
		res.header("Content-Type", "application/json");
		console.log("books : ", books);
		const pdfPromises = books.map((book) => retrieveImage(book));
		const pdfUrls = await Promise.all(pdfPromises);
		res.json(pdfUrls);*/
      break;
      /*
    case "/get_new_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books(undefined, "image").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });

      break;
    case "/get_current_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("current", "image").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });

      break;
    case "/get_discover_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("discover", "image").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });

      break;

    case "/get_similar_books": // VIEW: BookDetails
      // Renvoie les images des livres en tant que réponse JSON venant de firebase


      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const similarImagePromises = books.map((book) => retrieveImage(book));
      const similarImageUrls = await Promise.all(similarImagePromises);
      res.json(similarImageUrls);
      break;
      */

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
