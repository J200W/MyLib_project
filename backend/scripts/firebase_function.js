const firebase = require("./firebaseConfig");

const initializeApp = firebase.initializeApp;

const auth = firebase.auth;
const storage = firebase.storage;
const getAuth = firebase.auth.getAuth;
const getStorage = firebase.storage.getStorage;
const getDownloadURL = firebase.getDownloadURL;
const app = firebase.app;
const storageImages = firebase.storageImages;
const storagePDF = firebase.storagePDF;
const ref = firebase.ref;
const uploadBytes = firebase.uploadBytes;

async function retrieveImage(book) {
    var image_ref = "";
    if (typeof book.src === "string")
        image_ref = await getDownloadURL(ref(storageImages, book.src));
    return {
        id: book.id,
        title: book.title,
        src: image_ref,
        author: book.author,
        library: book.library,
        theme: book.theme,
        genre: book.genre,
        date: book.date, 
        edition: book.edition,
        language: book.language,
        pages: book.pages,
        description: book.description,
        pdf: book.pdf,
    };
}

async function retrievePDF(book) {
    var pdf_ref = "";
    if (typeof book.pdf === "string")
        pdf_ref = await getDownloadURL(ref(storagePDF, book.pdf));
    return {
        id: book.id,
        title: book.title,
        src: pdf_ref,
        author: book.author,
        library: book.library,
        theme: book.theme,
        genre: book.genre,
        date: book.date, 
        edition: book.edition,
        language: book.language,
        pages: book.pages,
        description: book.description,
        pdf: book.pdf,
    };
}

async function upload_book_pdf(pdfFile, name, metadata) {
    try {
        const byteArrayPDF = Object.values(pdfFile).map(Number);
        const filePDF = new Uint8Array(byteArrayPDF);
        const uploadTask = await uploadBytes(ref(storagePDF, name), filePDF, metadata);
        return uploadTask;
    } catch (error) {
        console.error("Error during upload book in firebase:", error);
        return null;
    }
}

async function upload_book_img(imgFile, name, metadata) {
    try {
        const byteArrayIMG = Object.values(imgFile).map(Number);
        const fileIMG = new Uint8Array(byteArrayIMG);
        const uploadTask = await uploadBytes(ref(storageImages, name), fileIMG, metadata);
        return uploadTask;
    } catch (error) {
        console.error("Error during upload book in firebase:", error);
        return null;
    }
}

module.exports = {
    retrieveImage,
    retrievePDF,
    upload_book_pdf,
    upload_book_img
};
