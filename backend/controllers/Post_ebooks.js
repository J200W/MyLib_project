
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");
const {retrieveImageCarousel, readPDF, retrieveImage} = require("../scripts/firebase_function");
const mysql = require("mysql2/promise");

async function req_listEbooks(title, category="", theme="", sort_filter=""){
    var params = []
    // Retourne une réponse JSON
    query = 'SELECT * FROM Ebook'
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
        params.push(title)
    }
    if(sort_filter != ""){
        query = query + " ORDER BY " + sort_filter
    }
    
    var [result] = await execute_query(query, params, "select");
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
        var query = "SELECT * FROM emprunter JOIN Ebook on Ebook.id_ebook=emprunter.id_ebook WHERE mail_Clients=? AND fin_emprunt > NOW()";
        const [rows] = await execute_query(query, [id_client], "select");
        // get also the books in partager
        const query2 = "SELECT * FROM partager JOIN Ebook on Ebook.id_ebook=partager.id_ebook WHERE mail_Clients_dest=? AND fin_partage > NOW()";
        const [rows2] = await execute_query(query2, [id_client], "select");
        rows.push(...rows2);
        for (let i = 0; i < rows.length; i++) {
            rows[i].name_img = await retrieveImage(rows[i]);
            var id_Biblio = await get_biblio(rows[i].id_Biblio);
            rows[i].id_Biblio = id_Biblio.donnees;
            if (rows[i].fin_emprunt != null) {
                if (((new Date(rows[i].fin_emprunt).getTime()) - (new Date(rows[i].debut_emprunt).getTime()))/ (1000 * 3600 * 24) <= 0) {
                    rows[i].on_loan = false;
                    rows[i].days_left = 0;
                }
                else {
                    rows[i].on_loan = true;
                    rows[i].days_left = ((new Date(rows[i].fin_emprunt).getTime()) - (new Date(rows[i].debut_emprunt).getTime()))/ (1000 * 3600 * 24)
                }
            }
            else {
                if (new Date(rows[i].fin_partage).getTime() > new Date().getTime()) {
                    rows[i].on_loan = true;
                    rows[i].days_left = parseInt(((new Date(rows[i].fin_partage).getTime()) 
                    - (new Date().getTime()))/ (1000 * 3600 * 24));
                    query = "SELECT pseudo_Clients FROM Clients WHERE mail_Clients=?";
                    var [rows3] = await execute_query(query, [rows[i].mail_Clients], "select");
                    rows[i].sender = rows3[0].pseudo_Clients;
                }
                else {
                    rows[i].on_loan = false;
                    rows[i].days_left = 0;
                }
            }

        }
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
        // Put the first letter in uppercase
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        }
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

async function req_similar_books(auteur, id_ebook){
    try {
        query = 'SELECT * FROM Ebook WHERE auteur=? AND id_ebook != ? LIMIT 4'
        let [result] = await execute_query(query, [auteur, id_ebook], "select")
        if (result.length < 4){
            query = 'SELECT * FROM Ebook WHERE auteur!=? LIMIT 4'
            let [result2] = await execute_query(query, [auteur], "select")
            result = result.concat(result2)
        }
        // randomize the order of the elements
        result = result.sort(() => Math.random() - 0.5);
        // keep only the first 4 elements
        result = result.slice(0, 4)
        // add the image source
        for (let i = 0; i < result.length; i++) {
            result[i].src = await retrieveImage(result[i]);
            result[i].id = result[i].id_ebook;
        }
        return prepare_response(result, result, 'filled list', 'empty list');
    }
    catch (error) {
        console.error("Error listing books:", error);
        return prepare_response(false, [auteur], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function req_history(id_client) {
    try {
        const query = "SELECT * FROM emprunter JOIN Ebook on Ebook.id_ebook=emprunter.id_ebook WHERE mail_Clients=?";
        const [rows] = await execute_query(query, [id_client], "select");
        for (let i = 0; i < rows.length; i++) {
            rows[i].name_img = await retrieveImage(rows[i]);
            rows[i].on_loan = rows[i].fin_emprunt > new Date();
            var id_Biblio = await get_biblio(rows[i].id_Biblio);
            rows[i].id_Biblio = id_Biblio.donnees;
        }
        return prepare_response(rows.length > 0, rows, 'Historique trouvé', 'Pas d\'historique trouvé');
    } catch (error) {
        console.error("Error listing books:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function req_get_book_borrowed(email, id_ebook) {
    try {
        const query = "SELECT * FROM emprunter WHERE mail_Clients=? AND id_ebook=? AND fin_emprunt > NOW()";
        const [rows] = await execute_query(query, [email, id_ebook], "select");
        return prepare_response(rows.length > 0, rows, 'Book found', 'Book not found');
    } catch (error) {
        console.error("Error listing books:", error);
        return prepare_response(false, [email, id_ebook], undefined, 'Erreur du serveur pour la recherche');
    }
}
        

// =========================================================
// EXPORTATIONS
module.exports = { req_get_book_borrowed, req_history, req_listEbooks, req_my_books, req_books_details, 
    req_get_pdf, req_similar_books, get_biblio, get_category_theme }