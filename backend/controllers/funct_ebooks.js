
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");

function listEbooks(reqBody){
    // Retourne une réponse JSON
    category = reqBody.category
    theme = reqBody.theme
    query = 'SELECT * FROM Ebook'
    if(category.length>0 ){
        query = query + ' WHERE category = ?'
        category.pop()
    }else if(theme.length>0){
        query = query + ' WHERE theme = ?'
        theme.pop()
    }
    while (category.length > 0){
        query = query + ' AND category = ?'
        category.pop()
    }
    while (theme.length > 0){
        query = query + ' AND theme = ?'
        theme.pop()
    }
    execute_query(query, reqBody, "select").then((result) => { //ATTENTION AA L'ORDRE D'ENVOIE DES PARAMS !!! LA REQUETE DOIT AVOIR LA CATEGORIE EN PREMIER
        return prepare_response(result, 'filled list', 'empty list', reqBody);
    });

}




// =========================================================
// EXPORTATIONS
module.exports = { listEbooks };