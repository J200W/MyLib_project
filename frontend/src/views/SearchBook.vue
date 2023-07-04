<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import SearchBookSort from "@/components/SearchBookSort.vue";
import SearchBookContent from "@/components/SearchBookContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import functions_nav from "@/router/functions_nav";
import { port } from "../../../backend/controllers/Tools_controllers";
import { ref, onMounted } from 'vue';
const image = ref(null);
const isLoading = ref(false);
var research_data = sessionStorage.getItem('research');

var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <h1 id="title-MyEbook">Results for "{{ this.search }}"</h1>
    <SearchBookSort :result="research_data" @category="updateCategory" @theme="updateTheme" />
    <SearchBookContent v-if="book_list" :books="book_list" :manage="false" />
    <TheFooter />
</template>
  

<style>
#title-MyEbook {
    font-size: 5vmin;
    text-align: left;
    color: "#000000";
    margin-left: 5%;
}

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



export default {
    name: 'SearchBook',
    data() {
        return {
            search: '',
            book_list: [],
        };
    },
    mounted() {
        const category = sessionStorage.getItem('category');
        const theme = sessionStorage.getItem('theme');
        this.fetchBooksUrl();
    },
    methods: {
        updateCategory(category) {
            sessionStorage.setItem('category', category);
            window.location.reload();
        },
        updateTheme(theme) {
            sessionStorage.setItem('theme', theme);
            window.location.reload();
        },
        fetchBooksUrl() {
            var link = window.location.href;
            var url = new URL(link);
            this.search = url.searchParams.get("search");

            if (this.search == null) {
                this.search = sessionStorage.getItem('search');
            }
            else sessionStorage.setItem('search', this.search);

            this.search = this.search.replace(/\+/g, ' ');
            sessionStorage.setItem('search', this.search);
            var category = url.searchParams.get("category");
            var theme = url.searchParams.get("theme");
            var sort = url.searchParams.get("sort_filter");

            // replace + by space
            this.search = this.search.replace(/\+/g, ' ');
            this.search = this.search.replace("%C5%93", 'oe');
            this.search = this.search.replace("%27", '\'');

            let datas = {
                search: this.search,
                category: category,
                theme: theme,
                sort_filter: sort
            };


            fetch("http://localhost:" + port + "/list_books",
                {
                    method: 'POST',
                    body: JSON.stringify(datas),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.text())
                .then(data => {
                    // Traiter la réponse du serveur
                    var books = JSON.parse(data)
                    this.book_list = books.donnees;

                }).catch(error => {
                    // Gérer les erreurs
                    console.error("Erreur lors de l'envoi du formulaire :", error);
                });
        }
    }
}
</script>