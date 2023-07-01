
const { prepare_response } = require('./Tools_controllers');
const {list_books} = require("../database/listBooks");
const {execute_query} = require("../database/Connection");
const mysql = require("mysql2/promise");
const {get_particular_books} = require("./Get_ebooks");

async function req_listEbooks(title, category=[], theme=[]){
    // Retourne une réponse JSON
    categoryList = category
    themeList = theme
    query = 'SELECT * FROM Ebook JOIN (Select group_concat(name_category) as name_category, est_un.id_ebook as id from est_un group by est_un.id_ebook) grp_cat on grp_cat.id=Ebook.id_ebook JOIN (Select group_concat(name_theme) as name_theme, parle_de.id_ebook as id from parle_de group by parle_de.id_ebook) grp_th on grp_th.id=Ebook.id_ebook'
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
    while (categoryList.length>0){
        query = query + ' AND category = ?'
        categoryList.pop()
    }
    while (themeList.length>0){
        query = query + ' AND theme = ?'
        themeList.pop()
    }
    query = query + " group by Ebook.id_ebook"
    let [result] = await execute_query(query, [title, category, theme], "select")
    console.log("result ", [result])
    return prepare_response(result, result, 'filled list', 'empty list');

}



/*
async function req_research(title) {
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

        const query = "SELECT * FROM emprunter JOIN Ebook on Ebook.id_ebook=emprunter.id_ebook WHERE mail_Clients=?";
        const [rows] = await execute_query(query, [id_client], "select");
        //return get_particular_books(rows)
        //console.log(rows)
        //console.log(rows.length)
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

async function req_emprunt_dates(id_client, id_book){
    try {
        let res_emprunte_table = await req_read_book(id_client, id_book)
        if (res_emprunte_table.status === "success"){
            return prepare_response(true,
                [res_emprunte_table.donnees.debut_emprunt, res_emprunte_table.donnees.fin_emprunt]
                , 'Book borrowed, allowed to read', 'Not borrowed, unable to read');
        }
        return res_emprunte_table;
    } catch (error) {
        console.error("Error checking if book is readable:", error);
        return prepare_response(false, [id_client], undefined, 'Erreur du serveur pour la recherche');
    }
}

async function req_book_details_show(id_book){
    try {

        const query = "SELECT * FROM Ebook  JOIN (Select group_concat(name_category) as name_category, est_un.id_ebook as id from est_un group by est_un.id_ebook) grp_cat on grp_cat.id=Ebook.id_ebook JOIN (Select group_concat(name_theme) as name_theme, parle_de.id_ebook as id from parle_de group by parle_de.id_ebook) grp_th on grp_th.id=Ebook.id_ebook WHERE Ebook.id_Ebook=? group by Ebook.id_ebook";
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

// FONCTION qui permet de partager un livre : recoit en paramètre le mail du client, l'objet book avec son id et le pseudo du receveur (trouver le mail du receveur avec une requête)
async function req_share_book(reqBody) {
    try {
        // Querie pour récupérer le mail du receveur avec son pseudo
        if (reqBody.stock <= 0) {
            return prepare_response(false, reqBody, undefined, "The book is not possessed for sharing")
        }
        const query_receveur = "SELECT mail_Clients FROM Clients WHERE pseudo_Clients=?";
        const [rows_receveur] = await execute_query(query_receveur, [reqBody.pseudo_destination], "select");
        if (!rows_receveur.length > 0) {
            return prepare_response(false, reqBody, undefined, 'Pseudo du receveur non trouvé')
        }
        var mail_receveur = rows_receveur[0].mail_Clients;

        const query_toShare = "INSERT INTO partager (mail_Clients, id_Ebook, mail_Clients_dest) VALUES (?, ?, ?)";
        const rows_toShare = await execute_query(query_toShare, [reqBody.email, reqBody.book_shared.id, mail_receveur], "insert");
        return prepare_response(rows_toShare, reqBody, 'Book shared', 'Book already shared');

        // MODIF DE STOCK A FAIRE en BDD


    }
    catch (error) {
        console.error("Error sharing book:", error);
        return prepare_response(false, reqBody, undefined, 'Error during sharing book');
    }
}


// =========================================================
// EXPORTATIONS
module.exports = { req_listEbooks, req_my_books, req_read_book, req_book_details_show, req_book_details_mod, req_emprunt_dates
, req_share_book};