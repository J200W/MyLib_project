const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
async function req_new_book(title, author, date, language, editor, page, category, theme, biblio, description, img, pdf) {
    console.log(title, author, date, language, editor, page, category, theme, biblio, description, img, pdf)
    try {
        const id_biblio = await get_biblio_id(biblio);
        const query =
            "INSERT INTO Ebook (titre, auteur, date_parution, langue, editeur, nb_pages, description, name_img, name_pdf, id_Biblio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const result = await execute_query(query, [title, author, date, language, editor, page, description, img, pdf, id_biblio], "insert");
        return prepare_response(result, title, 'book added', 'book not added')
    }
    catch (error) {
        console.error("Error during insertion new book:", error);
        return prepare_response(false, title, undefined, 'book not added')
    }
}
async function get_biblio_id(biblio) {
    try {
        const query =
            "Select mail_admin from Admin_biblio where mail_admin = ?"//"SELECT id_biblio FROM Bibliotheque WHERE nom_biblio = ?";
        const [rows] = await execute_query(query, [biblio], "select");
        return rows[0].id_biblio;
    }
    catch (error) {
        console.error("Error during registration:", error);
        return false;
    }
}

module.exports = { req_new_book };