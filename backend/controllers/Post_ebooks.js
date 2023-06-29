
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");
const mysql = require("mysql2/promise");

async function req_listEbooks(title, category, theme){
    // Retourne une réponse JSON
    categoryList = category
    themeList = theme
    query = 'SELECT * FROM Ebook'
    if(categoryList.length>0 ){
        query = query + ' JOIN est_un on est_un.id_ebook=Ebook.id_ebook'
    }if(themeList.length>0){
        query = query + ' JOIN parle_de on parle_des.id_ebook=Ebook.id_ebook'
    }
    if(title.length>0){
        query = query + " WHERE titre LIKE CONCAT('%', ?, '%')"
    }
    else if(categoryList.length>0 ){
        query = query + ' WHERE category = ?'
        categoryList.pop()
    }else if(themeList.length>0){
        query = query + ' WHERE theme = ?'
        themeList.pop()
    }
    while (categoryList.length > 0){
        query = query + ' AND category = ?'
        categoryList.pop()
    }
    while (themeList.length > 0){
        query = query + ' AND theme = ?'
        themeList.pop()
    }
    let result = await execute_query(query, [title, category, theme], "select")
    return prepare_response(result, result, 'filled list', 'empty list');

}

/*async function req_research(title) {
    try {
        const query = "SELECT * FROM Ebook WHERE titre LIKE CONCAT('%', ?, '%')" //"SELECT * FROM Ebook WHERE titre LIKE '%" + title + %'";
        const [result] = await execute_query(query, [title], "select");
        return prepare_response(result.length > 0, result, 'Résultats de recherche obtenu', 'Pas de résultats de recherche');

    } catch (error) {
        console.error("Error during research:", error);
        return prepare_response(false, [title], undefined, 'Erreur du serveur pour la recherche');
    }
}*/

async function req_my_books(id_client) {
    try {

        const query = "SELECT * FROM emprunter WHERE mail_Clients=?";
        const [rows] = await execute_query(query, [id_client], "select");
        return prepare_response(rows.length > 0, rows, 'Livres empruntés trouvés', 'Pas de livres empruntés trouvés');
    } catch (error) {
        console.error("Error listing books:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}


async function req_read_book(id_client, id_book){
    try {

        const query = "SELECT * FROM emprunter WHERE mail_Clients=? AND id_Ebook=?";
        const [rows] = await execute_query(query, [id_client, id_book], "select");
        return prepare_response(rows.length > 0, rows, 'Book borrowed, allowed to read', 'Not borrowed, unable to read');
    } catch (error) {
        console.error("Error checking if book is readable:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function req_book_details_show(id_book){
    try {

        const query = "SELECT * FROM Ebook WHERE id_Ebook=?";
        const [rows] = await execute_query(query, [id_book], "select");
        return prepare_response(rows.length > 0, rows, 'Book found', 'Book not found');
    } catch (error) {
        console.error("Error searching for particular book:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function req_book_details_mod(id_book, title, author, date, language, editor, nb_pages, name_img, name_pdf, id_biblio){
    try {

        const query = "UPDATE Ebook SET titre=? auteur=? date_parution=? langue=? editeur=? nb_pages=? name_img=? name_pdf=? id_Biblio=? WHERE id_Ebook=?";
        const [rows] = await execute_query(query, [title, author, date, language, editor, nb_pages, name_img, name_pdf, id_biblio, id_book], "select");
        return prepare_response(rows.length > 0, rows, 'Book found', 'Book not found');
    } catch (error) {
        console.error("Error searching for particular book:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}


// =========================================================
// EXPORTATIONS
module.exports = { req_listEbooks, req_my_books, req_read_book, req_book_details_show, req_book_details_mod };