<script setup>

import PopUpAddFav from "@/components/PopUpAddFav.vue";
import ModalBox from "./ModalBox.vue";
import moment from "moment";
import {port} from "../../../backend/controllers/Tools_controllers";
var admin = sessionStorage.getItem("admin");

if (admin == null) {
  admin = false;
}
else if (admin == "true") {
  admin = true;
} else {
  admin = false;
}

var connected = sessionStorage.getItem("connected");

if (connected == null) {
    connected = false;
}

if (connected == "true") {
    connected = true;
} else {
    connected = false;
}


var category = [
    { "value": "None", "text": "None" },
    { "value": "Adventure", "text": "Adventure" },
    { "value": "Romance", "text": "Romance" },
    { "value": "Mystery", "text": "Mystery" },
    { "value": "Fantasy", "text": "Fantasy" },
    { "value": "Horror", "text": "Horror" },
    { "value": "Thriller", "text": "Thriller" },
    { "value": "Historical-fiction", "text": "Historical Fiction" },
    { "value": "Self-help", "text": "Self-Help" },
    { "value": "Science", "text": "Science" },
    { "value": "Dystopian", "text": "Dystopian" },
    { "value": "Humor", "text": "Humor" },
    { "value": "Crime", "text": "Crime" },
    { "value": "Young-adult", "text": "Young Adult" },
    { "value": "Philosophy", "text": "Philosophy" },
    { "value": "Business", "text": "Business" },
    { "value": "Travel", "text": "Travel" },
    { "value": "Memoir", "text": "Memoir" },
    { "value": "Historical", "text": "Historical" },
    { "value": "Children", "text": "Children" },
    { "value": "Graphic-novel", "text": "Graphic Novel" }
];

var theme = [
    { "value": "None", "text": "None" },
    { "value": "Love", "text": "Love" },
    { "value": "Friendship", "text": "Friendship" },
    { "value": "Family", "text": "Family" },
    { "value": "War", "text": "War" },
    { "value": "Survival", "text": "Survival" },
    { "value": "Identity", "text": "Identity" },
    { "value": "Betrayal", "text": "Betrayal" },
    { "value": "Forgiveness", "text": "Forgiveness" },
    { "value": "Courage", "text": "Courage" },
    { "value": "Loss", "text": "Loss" },
    { "value": "Resilience", "text": "Resilience" },
    { "value": "Redemption", "text": "Redemption" },
    { "value": "Discovery", "text": "Discovery" },
    { "value": "Hope", "text": "Hope" },
    { "value": "Adventure", "text": "Adventure" },
    { "value": "Transformation", "text": "Transformation" },
    { "value": "Coming-of-age", "text": "Coming of Age" },
    { "value": "Self-discovery", "text": "Self-Discovery" },
    { "value": "Sacrifice", "text": "Sacrifice" },
    { "value": "Justice", "text": "Justice" },
    { "value": "Manga", "text": "Manga" },
    { "value": "Comics", "text": "Comics" }

];

</script>


<template>
    <div id="allPage">
        <div id="left-section">
            <div id="left-left-section">
                <p v-if="admin && can_modify" id="bookTitle">Title:
                    <!-- <span>{{ book.title }}</span> -->
                    <span v-if="!admin || !can_modify">{{ book.titre }}</span>
                    <input id="title" v-if="admin && can_modify" v-model="book.titre" placeholder="Title" required />
                </p>
                <p id="bookTitle" v-if="!admin || !can_modify">
                    <span>{{ book.titre }}</span>
                </p>
                <img id="bookImg" :src="book.src" alt="{{ book.titre }}">
                <div v-if="admin && can_modify">
                    <p><b>
                            Book PDF:
                        </b>
                    </p>
                    <input type="file" name="pdf" class="file" id="filePDF" accept=".pdf" required>
                    <p><b>
                            Image:
                        </b>
                    </p>
                    <input type="file" name="img" id="fileIMG" class="file" @change="previewImg" accept="image/*" required>
                </div>
                <!--         
                <div v-if="verif_ifClient">
          <router-link v-if="this.ifBorrowed" to="/BorrowBook" id="borrow-book" @click="storeBookInSessionStorage">Borrow Book</router-link>
          <div v-else>
            <p> Date d'emprunt: Date de rendu: Temps restant:</p>
            <router-link to="/ShareBook" id="share-book" @click="storeBookBorrowedInSessionStorage">Share Book</router-link>
          </div>
        </div>
        <button v-else @click="save_book_information()" id="borrow-book">Save Information</button> -->
                <router-link v-if="!borrowed && !admin" to="/BorrowBook" class="borrow-book">Borrow eBook</router-link>
                <router-link v-if="borrowed && !admin" to="/ReadBook" class="borrow-book">Read eBook</router-link>
                <button @click="returnBook()" v-if="borrowed && !admin" class="borrow-book">Return my eBook</button>
                <!-- add the popup -->
                <!-- <PopUpAddFav v-if="!admin" :book="book" /> -->
                <p><b>Library: </b>
                    <span v-if="!admin || !can_modify">{{ book.library }}</span>
                    <input type="text" id="library" v-if="admin && can_modify" v-model="book.library" readonly />
                </p>
                <p><b>Stock: </b>
                    <span v-if="!admin || !can_modify">{{ book.stock }}</span>
                    <input min="0" type="number" id="stock" v-if="admin && can_modify" v-model="book.stock" />
                </p>
                <input @click="save_book_information()" v-if="admin && can_modify" required class="borrow-book" type="submit"
                    value="Save Information">
            </div>
            <div id="bookInfo">
                <div id="bookFav">
                    <h2>Info</h2>
                    <button @click.prevent="add_remove_to_fav()" v-if="!admin && !isFavorite" id="button-add-fav">Add to
                        Favorites</button>
                    <button @click.prevent="add_remove_to_fav()" v-if="!admin && isFavorite" id="button-remove-fav">Remove
                        from Favorites</button>
                </div>
                <p><b>Author: </b>
                    <span v-if="!admin || !can_modify">{{ book.author }}</span>
                    <input type="text" id="author" v-if="admin && can_modify" v-model="book.author" placeholder="Author" />

                </p>
                <hr>
                <p><b>Edition: </b>
                    <!-- <span>{{book.edition}}</span> -->
                    <span v-if="!admin || !can_modify">{{ book.edition }}</span>
                    <input type="text" id="editor" v-if="admin && can_modify" v-model="book.edition"
                        placeholder="Edition" />
                </p>
                <hr>
                <p><b>Release date: </b>
                    <!-- <span>{{ book.date }}</span> -->
                    <span v-if="!admin || !can_modify">{{ new Date(book.date).toDateString() }}</span>
                    <input v-if="admin && can_modify" id="date" type="date" value="{{ book.date }}"
                        placeholder="{{ moment(book.date).format('YYYY-MM-DD') }}" />
                </p>
                <hr>
                <p><b>Language: </b><span v-if="!admin">{{ book.language }}</span>
                    <!-- <span v-if="!admin" >{{book.language}}</span> -->
                    <input type="text" id="language" v-if="admin && can_modify" v-model="book.language"
                        placeholder="Language" />
                </p>
                <hr>
                <p><b>Categories: </b>
                    <span v-if="!admin || !can_modify">{{ book.category[0] }}, {{ book.category[1] }}, {{ book.category[2]
                    }}</span>
                <div class="bookAdminCompSelector">
                    <select v-if="admin && can_modify" id="category0">
                        <option :key="book.category[0]">{{ book.category[0] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin && can_modify" id="category1">
                        <option :key="book.category[1]">{{ book.category[1] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin && can_modify" id="category2">
                        <option :key="book.category[2]">{{ book.category[2] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                </div>

                </p>
                <hr>
                <p><b>Themes: </b>
                    <span v-if="!admin || !can_modify">{{ book.theme[0] }}, {{ book.theme[1] }}, {{ book.theme[2] }}</span>
                <div class="bookAdminCompSelector">
                    <select v-if="admin && can_modify" id="theme0">
                        <option :key="book.theme[0]">{{ book.theme[0] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                    </select>
                    <select v-if="admin && can_modify" id="theme1">
                        <option :key="book.theme[1]">{{ book.theme[1] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                    </select>
                    <select v-if="admin && can_modify" id="theme2">
                        <option :key="book.theme[2]">{{ book.theme[2] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                    </select>
                </div>
                </p>
                <hr>
                <p><b>Pages: </b>
                    <!-- <span>{{ book.pages }}</span> -->
                    <span v-if="!admin || !can_modify">{{ book.pages }}</span>
                    <input id="page" type="number" min="0" v-if="admin && can_modify" v-model="book.pages"
                        placeholder="Page" />
                </p>
            </div>
        </div>

        <div id="right-section">
            <h2>Resume</h2>
            <div id="book-resume">
                <div class="row">
                    <p v-if="!admin || !can_modify">{{ book.description }}</p>
                    <textarea id="resume" class="resume" v-if="admin && can_modify" v-model="book.description"
                        placeholder="resume"></textarea>
                </div>
            </div>

        </div>
    </div>

</template>

<script>


let save = false

const test_array = [1, 2, 3, 4]

export default {
    name: 'BookDetailComp',
    data() {
        return {
            borrowed: null,
            isFavorite: null,
            can_modify: null,
        }
    },
    props: ['book', 'can_modify'],
    mounted() {
        this.fetchBorrowed(),
            this.checkFavorite()
    },
    methods: {
        checkFavorite() {
            let link = window.location.href;
            const id_ebook = parseInt(link.split("?id=").pop());
            let datas = JSON.stringify({
                id_ebook: id_ebook,
                user_email: sessionStorage.getItem("user_email")
            });
            fetch("http://localhost:" + port + "/check_favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: datas,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "success") {
                        this.isFavorite = true
                    }
                    else {
                        this.isFavorite = false
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            return;
        },
        returnBook() {
            if (confirm('Are you sure you want to return this book?')) {
                let link = window.location.href;
                const id_ebook = parseInt(link.split("?id=").pop());
                let datas = JSON.stringify({
                    id_ebook: id_ebook,
                    email: sessionStorage.getItem("user_email")
                });

                fetch("http://localhost:" + port + "/return_book", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: datas,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        alert(data.message)
                        if (data.status === "success") {
                            location.reload()
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        },
        previewImg() {
            var file = document.getElementById("fileIMG").files[0];
            var preview = document.getElementById("bookImg");
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                preview.src = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        confirm_action() {
            let test = confirm("Are you sure you want to erase the previous informations with the new ones ? ");

    save_book_information() {
      // this.confirm_action()
      if (save === false) {
        console.log("new informations saved")
        save = true


        async fetchBorrowed() {

            var link = window.location.href;
            const id_ebook = parseInt(link.split("?id=").pop());
            let datas = JSON.stringify({
                email: sessionStorage.getItem('user_email'),
                id_ebook: id_ebook
            })
            fetch("http://localhost:" + port + "/borrowed",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: datas
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status !== 'success') {
                        this.borrowed = false
                    }
                    else {
                        this.borrowed = true
                    }
                    sessionStorage.setItem('borrowed', this.borrowed)
                })
            var date = document.getElementById("date");
            if (date) date.value = moment(this.book.date).format('YYYY-MM-DD');
        },

    },
    add_to_fav() {
      console.log("add to fav to bd")
      console.log((sessionStorage.getItem("admin") !== "true") && (sessionStorage.getItem('user_email') != null))
      //
    },


            console.log(datas)
            try {
                // Convert book file to base64
                const readerPDF = new FileReader();
                readerPDF.readAsArrayBuffer(filePDF);
                readerPDF.onloadend = function () {
                    var arrayBuffer = readerPDF.result;
                    var bytes = new Uint8Array(arrayBuffer);
                    var book = JSON.parse(sessionStorage.getItem("book"))
                    var old_name = book.name_pdf
                    var data_pdf = {
                        pdf: bytes,
                        name: filePDF.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                        old_name: old_name
                    }
                    fetch("http://localhost:" + port + "/update_book_pdf",
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data_pdf)
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status !== 'success') {
                                throw new Error(data.message)
                            }
                        })
                }
                // Convert image file to base64
                var readerIMG = new FileReader();
                readerIMG.readAsArrayBuffer(fileIMG);
                readerIMG.onloadend = function () {
                    var arrayBuffer = readerIMG.result;
                    var bytes = new Uint8Array(arrayBuffer);
                    var book = JSON.parse(sessionStorage.getItem("book"))
                    var old_img = book.name_img
                    var data_img = {
                        img: bytes,
                        name: fileIMG.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                        old_name: old_img
                    }
                    fetch("http://localhost:" + port + "/update_book_img",
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data_img)
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status !== 'success') {
                                throw new Error(data.message)
                            }
                        })
                }
                fetch("http://localhost:" + port + "/update_book",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datas)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            alert(data.message);
                            location.reload();
                        }
                        else {
                            throw new Error(data.message)
                        }
                    })
            }
            catch (error) {
                console.log(error)
            }
        },
        add_remove_to_fav() {
            if (sessionStorage.getItem('connected') == "false" || sessionStorage.getItem('connected') == null) {
                this.$router.push('/LogIn')
                return;
            }
            fetch("http://localhost:" + port + "/add_remove_favorite",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_ebook: this.book.id_ebook,
                        email: sessionStorage.getItem('user_email')
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        location.reload();
                    }
                    else {
                        throw new Error(data.message)
                    }
                })
        }


    verif_ifClient(){
      return (sessionStorage.getItem("admin") !== "true") && (sessionStorage.getItem('user_email') != null)
    },

    storeBookInSessionStorage() {
      sessionStorage.setItem('Book', JSON.stringify(this.book));
    },

    storeBookBorrowedInSessionStorage() {
      this.storeBookInSessionStorage()
      fetch("http://localhost:" + port +"/get_emprunt_dates", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_ebook: this.book.id_ebook,
          user_email: sessionStorage.getItem("user_email")
        })
      })
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
            if(data.status === "success"){
              sessionStorage.setItem("book_detailed_emprunt_dates", JSON.stringify(data.donnees));
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
          })
    }

  }
}

</script>

<style scoped>
#bookTitle {
    margin: auto;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 2vmin;
    margin-bottom: 2vmin !important;

/*
.btn-primary {
  margin-left: 40px;
  margin-top: 25px;
  font-size: 15px;
  padding: 10px 10px;
  color: white;
  background-color: #A8A787;
  border-radius: 0%;
}

.btn-primary:hover {
  background-color: #D79262;
}

.file-selector {
  margin-bottom: 20px;
}

#bookTitle {
  margin:auto;
  font-size: 2vmin;
  margin-bottom: 1vmin; */

}

.resume {
  height: 200px;
}

#bookFav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#button-add-fav,
#button-remove-fav {
    padding: 1vmin;
    font-size: 2vmin;
    color: white;
    background-color: #D0AB77;
    border-radius: 20px;
    border: none;

}

#button-add-fav:hover {
  background-color: #D79262;
  color: white;
  transition: all 0.3s ease 0s;
}

#button-save-info {
  margin-top: 50px;
  margin-left: 240px;
  width: 200px;
  height: 110px;
  color: white;
  background-color: #A8A787;
  border-radius: 20px;
  z-index: 1;
}

.bookAdminCompSelector {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: left;
  flex: 1;
}

.bookAdminCompSelector > select {
  padding: 1vmin;
  margin: 0.2vmin;
}

#button-save-info:hover {
  background-color: #D79262;
  color: white;
  transition: all 0.3s ease 0s;
}

hr {
  border: 0;
  height: 1px;
  background: black;
}

input {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #000;
  padding-left: 1vmin;
}

#allPage {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* Aligner les éléments en haut */
  align-items: flex-start;
  height: max-content;
  width: 100%;
  margin-top: 0.6rem;
}

#left-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    justify-content: left;
    width: 35%;
    flex: 1;
    padding: 0;

}

#left-left-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  justify-content: left;
  padding-left: 45px;
  padding-right: 80px;
}

#bookInfo {
  flex: 1.5;
  flex-direction: column;
  justify-content: flex-start;
  /* Aligner le contenu en haut */
  align-items: flex-start;
  /* Aligner le contenu à gauche */
  justify-content: top;
}

#bookInfo p {
  margin: 0;
  padding: 0;
  font-size: 2vmin;
}

#left-left-section p {
    margin: 0;
    padding: 0;
    font-size: 2vmin;
}

#right-section {

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* Aligner le contenu en haut */
    color: black;
    width: 50%;
    max-height: 50vh;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 3vmin;
    flex: 0.95;

}

h2 {
  text-align: left;
  font-size: 1.5rem;


}

#information {
  margin-bottom: 20px;
}

#book-resume {
  flex: 1;
  justify-content: space-between;
  max-height: 50vh;
  background-color: white;
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  font-size: 2vmin;
  overflow: auto;
}

#bookImg {
    margin: auto;
    display: block;
    max-width: 300px;
    margin-bottom: 2vmin;
}

.borrow-book {
    font-size: 1.5vmin;
    margin: auto;
    display: block;
    margin-top: 2vmin;
    font-size: 2vmin;
    padding: 1.5vmin;
    background-color: #A8A787;
    border: none;
    border-radius: 3vmin;
    color: #FFF;
    transition: all 0.3s ease 0s;
    width: 100%;
    text-align: center;
    margin-bottom: 2vmin;

}

#popupAddFav {
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
}


.borrow-book:hover {
    background-color: #D79262;
    color: white;
    transition: all 0.3s ease 0s;

}

.file {
    border: none;
    margin-bottom: 1vmin;
    font-size: 2vmin;
}

@media (max-width: 1000px) {
  #allPage {
    flex-direction: column;
    justify-content: flex-start;
    /* Aligner les éléments en haut */
    align-items: flex-start;
    height: max-content;
    width: 100%;
    margin-top: 0.6rem;
  }

    #left-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        justify-content: left;
        width: 100%;
        padding-left: 2vmin;
        padding-right: 2vmin;
        flex: 1;
    }

    #right-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* Aligner le contenu en haut */
        color: black;
        width: 100%;
        max-height: 50vh;

        margin-top: 20px;
    }

    #bookImg {
        margin: auto;
        display: block;
        max-width: 150px;
    }


}
</style>