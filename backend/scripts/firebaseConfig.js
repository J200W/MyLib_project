// Import the functions you need from the SDKs you need
const firebase = require("firebase/app")
const { initializeApp } = require("firebase/app")
const { getAuth } = require("firebase/auth")
const { getStorage } = require("firebase/storage")
const { ref, getDownloadURL } = require("firebase/storage")

// require getDownloadURL




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAikz3NgkKDKDF20y_Q1DRRKJExqV4Nvcc",
  authDomain: "l3s2-mastercamp-ebookbdd.firebaseapp.com",
  projectId: "l3s2-mastercamp-ebookbdd",
  storageBucket: "l3s2-mastercamp-ebookbdd.appspot.com",
  messagingSenderId: "874892299446",
  appId: "1:874892299446:web:d3584c21535091e73e6a17",
  measurementId: "G-55DP6RCEBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const storageRef = ref(storage)
const storageImages = ref(storage, 'image')
const storagePDF = ref(storage, 'pdf')

module.exports = { auth, storageRef, storage, app, storageImages, storagePDF, ref, getDownloadURL }

