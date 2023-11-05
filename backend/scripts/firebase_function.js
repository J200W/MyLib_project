// Importation du module Firebase
const firebase = require("./firebaseConfig");

// Initialisation de l'application Firebase
const initializeApp = firebase.initializeApp;

// Récupération des modules Firebase
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
const deleteObject = firebase.deleteObject;

// Fonction pour récupérer l'image pour le carrousel
async function retrieveImageCarousel(book) {
    var image_ref = "";
    if (typeof book.name_img === "string")
        image_ref = await getDownloadURL(ref(storageImages, book.name_img)); // Récupère l'URL de téléchargement de l'image depuis le stockage Firebase
    return {
        id: book.id_ebook,
        titre: book.titre,
        src: image_ref,
    };
}

// Fonction pour récupérer une image
async function retrieveImage(book) {
    var image_ref = "";
    if (typeof book.name_img === "string")
        image_ref = await getDownloadURL(ref(storageImages, book.name_img)); // Récupère l'URL de téléchargement de l'image depuis le stockage Firebase
    return image_ref;
}

// Fonction pour récupérer un PDF
async function retrievePDF(book) {
    var pdf_ref = "";
    if (typeof book.pdf === "string")
        pdf_ref = await getDownloadURL(ref(storagePDF, book.pdf)); // Récupère l'URL de téléchargement du PDF depuis le stockage Firebase
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

// Fonction pour supprimer une image
async function deleteImage(name_img) {
    try {
        await deleteObject(ref(storageImages, name_img)); // Supprime l'image du stockage Firebase
    } catch (error) {
        console.error("Error during delete image in firebase:", error);
        return null;
    }
}

// Fonction pour supprimer un PDF
async function deletePDF(name_pdf) {
    try {
        await deleteObject(ref(storagePDF, name_pdf)); // Supprime le PDF du stockage Firebase
    } catch (error) {
        console.error("Error during delete pdf in firebase:", error);
        return null;
    }
}

// Fonction pour lire un PDF
async function readPDF(name_pdf) {
    pdf_ref = await getDownloadURL(ref(storagePDF, name_pdf)); // Récupère l'URL de téléchargement du PDF depuis le stockage Firebase
    return pdf_ref;
}

// Fonction pour téléverser un PDF
async function upload_book_pdf(pdfFile, name, metadata) {
    try {
        const byteArrayPDF = Object.values(pdfFile).map(Number);
        const filePDF = new Uint8Array(byteArrayPDF);
        const uploadTask = await uploadBytes(ref(storagePDF, name), filePDF, metadata); // Téléverse le PDF dans le stockage Firebase
        return uploadTask;
    } catch (error) {
        console.error("Error during upload book in firebase:", error);
        return null;
    }
}

// Fonction pour téléverser une image
async function upload_book_img(imgFile, name, metadata) {
    try {
        const byteArrayIMG = Object.values(imgFile).map(Number);
        const fileIMG = new Uint8Array(byteArrayIMG);
        const uploadTask = await uploadBytes(ref(storageImages, name), fileIMG, metadata); // Téléverse l'image dans le stockage Firebase
        return uploadTask;
    } catch (error) {
        console.error("Error during upload book in firebase:", error);
        return null;
    }
}

module.exports = {
    retrieveImageCarousel,
    retrieveImage,
    retrievePDF,
    upload_book_pdf,
    upload_book_img,
    readPDF,
    deleteImage,
    deletePDF,
};
