<script setup>

const admin = true

const test_array = [1, 2, 3, 4]

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

                    <select v-if="admin">
                        <option v-for="num in test_array" :key="num">{{ book.genre }}</option>
                    </select>
                    <select v-if="admin">
                        <option v-for="num in test_array" :key="num">{{ book.genre }}</option>
                    </select>
                    <select v-if="admin">
                        <option v-for="num in test_array" :key="num">{{ book.genre }}</option>
                    </select>

                </p>
                <hr>
                <p>Theme :
                    <!-- <span>{{ book.theme }}</span> -->
                    <span v-if="!admin">{{ book.theme }}</span>
                    <!-- <input v-else @click="console.log(book.theme)" v-model="book.theme" placeholder="Edition" /> -->
                    <select v-if="admin" v-model="book.theme">
                        <option v-for="num in test_array" :key="num">{{ book.theme }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin" v-model="book.theme">
                        <option v-for="num in test_array" :key="num">{{ book.theme }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
                    <select v-if="admin" v-model="book.theme">
                        <option v-for="num in test_array" :key="num">{{ book.theme }}</option>
                        <!-- <option>Romance</option> -->
                    </select>
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


<style>
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


.resume {
    height: 200px;
}


/* Popup container - can be anything you want */
.popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* The actual popup */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

#button-save-info {
    margin-top: 50px;
    margin-left: 150px;
    width: 110px;
    height: 80px;
    color: white;
    background-color: #A8A787;
    border: none;
    border-radius: 20px;

}

#button-save-info:hover {
    background-color: #D79262;
    color: white;
    transition: all 0.3s ease 0s;
}

#left-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    justify-content: left;
    width: 50%;
}

#left-left-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    justify-content: left;
    padding-left: 20px;
    padding-right: 20px;
}

#bookTitle {
    font-size: 3vmin;
    font-weight: bold;
    margin: auto;
    margin-bottom: 1vmin;
}

#bookInfo {
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    /* Aligner le contenu en haut */
    align-items: flex-start;
    /* Aligner le contenu à gauche */
    justify-content: top;
}

#bookInfo p,
#left-left-section p {
    font-size: 2vmin;
}

#bookInfo select {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: white;
    color: black;
    font-size: 2vmin;
    margin: 0.5vmin;
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
}

h2 {
    text-align: left;
    font-size: 1.5rem;
}

#bookFav {
    display: flex;
    flex-direction: row;
    /* Aligner les éléments en haut */
    align-items: flex-start;
    width: 100%;
}

#button-add-fav {
    justify-content: right;
    margin-left: auto;
    margin-right: 3vmin;
    font-size: 2vmin;
    background-color: #D0AB77;
    border: none;
    border-radius: 20px;
    color: white;
    padding: 0.5vmin;
}   

#book-resume {
    flex: 1;
    justify-content: space-between;
    max-height: 50vh;
    background-color: white;
    margin-top: 20px;
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
    background-color: #D0AB77;
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

    #bookImg {
        margin: auto;
        display: block;
        max-width: 200px;
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

}
</style>


<script>
export default {
    name: 'BookDetailComp',
    props: ['book'],
    methods: {
        save_book_information() {
            console.log("save info to bd")
            // pop up ? 
        },
        add_to_fav() {
            console.log("add to fav to bd")
            //
        }
    }
}


</script>