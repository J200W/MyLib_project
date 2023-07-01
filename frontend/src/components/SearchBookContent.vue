<script setup>

import functions_nav from "@/router/functions_nav";

const admin = true
const isDisabled = true 
const books = JSON.parse(sessionStorage.getItem('book_list')) //.donnees // TANT QUE BUG
console.log("books = ", [books])

</script>


<template>
    <div id="searchBookList">
        <div class="searchBook" v-for="book in books" :key="book.id">
            <router-link class="bookLongCard-search" :to="{ path: '/BookDetails', query: { id: book.id } }">
                <div class="bookImg">
                    <img :src="book.src" alt="{{book.titre}}" />
                </div>
                    <div class="bookInfo">
                        <p><span class="titleBook-search">{{ book.titre }}</span></p>
                        <p><span>Author: </span>{{ book.auteur }}</p>
                        <p><span>Date: </span>{{ new Date(book.date_parution).toDateString() }}</p>
                        <p><span>Library: </span>{{ book.id_Biblio }}</p>
                        <p><span>Genre: </span>{{ book.name_category }}</p>
                        <p><span>Theme: </span>{{ book.name_theme }}</p>
                    </div>
                    <div v-show="admin">
                        <button @click="remove_book()" class ="bookButton" id="deleteButton">Delete</button>
                        <button @click="display_book_detail()" class ="bookButton" id="modifyButton">
                            Modify

                        <!-- ouvrir la page bookDetail du book en question  -->

                        </button>
                        
                    </div> 
            </router-link>
        </div>
    </div>
</template>




<script>

export default {
        name: 'SearchBookContent',
        props: ['books'],       
        methods: {
            
        
        test_function(){
            let isMouseHover = false
            let test = document.getElementById("deleteButton");
            test.addEventListener("mouseleave", function (event) {
            isMouseHover = false
            event.target.textContent = "mouse out"
            console.log(isMouseHover)
            }, false);
            test.addEventListener("mouseover", function (event) {
            isMouseHover = true
            event.target.textContent = "mouse in"
            console.log(isMouseHover)
            }, false);
        },
        remove_book(){
            console.log("remove book")
            const element = document.getElementById("book");
            console.log(element)
            element.remove()
        },
        display_book_detail(){
            console.log(1)
            functions_nav.link_BookDetails.call(this)
        }
        
    }
}

</script>

<style>

    #manageBookButton{
        text-align: center;
        flex: 1;
        font-size: 2vmin;

    }

    .bookButton{
        border-radius: 10%;
        transition-duration: 0.4s;
    }

    #deleteButton{
        background-color: red;
    }

    #deleteButton:hover{
        background-color: rgb(146, 32, 32);
    }

    #modifyButton{
        background-color: rgb(94, 94, 221);
    }

    #modifyButton:hover{
        background-color: rgb(15, 15, 126);
    }


    .ContainerManageBookButton {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        width: 100%;
        flex-direction: row;
        gap: 1.2em;
        font-size: 2vmin;
        
    }


    #searchBookList {
        --gap: 16px;
        --num-cols: 2;
        --row-height: 300px;

        box-sizing: border-box;
        padding: var(--gap);

        display: grid;
        grid-template-columns: repeat(var(--num-cols), 1fr);
        grid-auto-rows: var(--row-height);
        gap: var(--gap);
        width: 98%;
    }

    .searchBook {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }

    .bookLongCard-search {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        margin: 10px;
        padding: 10px;
        background-color: white;
        text-decoration: none;
        color: black;
        padding: 20px;
    }

    .titleBook-search {
        font-weight: bold;
        font-size: 2.5vmin;
        color: #D79262;
    }

    .bookImg {
        flex: 0.5;
    }

    .bookLongCard-search img {
        height: auto;
        width: auto;
        max-height: 260px;
    }

    .bookLongCard-search:hover {
        background-color: #f1f1f1;
        color: black;
        display: flex;
        flex-direction: row;
    }

    .bookInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        padding-left: 20px;
    }

    .bookInfo p {
        text-align: left;
        flex: 1;
        font-size: 2vmin;
        margin: 3px;
    }

    .bookInfo span {
        font-weight: bold;
    }

    .bookLongCard-search p {
        text-align: left;
        flex: 1;
        font-size: 2vmin;
    }


    @media screen and (max-width: 900px) {

        .bookLongCard-search p {
            text-align: center;
            flex: 1;
            font-size: 2vmin;
        }

        .bookLongCard-search img {
            height: auto;
            width: auto;
            max-height: 200px;
        }


        #searchBookList {
            --gap: 16px;
            --num-cols: 1;
            --row-height: 240px;

            box-sizing: border-box;
            padding: var(--gap);

            display: grid;
            grid-template-columns: repeat(var(--num-cols), 1fr);
            grid-auto-rows: var(--row-height);
            gap: var(--gap);
        }

    }
</style>

