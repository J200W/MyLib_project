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


        <BookDetailsComp v-if="book && ifborrowed != null" :book="book" :ifBorrowed="ifborrowed" />

        <Carousel :books="this.books" name="Similar books" />
        <Comments v-if="book" :book="book" />
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
            ifborrowed: null,
        }
    },
    mounted() {
        this.fetchBookDetails();
        //this.fetchSimilarBooks();
        //this.fetchIfBorrowed();
      this.fetchComments();
      var admin = sessionStorage.getItem('admin');

      if (admin == null) {
        admin = false;
      }
      else if (admin == "true") {
        admin = true;
      }
      else {
        admin = false;
      }

      if (admin) {
        this.canModify();
      }
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
                  console.log(data.message)
                  this.book = data.donnees;
                  console.log(this.book)
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
        },


      fetchComments() {
        var link = window.location.href;
        // Get the id of the book from the url

        const id_ebook = parseInt(link.split("?id=").pop());
        fetch("http://localhost:" + port + "/get_comments", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_ebook: id_ebook })
        })
            .then(response => response.json())
            .then(data => {
              sessionStorage.setItem('comments', JSON.stringify(data));
              this.comments = data.donnees;
            })
            .catch((error) => {
              console.error('Error:', error);
            });

        fetch("http://localhost:" + port + "/get_book_stat", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_ebook: id_ebook })
        })
            .then(response => response.json())
            .then(data => {
              this.avg_score = data.donnees.avg_score;
              // Keep only 2 digits after the comma$
              if (this.avg_score == null) {
                this.avg_score = 0;
              }
              this.avg_score = parseFloat(this.avg_score).toFixed(1);
              this.nb_com = data.donnees.nb_comments;
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      }
    },

}
</script>