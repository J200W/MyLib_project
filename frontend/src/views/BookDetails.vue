<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import BookDetailsComp from "@/components/BookDetailsComp.vue";
import Comments from "@/components/Comments.vue";
import TheFooter from "@/components/TheFooter.vue";
import Carousel from "@/components/Carousel.vue";


const books = JSON.parse(sessionStorage.getItem('similar_books'));

var link = window.location.href;
// Get the id of the book from the url

var book_id = link.split("?id=").pop();

var book_list = sessionStorage.getItem('book_list');

book_list = JSON.parse(book_list);

const book = book_list[book_id - 1];

var connected = true;

var previousUrl = document.referrer;
previousUrl = previousUrl.split("?id=")[0]
if (previousUrl == "http://localhost:8080/BookDetails") {

}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <body>
        
        <BookDetailsComp :book="book" />
        
        <Carousel :books="books" name="Similar books" />
        <Comments />
    </body>
    <TheFooter />
</template>


<style></style>
  
<script>
export default {
    name: 'BookDetails',
    data() { return {} },
    mounted() {
        this.fetchSimilarBooks();
        window.scrollTo(0, 0);
        window.onload = () => {
            window.scrollTo(0, 0);
        };
    },
    beforeUnmount() {
        window.onload = null;
    },
    methods: {
        fetchSimilarBooks() {
            fetch("http://localhost:80/get_similar_books")
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