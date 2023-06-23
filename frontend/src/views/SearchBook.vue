<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import SearchBookSort from "@/components/SearchBookSort.vue";
import SearchBookContent from "@/components/SearchBookContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import { ref, onMounted } from 'vue';
const image = ref(null);
const isLoading = ref(false);
var research_data = sessionStorage.getItem('research');

var connected = true;

</script>

<template>
    <div v-if="isLoading" class="loading">
        <p id="loading">Loading...</p>
    </div>
    <div v-else>
        <NavbarConnected v-if="connected" />
        <NavbarNonConnected v-if="!connected" />
        <SearchBookSort :result="research_data" />
        <SearchBookContent :books="book_list" />
        <TheFooter />
    </div>
</template>
  

<style>
#loading {
    font-size: 30px;
    font-weight: bold;
    color: #DAA520;
    margin: auto;
    width: 100%;
    display: block;
    text-align: center;
    margin-top: 20%;
}
</style>
  
<script>

import functions_nav from "@/router/functions_nav";

export default {
    name: 'SearchBook',
    data() {
        return {
            researched_name: '',
            book_list: [],
        };
    },
    mounted() {
        this.fetchBooksUrl();
    },
    methods: {
        fetchBooksUrl() {
            fetch("http://localhost:80/get_books_url")
                .then(response => response.text())
                .then(data => {
                    // Traiter la réponse du serveur
                    console.log("Recherche reçu", data);
                    this.book_list = JSON.parse(data);
                    sessionStorage.setItem('book_list', data);
                }).catch(error => {
                    // Gérer les erreurs
                    console.error("Erreur lors de l'envoi du formulaire :", error);
                });
        }
    }
}
</script>