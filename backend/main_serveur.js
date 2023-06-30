const express = require("express");
const app = express();
const cors = require("cors");
//const port = 80;
const { port } = require("./controllers/Tools_controllers.js");

const firebase = require("./scripts/firebase_function.js");
// const new_user = require("./database/newUser.js");
const retrieveImage = firebase.retrieveImage;
const retrievePDF = firebase.retrievePDF;

// , req_book_details_show
const {
  req_listEbooks, req_book_details_show, req_book_details_mod,
  req_read_book, req_my_books, req_emprunt_dates, req_share_book
} = require("./controllers/Post_ebooks.js");
const {
  req_signIn,
  req_modifyMyAccount,
  req_signUp,
} = require("./controllers/Post_user.js");
const { req_new_book } = require("./controllers/Post_admin.js");
const { prepare_response } = require("./controllers/Tools_controllers");
const { books, get_particular_books } = require("./controllers/Get_ebooks");
const { get_user_datas } = require("./controllers/Get_user");

const { execute_query } = require("./database/Connection");


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
// Vérifie à chaque requête si le dossier public contient le fichier demandé
app.use(express.json()); // for parsing application/json

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
        req_listEbooks(datas.title, datas.category, datas.theme).then((result) => {
            res.header("Content-Type", "application/json");
            res.json(result);
        });


      /*
		list_books().then((result) => {
			if (result.length > 0) {
				res.header("Content-Type", "application/json");
				res.json([{ list: result }]);
			} 
			else {
				res.header("Content-Type", "application/json");
				res.json([{ message: "empty list" }]);
			}
		}); */
      break;

    case "/add_book": // COMPONENT: AddBook.vue
      // Retourne une réponse JSON
      //res.header("Content-Type", "application/json");
      req_new_book(
        req.body.title,
        req.body.author,
        req.body.date,
        req.body.language,
        req.body.editor,
        req.body.page,
        req.body.category,
        req.body.theme,
        req.body.biblio,
        req.body.description,
        req.body.img,
        req.body.pdf
      ).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
        /*
			if (result) {
				res.json([{ message: "book added" }]);
			}
			else {
				res.json([{ message: "book not added" }]);
			}*/
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


    case "/my_books": // COMPONENT: ?
      // Retourne une réponse JSON
      req_my_books(datas.email).then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result);
      });
      /*
		my_books(req.body.mail_client).then((result) => {
			if (result.length > 0) {
				res.header("Content-Type", "application/json");
				res.json([{ list: result }]);
			} else {
				res.header("Content-Type", "application/json");
				res.json([{ message: "empty list" }]);
			}
		});*/


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

    case "/book_details": // COMPONENT: ?
      	// Retourne une réponse JSON
        req_book_details_show(datas.idBook).then((result) => {
            res.header("Content-Type", "application/json");
            res.json(result);
            /*if(result.status == 'success' && sessionStorage.getItem('connected')==true){
              funct_to_read_PDF(result.donnees)
            }*/
        })

		break;
      
      case "/send_research_fromNavBar": //  VIEW: SearchBook, COMPONENT: SearchBookComponent
        req_listEbooks(datas.title).then((result) => {
            res.header("Content-Type", "application/json");
            res.json(result);
        });

      // Retourne une réponse JSON
      /*
      research(req.body.title).then((result) => {
        if (result.length > 0) {
			res.header("Content-Type", "application/json");
			res.json([{ list: result }]);
        } 
		else {
			res.header("Content-Type", "application/json");
			res.json([{ message: "no book found matching research" }]);
        }
      });*/

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

    case "/get_pdf_url": // VIEW: ?
      get_particular_books(undefined, "pdf").then((result) => {
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
    case "/get_new_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books(undefined, "image").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      /*
		res.header("Content-Type", "application/json");
		const newImagePromises = books.map((book) => retrieveImage(book));
		const newImageUrls = await Promise.all(newImagePromises);
		res.json(newImageUrls); */
      break;
    case "/get_current_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("current", "image").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      /*
        res.header("Content-Type", "application/json");
		const currentImagePromises = books.map((book) => retrieveImage(book));
		const currentImageUrls = await Promise.all(currentImagePromises);
		res.json(currentImageUrls); */
      break;
    case "/get_discover_books": // VIEW: MainPage
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      get_particular_books("discover", "image").then((result) => {
        res.header("Content-Type", "application/json");
        res.json(result.donnees);
      });
      /*
		res.header("Content-Type", "application/json");
		const discoverImagePromises = books.map((book) => retrieveImage(book));
		const discoverImageUrls = await Promise.all(discoverImagePromises);
		res.json(discoverImageUrls);*/
      break;

    case "/get_similar_books": // VIEW: BookDetails
      // Renvoie les images des livres en tant que réponse JSON venant de firebase
      /*
        get_particular_books("similar","image").then((result) => {
            res.header("Content-Type", "application/json");
            res.json(result.donnees);
        });*/

      res.header("Content-Type", "application/json");
      console.log("books : ", books);
      const similarImagePromises = books.map((book) => retrieveImage(book));
      const similarImageUrls = await Promise.all(similarImagePromises);
      res.json(similarImageUrls);
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
