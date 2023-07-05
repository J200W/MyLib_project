// A METTRE DANS APP.POST

const {req_share_book, req_emprunt_dates} = require("../backend/controllers/Post_ebooks");
case "/send_share_book": // COMPONENT: ShareBook.vue
// Retourne une réponse JSON
req_share_book(datas).then((result) => {
    res.header("Content-Type", "application/json");
    res.json(result);
})
break;

case '/get_emprunt_dates': // COMPONENT: ShareBook
req_emprunt_dates(datas.user_email, datas.id_ebook).then((result) => {
    res.header("Content-Type", "application/json");
    res.json(result);
})
break;