<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import MyEbooksSort from "@/components/MyEbooksSort.vue";
import MyEbooksContent from "@/components/MyEbooksContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import { port } from "../../../backend/controllers/Tools_controllers";

var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}
else if (connected == "true") {
    connected = true;
}
else {
    connected = false;
}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <body>
        <h1 id="title-MyEbook">eBooks of {{ pseudo }}</h1>
        <MyEbooksContent :books=books :fav=false />
    </body>
    <TheFooter />
</template>
  
<style scoped>
#title-MyEbook {
    font-size: 5vmin;
    text-align: left;
    color: "#000000";
    margin-left: 5%;
}

.nav_bar {
    color: rgb(0, 0, 0);
    background-color: rgb(225, 128, 67);
}
</style>
  
<script>
export default {
    name: 'MyEbooks',
    data() {
        return {
            books: [],
            pseudo: sessionStorage.getItem('user_pseudo')
        }
    },
    mounted() {
        this.fetchMyBooksPage()
    },
    methods: {
        fetchUserData() {
        },
        fetchMyBooksPage() {
            let url = "http://localhost:" + port + "/my_books"
            const requestBody = {
                email: sessionStorage.getItem('user_email')
            };
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                    //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => {
                    console.log('pouet');
                    console.log('donc on a a raw', response);
                    if (response.status >= 200 && response.status <= 299) {
                        const temp = response.json();
                        console.log('pouet bis', temp);
                        return temp;
                    } else {
                        return response;
                    }
                })
                .then(data => {
                    // Traiter la réponse du serveur
                    //data = JSON.parse(data);
                    console.log('et ici ?', data)
                    if (data.status == "success") {
                        this.books = data.donnees
                    } else {
                        this.books = []
                        console.log("no books borrowed")
                    }


                }).catch(error => {
                    // Gérer les erreurs
                    console.error("Erreur lors de la réception du formulaire du formulaire :", error);
                });
        }
    }
}
</script>