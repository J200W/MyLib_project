<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import SearchBookSort from "@/components/SearchBookSort.vue";
import SearchBookContent from "@/components/SearchBookContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import functions_nav from "@/router/functions_nav";
import {port} from "../../../backend/controllers/Tools_controllers";
import { ref, onMounted } from 'vue';
const image = ref(null);
const isLoading = ref(false);
var research_data = ref(sessionStorage.getItem('research'));

var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}

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

            //this.researched_name = research_data.value
            let datas = {
                        researched_name: sessionStorage.getItem('research'),
                        category: [],
                        theme: []
                    };
            fetch("http://localhost:"+ port +"/post_particular_book_url", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                        //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                    },
                    body: JSON.stringify(datas)
                })
            .then(response => response.text())
            .then(data => {
                // Traiter la réponse du serveur
                this.book_list = data.donnees //JSON.parse(data.donnees);
                console.log("le booklist qui va etre enregistré", [this.book_list.donnees])
                sessionStorage.setItem('book_list', data.donnees);
            }).catch(error => {
                // Gérer les erreurs
                console.error("Erreur lors de l'envoi du formulaire :", error);
            });
        
            
        }
    }
}
</script>