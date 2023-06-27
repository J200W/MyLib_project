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

module.exports = {
    retrieveImage,
    retrievePDF,
};
