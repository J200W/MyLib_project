<script setup>

const admin = true
const isDisabled = true


</script>


<template>
    <div id="searchBookList">
        <div class="searchBook" v-for="book in books" :key="book.id">
            <component id="book" class="bookLongCard-search" :is="isDisabled & admin ? 'span' : 'router-link'" :to="{ path: '/BookDetails', query: { name: book.title } }">
                <div class="bookImg">
                    <img :src="book.src" alt="{{book.title}}" />
                </div>
                    <div class="bookInfo">
                        <p><span class="titleBook-search">{{ book.title }}</span></p>
                        <p><span>Author: </span>{{ book.author }}</p>
                        <p><span>Date: </span>{{ book.date }}</p>
                        <p><span>Library: </span>{{ book.library }}</p>
                        <p><span>Genre: </span>{{ book.genre }}</p>
                        <p><span>Theme: </span>{{ book.theme }}</p>
                    </div>
                    <div v-show="admin">
                        <button @click="remove_book()" class ="bookButton" id="deleteButton">Delete</button>
                        <button class ="bookButton" id="modifyButton">Modify

                        <!-- ouvrir la page bookDetail du book en question  -->

                        </button>
                        
                    </div> 
                
            </component>
            
        </div>
    </div>
</template>




<script>

export default {
        name: 'SearchBookContent',
        props: ['books'],
        methods: {
            deleteBook(){
                books.value.push({
                id: nextTodoId++,
                title: newTodoText.value
            })
        },
        
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
            // const element = document.getElementById("book");
            // element.remove()
        }
    }
}

</script>

<style>



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
        align-items: flex-end;
        margin-left: 320px;
        flex-direction: row;
        gap: 1.2em;
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
        color: #a8a787;
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
        font-size: 2.5vmin;
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

