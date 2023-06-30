
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, retrievePDF} = require("../scripts/firebase_function");
const mysql = require("mysql2/promise");

async function req_listEbooks(reqBody){
    // Retourne une réponse JSON
    var category = reqBody.category
    var theme = reqBody.theme
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


async function req_books_details(id_ebook) {
    try {
        var query = "SELECT * FROM Ebook WHERE id_ebook=?";
        const [rows] = await execute_query(query, [id_ebook], "select");
        const image = await retrieveImageCarousel(rows[0]);
        const theme = await get_category_theme(id_ebook, "theme");
        const category = await get_category_theme(id_ebook, "category");
        const library = await get_biblio(rows[0].id_Biblio);
        const books = {
            id_ebook: rows[0].id_ebook,
            titre: rows[0].titre,
            src: image.src,
            author: rows[0].auteur,
            theme: theme.donnees,
            category: category.donnees,
            description: rows[0].description,
            edition: rows[0].editeur,
            date: rows[0].date_parution,
            language: rows[0].langue,
            pages: rows[0].nb_pages,
            library: library.donnees,
        }
        return prepare_response(rows.length > 0, books, 'Book found', 'Book not found');
    } catch (error) {
        console.error("Error listing books:", error);
        return prepare_response(false, [id_ebook], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function get_category_theme(id_ebook, name) {
    try {
        if (name == "category") var query = "SELECT name_category FROM est_un WHERE id_ebook=?";
        else var query = "SELECT name_theme FROM parle_de WHERE id_ebook=?";

        const [rows] = await execute_query(query, [id_ebook], "select");
        // convert rows to array using map
        var array = [];

        rows.map((row) => {
            if (name == "category") array.push(row.name_category);
            else array.push(row.name_theme);
        });
        return prepare_response(rows.length > 0, array, 'Categories or Theme found', 'Categories not found');
    } catch (error) {
        console.error("Error listing categories:", error);
        return prepare_response(false, [], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function get_biblio(id_Biblio) {
    try {
        const query = "SELECT bibliotheque FROM Admin_biblio WHERE mail_admin=?";
        const [rows] = await execute_query(query, [id_Biblio], "select");
        return prepare_response(rows.length > 0, rows[0].bibliotheque, 'Bibliotheque found', 'Bibliotheque not found');
    } catch (error) {
        console.error("Error listing bibliotheque:", error);
        return prepare_response(false, [id_Biblio], undefined, 'Erreur du serveur pour la recherche');
    }
}

// =========================================================
// EXPORTATIONS
module.exports = { req_listEbooks, req_research, req_my_books, req_books_details };