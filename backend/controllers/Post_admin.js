const mysql = require("mysql2/promise");
const { prepare_response } = require('./Tools_controllers');
const {execute_query} = require("../database/Connection");
const {upload_book_pdf, upload_book_img} = require("../scripts/firebase_function");


async function req_new_book(title, author, date, language, editor, page, category, theme, description, img, pdf, admin_email) {
    try {
        var query =
            "INSERT INTO Ebook (titre, auteur, date_parution, langue, editeur, nb_pages, description, name_img, name_pdf, id_Biblio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var result = await execute_query(query, [title, author, date, language, editor, page, description, img, pdf, admin_email], "insert");
        if (result === false) {
            return prepare_response(false, title, undefined, 'Fail to add book')
        }
        query = "SELECT MAX(id_Ebook) FROM Ebook";
        var resultIdBook = await execute_query(query, [], "select");
        resultIdBook = resultIdBook[0][0]["MAX(id_Ebook)"]
        if (result.length < 1) {
            return prepare_response(false, title, undefined, 'Fail to add book')
        }
        query = "REPLACE INTO est_un (id_ebook, name_category) VALUES (?, ?)";
        var final_result = true;
        for (var i = 0; i < category.length; i++) {
            if (category[i] != "None") {
                result = await execute_query(query, [
                    resultIdBook,
                    category[i], 
                    'replace'
                ])
                final_result = final_result && result;
            }
        }
        query = "REPLACE INTO parle_de (id_ebook, name_theme) VALUES (?, ?)";
        for (var i = 0; i < theme.length; i++) {
            if (theme[i] != "None") {
                result = await execute_query(query, [
                    resultIdBook,
                    theme[i]
                ],'replace')
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


async function req_upload_book_pdf(pdfFile, name) {
    try {
        const metadata = {
            contentType: "application/pdf",
        };
        const uploadTaskPDF = await upload_book_pdf(pdfFile, name, metadata);
        if (uploadTaskPDF === null) {
            return prepare_response(false, pdfFile, undefined, 'Fail to upload book');
        }
        return prepare_response(true, pdfFile, 'Book uploaded successfully', 'Fail to upload book');
    }
    catch (error) {
        console.error("Error during upload book in firebase:", error);
        return prepare_response(false, pdfFile, undefined, 'Fail to upload book');
    }
}

async function req_upload_book_img(imgFile, name) {
    try {
        const metadata = {
            contentType: "image/jpeg",
        };
        const uploadTaskIMG = await upload_book_img(imgFile, name, metadata);
        if (uploadTaskIMG === null) {
            return prepare_response(false, imgFile, undefined, 'Fail to upload book');
        }
        return prepare_response(true, imgFile, 'Book uploaded successfully', 'Fail to upload book');
    }
    catch (error) {
        console.error("Error during upload book in firebase:", error);
        return prepare_response(false, imgFile, undefined, 'Fail to upload book');
    }
}

// =========================================================

module.exports = { req_new_book, req_upload_book_pdf, req_upload_book_img };