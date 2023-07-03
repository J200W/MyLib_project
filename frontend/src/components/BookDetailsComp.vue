<script setup>

import PopUpAddFav from "@/components/PopUpAddFav.vue";
import ModalBox from "./ModalBox.vue";
import moment from "moment";
import { port } from "../../../backend/controllers/Tools_controllers";

var admin = sessionStorage.getItem("admin");


if (admin == null) {
    admin = false;
}
else if (admin == "true") {
    admin = true;
} else {
    admin = false;
}

var category = [
    { value: "None", text: "None" },
    { value: "adventure", text: "Adventure" },
    { value: "romance", text: "Romance" },
    { value: "mystery", text: "Mystery" },
    { value: "fantasy", text: "Fantasy" },
    { value: "horror", text: "Horror" },
    { value: "thriller", text: "Thriller" },
    { value: "historical-fiction", text: "Historical Fiction" },
    { value: "self-help", text: "Self-Help" },
    { value: "science", text: "Science" },
    { value: "dystopian", text: "Dystopian" },
    { value: "humor", text: "Humor" },
    { value: "crime", text: "Crime" },
    { value: "young-adult", text: "Young Adult" },
    { value: "philosophy", text: "Philosophy" },
    { value: "business", text: "Business" },
    { value: "travel", text: "Travel" },
    { value: "memoir", text: "Memoir" },
    { value: "historical", text: "Historical" },
    { value: "children", text: "Children" },
    { value: "graphic-novel", text: "Graphic Novel" }
];

var theme = [
    { "value": "None", "text": "None" },
    { "value": "love", "text": "Love" },
    { "value": "friendship", "text": "Friendship" },
    { "value": "family", "text": "Family" },
    { "value": "war", "text": "War" },
    { "value": "survival", "text": "Survival" },
    { "value": "identity", "text": "Identity" },
    { "value": "betrayal", "text": "Betrayal" },
    { "value": "forgiveness", "text": "Forgiveness" },
    { "value": "courage", "text": "Courage" },
    { "value": "loss", "text": "Loss" },
    { "value": "resilience", "text": "Resilience" },
    { "value": "redemption", "text": "Redemption" },
    { "value": "discovery", "text": "Discovery" },
    { "value": "hope", "text": "Hope" },
    { "value": "adventure", "text": "Adventure" },
    { "value": "transformation", "text": "Transformation" },
    { "value": "coming-of-age", "text": "Coming of Age" },
    { "value": "self-discovery", "text": "Self-Discovery" },
    { "value": "sacrifice", "text": "Sacrifice" },
    { "value": "justice", "text": "Justice" },
    { "value": "manga", "text": "Manga" },
    { "value": "comics", "text": "Comics" }
];

</script>


<template>
    <form id="allPage" @submit.prevent="save_book_information()">
        <div id="left-section">
            <div id="left-left-section">
                <p v-if="admin" id="bookTitle">Title:
                    <!-- <span>{{ book.title }}</span> -->
                    <span v-if="!admin">{{ book.titre }}</span>
                    <input id="title" v-else v-model="book.titre" placeholder="Title" required />
                </p>
                <p id="bookTitle" v-else>
                    <span>{{ book.titre }}</span>
                </p>
                <img id="bookImg" :src="book.src" alt="{{ book.titre }}">
                <div v-if="admin">
                    <p>
                        Book PDF :
                    </p>
                    <input type="file" name="pdf" class="file" id="filePDF" accept=".pdf" required>
                    <p>
                        Image :
                    </p>
                    <input type="file" name="img" id="fileIMG" class="file" @change="previewImg" accept="image/*" required>
                </div>
                <router-link v-if="!borrowed && !admin" to="/BorrowBook" id="borrow-book">Borrow Book</router-link>
                <router-link v-if="borrowed && !admin" to="/ReadBook" id="borrow-book">Read Book</router-link>
                <!-- add the popup -->
                <!-- <PopUpAddFav v-if="!admin" :book="book" /> -->
                <p>Library:
                    <span v-if="!admin">{{ book.library }}</span>
                    <input type="text" id="library" v-else v-model="book.library" readonly />
                </p>
                <p>Stock:
                    <span v-if="!admin">{{ book.stock }}</span>
                    <input min="0" type="number" id="stock" v-else v-model="book.stock" />
                </p>
                <input v-if="admin" required id="borrow-book" type="submit" value="Save Information">
            </div>
            <div id="bookInfo">
                <div id="bookFav">
                    <h2>Info</h2>
                    <button v-if="!admin" @click="add_to_fav()" id="button-add-fav">Add to Favorites</button>
                </div>
                <p>Author :
                    <span v-if="!admin">{{ book.author }}</span>
                    <input type="text" id="author" v-else  v-model="book.author"
                        placeholder="Author" />

                </p>
                <hr>
                <p>Edition :
                    <!-- <span>{{book.edition}}</span> -->
                    <span v-if="!admin">{{ book.edition }}</span>
                    <input type="text" id="editor" v-else v-model="book.edition"
                        placeholder="Edition" />
                </p>
                <hr>
                <p>Release date :
                    <!-- <span>{{ book.date }}</span> -->
                    <span v-if="!admin">{{ moment(book.date).format("YYYY-MM-DD") }}</span>
                    <input v-else id="date" type="date" value="{{ book.date }}"
                        placeholder="{{ moment(book.date).format('YYYY-MM-DD') }}" />
                </p>
                <hr>
                <p>Language :
                    <span v-if="!admin">{{ book.language }}</span>
                    <!-- <span v-if="!admin" >{{book.language}}</span> -->
                    <input type="text" id="language" v-else v-model="book.language" placeholder="Language" />
                </p>
                <hr>
                <p>Categories :
                    <!-- <span>{{ book.category }}</span> -->
                    <span v-if="!admin">{{ book.category[0] }}, {{ book.category[1] }}, {{ book.category[2] }}</span>
                    <!-- <input v-else @click="console.log(book.category)" v-model="book.category" placeholder="Edition" /> -->
                <div class="bookAdminCompSelector">
                    <select v-if="admin" id="category0">
                        <option :key="book.category[0]">{{ book.category[0] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin" id="category1">
                        <option :key="book.category[1]">{{ book.category[1] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin" id="category2">
                        <option :key="book.category[2]">{{ book.category[2] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                </div>

                </p>
                <hr>
                <p>Themes :
                    <!-- <span>{{ book.theme }}</span> -->
                    <span v-if="!admin">{{ book.theme[0] }}, {{ book.theme[1] }}, {{ book.theme[2] }}</span>
                    <!-- <input v-else @click="console.log(book.theme)" v-model="book.theme" placeholder="Edition" /> -->
                <div class="bookAdminCompSelector">
                    <select v-if="admin" id="theme0">
                        <option :key="book.theme[0]">{{ book.theme[0] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin" id="theme1">
                        <option :key="book.theme[1]">{{ book.theme[1] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin" id="theme2">
                        <option :key="book.theme[2]">{{ book.theme[2] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                </div>
                </p>
                <hr>
                <p>Pages :
                    <!-- <span>{{ book.pages }}</span> -->
                    <span v-if="!admin">{{ book.pages }}</span>
                    <input id="page" type="number" min="0" v-else v-model="book.pages"
                        placeholder="Page" />
                </p>
            </div>
        </div>

        <div id="right-section">
            <h2>Resume</h2>
            <div id="book-resume">
                <div class="row">
                    <p v-if="!admin">{{ book.description }}</p>
                    <textarea id="resume" class="resume" v-else v-model="book.description" placeholder="resume"></textarea>
                </div>
            </div>

        </div>
    </form>
</template>

<script>


let save = false

const test_array = [1, 2, 3, 4]

export default {
    name: 'BookDetailComp',
    data() {
        return {
            borrowed: null,
        }
    },
    props: ['book'],
    mounted() {
        this.fetchBorrowed()
    },
    methods: {
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

            if (test === true) {
                console.log("new informations saved")
                // ajouter a la db
            }
            else {
                console.log("save cancel")
                // ne rien faire de plus
            }
        },

        fetchBorrowed() {
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

        save_book_information() {
            // Get informations from the form
            const fileIMG = document.getElementById("fileIMG").files[0];
            const filePDF = document.getElementById('filePDF').files[0];
            const title = document.getElementById("title").value
            const author = document.getElementById("author").value
            const editor = document.getElementById("editor").value
            const stock = document.getElementById("stock").value
            const date = document.getElementById("date").value
            const language = document.getElementById("language").value
            const page = document.getElementById("page").value
            const resume = document.getElementById("resume").value
            const category0 = document.getElementById("category0").value
            const category1 = document.getElementById("category1").value
            const category2 = document.getElementById("category2").value
            const theme0 = document.getElementById("theme0").value
            const theme1 = document.getElementById("theme1").value
            const theme2 = document.getElementById("theme2").value

            let datas = {
                id_ebook: this.book.id_ebook,
                titre: title,
                auteur: author,
                editeur: editor,
                date: date,
                page: page,
                stock: stock,
                langue: language,
                description: resume,
                categories: [category0, category1, category2],
                themes: [theme0, theme1, theme2],
                img: fileIMG.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                pdf: filePDF.name.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                admin: sessionStorage.getItem('user_email'),
            }

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
        add_to_fav() {
            console.log("add to fav to bd")

            //
        }

    }
}

</script>

<style scoped>
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
    margin: auto;
    font-size: 2vmin;
    margin-bottom: 1vmin;
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

#button-add-fav {
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

.bookAdminCompSelector>select {
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

input[type="text"],
input[type="date"],
input[type="number"] {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #000;
    padding-left: 1vmin;
}

.file {
    border: none;
    margin-bottom: 1vmin;
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
    flex: 0.75;
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
}

#borrow-book {
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

#borrow-book:hover {
    background-color: #D79262;
    color: white;
    transition: all 0.3s ease 0s;
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
        padding-left: 20px;
        padding-right: 20px;
    }

    #right-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* Aligner le contenu en haut */
        color: black;
        width: 100%;
        max-height: 50vh;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 20px;
    }

    #bookImg {
        margin: auto;
        display: block;
        max-width: 200px;
    }

}
</style>