<template>
    <div id="myEbooksList">
        <div class="myEbooks" v-for="book in books" :key="book.id">
                <router-link class="bookLongCard" :to="{ path: '/BookDetails', query: { name: book.title } }">
                    <img :src="book.src" alt="{{book.title}}" />
                    <p>{{ book.title }}</p>
                    <p>{{ book.author }}</p>
                    <p>{{ book.date }}</p>
                    <p>{{ book.library }}</p>
                    <p>{{ book.time }}</p>
                </router-link>
        </div>
    </div>
</template>

<style>
    #myEbooksList {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 93%;
        margin: auto;
    }

    .myEbooks {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
    }

    .bookLongCard {
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

    .bookLongCard:hover {
        background-color: #f1f1f1;
        color: black;
    }

    .bookLongCard img {
        width: auto;
        height: 100%;
        max-width: 100px;
        flex: 1;
    }

    .bookLongCard p {
        text-align: center;
        flex: 1;
        justify-content: center;
        align-items: center;
        margin: auto;
        font-size: 2vmin;
        padding: 2vmin;
    }

    
    @media screen and (max-width: 900px) {

    .bookLongCard img {
        width: auto;
        height: 100%;
        max-width: 50px;
        flex: 1;
    }

    }
</style>

<script>
export default {
    name: 'MyEbooksContent',
    props: ['books'],
}

</script>