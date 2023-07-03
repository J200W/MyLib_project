
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, readPDF, retrieveImage} = require("../scripts/firebase_function");
const mysql = require("mysql2/promise");

async function req_listEbooks(title, category="", theme="", sort_filter=""){
    // Retourne une réponse JSON
    query = 'SELECT DISTINCT * FROM Ebook'
    var params = [title]
    if (title == null) title = ""
    if (category == null || category == "None" || category == "none") category = ""
    if (theme == null || theme == "None" || theme == "none") theme = ""

    if(category != "" ){
        query = query + ' JOIN est_un ON Ebook.id_ebook = est_un.id_ebook AND name_category = ?'
        params.push(category)
    } 
    if(theme != ""){
        query = query + ' JOIN parle_de ON Ebook.id_ebook = parle_de.id_ebook AND name_theme = ?'
        params.push(theme)
    }
    if(title != ""){
        query = query + " WHERE titre LIKE CONCAT('%', ?, '%')"
    }
    if(sort_filter != ""){
        query = query + " ORDER BY " + sort_filter
    }
    
    console.log(category, theme)
    console.log(query)
    let [result] = await execute_query(query, params, "select");
    for (let i = 0; i < result.length; i++) {
        result[i].name_img = await retrieveImage(result[i]);
        var id_Biblio = await get_biblio(result[i].id_Biblio);
        result[i].id_Biblio = id_Biblio.donnees;
        var categories = await get_category_theme(result[i].id_ebook, "category");
        result[i].category = categories.donnees;
        var themes = await get_category_theme(result[i].id_ebook, "theme");
        result[i].theme = themes.donnees;
    }
    return prepare_response(result.length > 0, result, 'Result list filled', 'Result list empty');
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
            stock: rows[0].stock,
            name_pdf: rows[0].name_PDF,
            name_img: rows[0].name_img
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

async function req_get_pdf(id_ebook) {
    try {
        const query = "SELECT name_pdf FROM Ebook WHERE id_ebook=?";
        const [rows] = await execute_query(query, [id_ebook], "select");
        const pdf = await readPDF(rows[0].name_pdf);
        return prepare_response(rows.length > 0, pdf, 'PDF found', 'PDF not found');
    } catch (error) {
        console.error("Error listing pdf:", error);
        return prepare_response(false, [id_ebook], undefined, 'Erreur du serveur pour la recherche');
    }
}

// =========================================================
// EXPORTATIONS
module.exports = { req_listEbooks, req_my_books, req_books_details, req_get_pdf };