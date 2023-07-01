<script setup>

import PopUpAddFav from "@/components/PopUpAddFav.vue";
import ModalBox from "./ModalBox.vue";
import moment from "moment";

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

</script>


<template>
    <div id="allPage">
        <div id="left-section">
            <div id="left-left-section">
                <p v-if="admin" id="bookTitle">Title:
                    <!-- <span>{{ book.title }}</span> -->
                    <span v-if="!admin">{{ book.titre }}</span>
                    <input v-else v-model="book.titre" placeholder="Author" />
                </p>
                <p id="bookTitle" v-else>
                    <span>{{ book.titre }}</span>
                </p>
                <img id="bookImg" :src="book.src" alt="{{ book.titre }}">
                <router-link v-if="!admin" to="/BorrowBook" id="borrow-book">Borrow Book</router-link>

                <button v-else @click="save_book_information()" id="borrow-book">Save Information</button>
                <!-- add the popup -->


                <!--
                <p>Stock:
                    <span>{{ book.stock }}</span>
                    <span v-if="!admin">{{ book.stock }}</span>
                    <input v-else @click="console.log(book.stock)" v-model="book.stock" type="number" min="0" />
                </p> 
                -->
                <p>Source:
                    <!-- <span>{{ book.source }}</span> -->
                    <span v-if="!admin">{{ book.library }}</span>
                    <input v-else v-model="book.library" readonly/>
                </p>
            </div>
            <div id="bookInfo">
                <div id="bookFav">
                    <h2>Info</h2>
                    <button v-if="!admin" @click="add_to_fav()" id="button-add-fav">Add to Favorites</button>
                </div>
                <p>Author :
                    <span v-if="!admin">{{ book.author }}</span>
                    <input v-else @click="console.log(book.author)" v-model="book.author" placeholder="Author" />

                </p>
                <hr>
                <p>Edition :
                    <!-- <span>{{book.edition}}</span> -->
                    <span v-if="!admin">{{ book.edition }}</span>
                    <input v-else @click="console.log(book.edition)" v-model="book.edition" placeholder="Edition" />
                </p>
                <hr>
                <p>Release :
                    <!-- <span>{{ book.date }}</span> -->
                    <span v-if="!admin">{{ moment(book.date).format("YYYY-MM-DD") }}</span>
                    <input type="date" v-else @click="console.log(book.date)" v-model="book.date" placeholder="{{ moment(book.date).format('YYYY-MM-DD') }}" />
                </p>
                <hr>
                <p>Languages :
                    <span v-if="!admin">{{ book.language }}</span>
                    <!-- <span v-if="!admin" >{{book.language}}</span> -->
                    <input v-else v-model="book.language" placeholder="Language" />
                </p>
                <hr>
                <p>Category :
                    <!-- <span>{{ book.category }}</span> -->
                    <span v-if="!admin">{{ book.category }}</span>
                    <!-- <input v-else @click="console.log(book.category)" v-model="book.category" placeholder="Edition" /> -->
                <div class="bookAdminCompSelector">
                    <select v-if="admin">
                        <option :key="book.category[0]">{{ book.category[0] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin">
                        <option :key="book.category[1]">{{ book.category[1] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin">
                        <option :key="book.category[2]">{{ book.category[2] }}</option>
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                </div>

                </p>
                <hr>
                <p>Theme :
                    <!-- <span>{{ book.theme }}</span> -->
                    <span v-if="!admin">{{ book.theme }}</span>
                    <!-- <input v-else @click="console.log(book.theme)" v-model="book.theme" placeholder="Edition" /> -->
                <div class="bookAdminCompSelector">
                    <select v-if="admin">
                        <option :key="book.theme[0]">{{ book.theme[0] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin">
                        <option :key="book.theme[1]">{{ book.theme[1] }}</option>
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin">
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
                    <input type="number" min="0" v-else @click="console.log(book.pages)" v-model="book.pages" placeholder="Edition" />
                </p>
            </div>
        </div>

        <div id="right-section">
            <h2>Resume</h2>
            <div id="book-resume">
                <div class="row">
                    <p v-if="!admin">{{ book.description }}</p>
                    <textarea class="resume" v-else v-model="book.description" placeholder="resume"></textarea>
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
    props: ['book'],
    methods: {
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

        save_book_information() {
            // this.confirm_action()
            if (save === false) {
                console.log("new informations saved")
                save = true

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
    margin:auto;
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
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    background-color: #A8A787;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
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