<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import BookDetailsComp from "@/components/BookDetailsComp.vue";
import Comments from "@/components/Comments.vue";
import TheFooter from "@/components/TheFooter.vue";
import Carousel from "@/components/Carousel.vue";
import { port } from "../../../backend/controllers/Tools_controllers";


const books = JSON.parse(sessionStorage.getItem('similar_books'));



var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <body>


        <BookDetailsComp v-if="book" :book="book" />

        <Carousel :books="this.books" name="Similar books" />
        <Comments />
    </body>
    <TheFooter />
</template>


<style></style>
  
<script>

export default {
    name: 'BookDetails',
    data() {
        return {
            book: null,
        }
    },
    mounted() {
        this.fetchBookDetails();
        this.fetchSimilarBooks();
        window.scrollTo(0, 0);
        window.onload = () => {
            window.scrollTo(0, 0);
        };
    },
    watch: {
        '$route': 'fetchBookDetails'
    },
    beforeUnmount() {
        window.onload = null;
    },
    components: {
        NavbarConnected,
        NavbarNonConnected,
        BookDetailsComp,
        Comments,
        TheFooter,
        Carousel
    },
    methods: {
        fetchBookDetails() {
            var link = window.location.href;
            // Get the id of the book from the url

            const id_ebook = parseInt(link.split("?id=").pop());

            fetch("http://localhost:" + port + "/book_details", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_ebook: id_ebook })
            })
                .then(response => response.json())
                .then(data => {
                    this.book = data.donnees;
                })
                .then(() => {
                    sessionStorage.setItem('book', JSON.stringify(this.book));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        fetchSimilarBooks() {
            var link = window.location.href;
            // Get the id of the book from the url

            const id_ebook = parseInt(link.split("?id=").pop());
            fetch("http://localhost:" + port + "/similar_books", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_ebook: id_ebook })
            })
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('similar_books', JSON.stringify(data));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    },
}
</script>