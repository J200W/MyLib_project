
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");
const mysql = require("mysql2/promise");

async function req_listEbooks(reqBody){
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
    let result = await execute_query(query, reqBody, "select")
    return prepare_response(result, result, 'filled list', 'empty list');

}

async function req_research(title) {
    try {
        const query = "SELECT * FROM Ebook WHERE titre LIKE CONCAT('%', ?, '%')" //"SELECT * FROM Ebook WHERE titre LIKE '%" + title + %'";
        const [result] = await execute_query(query, [title], "select");
        return prepare_response(result.length > 0, result, 'Résultats de recherche obtenu', 'Pas de résultats de recherche');

    } catch (error) {
        console.error("Error during research:", error);
        return prepare_response(false, [title], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function req_my_books(id_client) {
    try {

        const query = "SELECT * FROM Emprunter WHERE mail_Client=?";
        const [rows] = await execute_query(query, [id_client], "select");
        return prepare_response(rows.length > 0, rows, 'Livres empruntés trouvés', 'Pas de livres empruntés trouvés');
    } catch (error) {
        console.error("Error listing books:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}



// =========================================================
// EXPORTATIONS
module.exports = { req_listEbooks, req_research, req_my_books };