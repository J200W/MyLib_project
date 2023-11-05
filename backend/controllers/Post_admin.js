const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {upload_book_pdf, upload_book_img, deleteImage, deletePDF, retrieveImage} = require("../scripts/firebase_function");
const {get_biblio, get_category_theme} = require("../controllers/Post_ebooks");


async function req_new_book(title, author, date, language, editor, page, category, theme, description, img, pdf, admin_email, stock) {
    try {
        var query =
            "INSERT INTO Ebook (titre, auteur, date_parution, langue, editeur, nb_pages, description, name_img, name_pdf, id_Biblio, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var result = await execute_query(query, [title, author, date, language, editor, page, description, img, pdf, admin_email, stock], "insert");
        if (result === false) {
            return prepare_response(false, title, undefined, 'Fail to add book')
        }
        query = "SELECT MAX(id_Ebook) FROM Ebook";
        var resultIdBook = await execute_query(query, [], "select");
        resultIdBook = resultIdBook[0][0]["MAX(id_Ebook)"]
        if (result.length < 1) {
            return prepare_response(false, title, undefined, 'Fail to add book')
        }
        query = "DELETE FROM est_un WHERE id_ebook = ?";
        result = await execute_query(query, [resultIdBook], "delete");
        query = "INSERT INTO est_un (id_ebook, name_category) VALUES (?, ?)";
        var final_result = true;
        for (var i = 0; i < category.length; i++) {
            if (category[i] != "None") {
                result = await execute_query(query, [
                    resultIdBook,
                    category[i], 
                    'insert'
                ])
                final_result = final_result && result;
            }
        }
        query = "DELETE FROM parle_de WHERE id_ebook = ?";
        result = await execute_query(query, [resultIdBook], "delete");
        query = "INSERT INTO parle_de (id_ebook, name_theme) VALUES (?, ?)";
        for (var i = 0; i < theme.length; i++) {
            if (theme[i] != "None") {
                result = await execute_query(query, [
                    resultIdBook,
                    theme[i]
                ],'insert')
                final_result = final_result && result;
            }
        }
        return prepare_response(final_result, title, 'Book added successfully', 'Fail to add book')
    }
    catch (error) {
        console.error("Error during insertion new book:", error);
        return prepare_response(false, title, undefined, 'Fail to add book')
    }
}


async function req_upload_book_pdf(pdfFile, name, action="", old_name="") {
    try {
        if (action === "upload") {
            const metadata = {
                contentType: "application/pdf",
            };
            const uploadTaskPDF = await upload_book_pdf(pdfFile, name, metadata);
            if (uploadTaskPDF === null) {
                return prepare_response(false, pdfFile, undefined, 'Fail to upload book PDF');
            }
            return prepare_response(true, pdfFile, 'Book PDF uploaded successfully', 'Fail to upload book PDF');
        }
        else if (action === "update") {
            //if(pdfFile === null && old_name === name) {
                const metadata = {
                    contentType: "application/pdf",
                };
                const deleteTaskPDF = await deletePDF(old_name);
                if (deleteTaskPDF === null) {
                    return prepare_response(false, pdfFile, undefined, 'Fail to upload book PDF');
                }

                const uploadTaskPDF = await upload_book_pdf(pdfFile, name, metadata);
                if (uploadTaskPDF === null) {
                    return prepare_response(false, pdfFile, undefined, 'Fail to upload book PDF');
                }
                return prepare_response(true, pdfFile, 'Book PDF updated successfully', 'Fail to update book PDF');
            //}
            return prepare_response(true, name, 'Book PDF stay the same', 'Fail to keep book PDF')
            
        }
    }
    catch (error) {
        console.error("Error during upload book in firebase:", error);
        return prepare_response(false, pdfFile, undefined, 'Fail to upload book PDF');
    }
}

async function req_upload_book_img(imgFile, name, action="", old_name="") {
    try {
        if (action === "upload") {
            const metadata = {
                contentType: "image/jpeg",
            };
            const uploadTaskIMG = await upload_book_img(imgFile, name, metadata);
            if (uploadTaskIMG === null) {
                return prepare_response(false, imgFile, undefined, 'Fail to upload book');
            }
            return prepare_response(true, imgFile, 'Book image uploaded successfully', 'Fail to upload book');
        }
        else if (action === "update") {
            const metadata = {
                contentType: "image/jpeg",
            };
            const deleteTaskIMG = await deleteImage(old_name);
            if (deleteTaskIMG === null) {
                return prepare_response(false, imgFile, undefined, 'Fail to update book image');
            }

            const uploadTaskIMG = await upload_book_img(imgFile, name, metadata);
            if (uploadTaskIMG === null) {
                return prepare_response(false, imgFile, undefined, 'Fail to update book image');
            }
            return prepare_response(true, imgFile, 'Book image updated successfully', 'Fail to update book image');
        }
    }
    catch (error) {
        console.error("Error during upload book in firebase:", error);
        return prepare_response(false, imgFile, undefined, 'Fail to upload book');
    }
}

async function req_delete_comment(email) {
    try {
        var query = "DELETE FROM commenter WHERE mail_Clients = ?";
        var result = await execute_query(query, [email], "delete");
        if (result === false) {
            return prepare_response(false, email, undefined, 'Fail to delete comment')
        }
        return prepare_response(true, email, 'Comment deleted successfully', 'Fail to delete comment')
    }
    catch (error) {
        console.error("Error during delete comment:", error);
        return prepare_response(false, email, undefined, 'Fail to delete comment')
    }
}

async function req_update_book(datas) {
    try {
        var query = "UPDATE Ebook SET titre = ?, auteur = ?, date_parution = ?, langue = ?, editeur = ?, nb_pages = ?, description = ?, name_img = ?, name_pdf = ?, stock = ?, id_Biblio = ? WHERE id_Ebook = ?";
        var result = await execute_query(query, [datas.titre, datas.auteur, datas.date, datas.langue, datas.editeur, datas.page, datas.description, datas.img, datas.pdf, datas.stock, datas.admin, datas.id_ebook], "update");
        if (result === false) {
            return prepare_response(false, datas, undefined, 'Fail to update book 1')
        }
        query = "DELETE FROM est_un WHERE id_ebook = ?";
        result = await execute_query(query, [datas.id_ebook], "delete");

        query = "DELETE FROM parle_de WHERE id_ebook = ?";
        result = await execute_query(query, [datas.id_ebook], "delete");

        query = "INSERT INTO est_un (id_ebook, name_category) VALUES (?, ?)";
        var final_result = true;
        for (var i = 0; i < datas.categories.length; i++) {
            if (datas.categories[i] !== "None" && datas.categories[i] !== "") {
                result = await execute_query(query, [
                    datas.id_ebook,
                    datas.categories[i]
                ], 'insert')
                final_result = final_result && result;
            }
        }
        query = "INSERT INTO parle_de (id_ebook, name_theme) VALUES (?, ?)";
        for (var i = 0; i < datas.themes.length; i++) {
            if (datas.themes[i] !== "None" && datas.themes[i] !== "") {
                result = await execute_query(query, [
                    datas.id_ebook,
                    datas.themes[i]
                ], 'insert')
                final_result = final_result && result;
            }
        }
        return prepare_response(final_result, datas, 'Book updated successfully', 'Fail to update book 4')
    }
    catch (error) {
        console.error("Error during update book:", error);
        return prepare_response(false, datas, undefined, 'Fail to update book')
    }
}

async function req_can_modify_book(email, id_ebook) {
    try {
        var query = "SELECT * FROM Ebook WHERE id_Ebook = ?";
        const [result] = await execute_query(query, [id_ebook], "select");
        if (result === false) {
            return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
        }
        if (result.length === 0) {
            return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
        }
        var admin_who_added = result[0].id_Biblio;
        if (admin_who_added === email) {
            return prepare_response(true, email, undefined, 'Fail to check if user can modify book')
        }
        query = "SELECT * FROM Admin_biblio WHERE mail_admin = ?";
        const [result2] = await execute_query(query, [admin_who_added], "select");
        if (result2 === false) {
            return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
        }
        if (result2.length === 0) {
            return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
        }
        var biblio_who_added = result2[0].bibliotheque;
        const [result3] = await execute_query(query, [email], "select");
        var current_admin_biblio = result3[0].bibliotheque;
        if (result3 === false) {
            return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
        }
        if (result3.length === 0) {
            return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
        }
        var biblio_who_modify = current_admin_biblio;
        if (biblio_who_added === biblio_who_modify) {
            return prepare_response(true, email, undefined, 'Fail to check if user can modify book')
        }
        return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
    }
    catch (error) {
        console.error("Error during check if user can modify book:", error);
        return prepare_response(false, email, undefined, 'Fail to check if user can modify book')
    }
}

async function req_library_books(email, category="None", theme="None", sort_filter="titre") {
    try {
        var biblio = await get_biblio(email);
        biblio = biblio.donnees;
        console.log(sort_filter)
        // Fetch books added by admin of the same library
        var query = "SELECT * FROM Ebook WHERE id_Biblio IN (SELECT mail_admin FROM Admin_biblio WHERE bibliotheque = ?)";
        var [result] = await execute_query(query, [biblio], "select");
        for (var i = 0; i < result.length; i++) {
            result[i].name_img = await retrieveImage(result[i]);
            var id_Biblio = await get_biblio(result[i].id_Biblio);
            result[i].id_Biblio = id_Biblio.donnees;
            var categories = await get_category_theme(result[i].id_ebook, "category");
            result[i].category = categories.donnees;
            var themes = await get_category_theme(result[i].id_ebook, "theme");
            result[i].theme = themes.donnees;
        }

        // ORDER BY sort_filter
        if (sort_filter === "titre") {
            result.sort(function (a, b) {
                return a.titre.localeCompare(b.titre);
            });
        }
        else if (sort_filter === "auteur") {
            result.sort(function (a, b) {
                return a.auteur.localeCompare(b.auteur);
            });
        }
        else if (sort_filter === "date_parution") {
            result.sort(function (a, b) {
                a = new Date(a.date_parution);
                b = new Date(b.date_parution);
                return a > b ? -1 : a < b ? 1 : 0;
            });
        }

        // Filter by category
        if (category !== "None") {
            var filtered_result = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].category.includes(category)) {
                    filtered_result.push(result[i]);
                }
            }
            result = filtered_result;
        }

        // Filter by theme
        if (theme !== "None") {
            var filtered_result = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].theme.includes(theme)) {
                    filtered_result.push(result[i]);
                }
            }
            result = filtered_result;
        }

        return prepare_response(true, [result, biblio], "Success to get books for firebase", "Error while retrieving books");
    }
    catch (error) {
        console.error("Error during retrieve user:", error);
        return prepare_response(false, null, "Error during retrieve user", "Error while retrieving library");
    }
}


// =========================================================

module.exports = { req_new_book, req_upload_book_pdf, 
    req_upload_book_img, req_delete_comment, req_update_book, req_can_modify_book, req_library_books };