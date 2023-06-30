<script setup>

import PopUpAddFav from "@/components/PopUpAddFav.vue";
import ModalBox from "./ModalBox.vue";

const admin = true

</script>


<template>

    <div id="allPage">
        <div id="left-section">
            <div id="left-left-section">
                <p id="bookTitle">Title:
                    <!-- <span>{{ book.title }}</span> -->
                    <span v-if="!admin">{{ book.title }}</span>
                    <input v-else @click="console.log(book.title)" v-model="book.title" placeholder="Author" />
                </p>
                <img id="bookImg" :src="book.src" alt="{{ book.title }}">
                <router-link v-if="!admin" to="/BorrowBook" id="borrow-book">Borrow Book</router-link>

                <button v-else @click="save_book_information()" id="borrow-book">Save Information</button>
                <!-- add the popup -->


                <p>Stock:
                    <!-- <span>{{ book.stock }}</span> -->
                    <span v-if="!admin">{{ book.stock }}</span>
                    <input v-else @click="console.log(book.stock)" v-model="book.stock" placeholder="Author" />
                </p>
                <p>Source:
                    <!-- <span>{{ book.source }}</span> -->
                    <span v-if="!admin">{{ book.source }}</span>
                    <input v-else @click="console.log(book.source)" v-model="book.source" placeholder="Author" />
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
                    <span v-if="!admin">{{ book.date }}</span>
                    <input type="date" v-else @click="console.log(book.date)" v-model="book.date" placeholder="Edition" />
                </p>
                <hr>
                <p>Languages :
                    <span v-if="!admin">{{ book.language }}</span>
                    <!-- <span v-if="!admin" >{{book.language}}</span> -->

                    <select v-else v-model="book.language">
                        <option v-for="num in test_array" :key="num">{{ book.language }}</option>
                    </select>
                    <!-- <input v-else @click="console.log(book.language)" v-model="book.language" placeholder="Edition" /> -->

                </p>
                <hr>
                <p>Genre :
                    <!-- <span>{{ book.genre }}</span> -->
                    <span v-if="!admin">{{ book.genre }}</span>
                    <!-- <input v-else @click="console.log(book.genre)" v-model="book.genre" placeholder="Edition" /> -->
                <div class="bookAdminCompSelector">
                    <select v-if="admin">
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin">
                        <option v-for="c in category" :key="c">{{ c.text }}</option>
                    </select>
                    <select v-if="admin">
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
                    <select v-if="admin" v-model="book.theme">
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin" v-model="book.theme">
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin" v-model="book.theme">
                        <option v-for="t in theme" :key="t">{{ t.text }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                </div>
                </p>
                <hr>
                <p>Pages :
                    <!-- <span>{{ book.pages }}</span> -->
                    <span v-if="!admin">{{ book.pages }}</span>
                    <input v-else @click="console.log(book.pages)" v-model="book.pages" placeholder="Edition" />
                </p>
            </div>
        </div>


            <div id="right-section">
            <h2>Resume :</h2>
            <div id="book-resume">
                <div class="row">
                    <p v-if="!admin">{{ book.description }}</p>
                    <textarea class="resume" v-else v-model="book.description" placeholder="resume"></textarea>
                </div>

            </div>

            <!-- <button v-show="admin" @click="save_book_information()" id="button-save-info">Save Information</button> -->
            <ModalBox id="button-save-info" v-show="admin" @click="save_book_information()"></ModalBox>

        </div>

        <!-- <ModalBox id="button-save-info" v-show="admin" @click="save_book_information()"></ModalBox> -->



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

                    if(test === true){
                        console.log("new informations saved")
                        // ajouter a la db
                    }
                    else{
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

.resume {
    height: 200px;
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

    #button-save-info{
        margin-top: 50px;
        margin-left: 240px;
        width: 200px;
        height: 110px;

    }

    hr {
        border: 0;
        height: 1px;
        background: black;
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