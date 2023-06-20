
});

const admin = true

</script>

<template>
    <div id="allPage">
        <div id="left-section">
            <div id="left-left-section">
                <img id="bookImg" :src="book.src" alt="{{ book.title }}">
                <router-link to="/BorrowBook" id="borrow-book">Borrow Book</router-link>
                <p>Stock: 
                    <span>{{ book.stock }}</span>
                </p>
                <p>Source: <span>{{ book.source }}</span></p>
            </div>
            <div v-show="admin" id="bookInfo">
                <h2>Info</h2>
                <p>Author : <span>{{book.author}}</span></p>
                <hr>
                <p>Edition : <span>{{book.edition}}</span></p>
                <hr>
                <p>Release : <span>{{ book.date }}</span></p>
                <hr>
                <p>Languages : <span>{{ book.langue }}</span></p>
                <hr>
                <p>Genre : <span>{{ book.genre }}</span></p>
                <hr>
                <p>Theme : <span>{{ book.theme }}</span></p>
                <hr>
                <p>Pages : <span>{{  book.page }}</span></p>
            </div>
        </div>

        <div id="right-section">
            <h2>Resume</h2>
            <div id="book-resume">
                <div class="row">
                    <p>{{ book.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BookDetailComp',
        props: ['book'],
        data() {
            return {
            message: ''
            }
        }
    }

</script>

<style>

    

    hr {
        border: 0;
        height: 1px;
        background: black;
    }

    #allPage {
        display: flex;
        flex-direction: row;
        justify-content: flex-start; /* Aligner les éléments en haut */
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

    #bookInfo {
        flex: 1;
        flex-direction: column;
        justify-content: flex-start; /* Aligner le contenu en haut */
        align-items: flex-start; /* Aligner le contenu à gauche */
        justify-content: top;
    }

    #right-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Aligner le contenu en haut */
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

    #borrow-book:hover {
        background-color: #D79262;
        color: white;
        transition: all 0.3s ease 0s;
    }

    @media (max-width: 1000px) {
        #allPage {
            flex-direction: column;
            justify-content: flex-start; /* Aligner les éléments en haut */
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
            justify-content: flex-start; /* Aligner le contenu en haut */
            color: black;
            width: 100%;
            max-height: 50vh;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 20px;
        }
        
    }

</style>