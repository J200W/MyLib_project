<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import Carousel from "@/components/Carousel.vue";
import TheFooter from "@/components/TheFooter.vue";
import { port } from "../../../backend/controllers/Tools_controllers";


//console.log("new : ", new_books)
//console.log("current : ", current_books)
//console.log("discover : ", discover_books)


var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <h1 class="titlePage">Unleash your imagination with an extensive eBook collection</h1>
    <hr class="hr">
    <div id="carousels">
        <Carousel v-if="current_books" :books="current_books" :name="'Continue to read'" />
        <Carousel v-if="new_books" :books="new_books" :name="'New'" />
        <Carousel v-if="discover_books" :books="discover_books" :name="'Discover'" />
    </div>

    <TheFooter />
</template>




<style>
.hr {
    width: 80%;
    margin: auto;
}

#carousels {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 20px;
}

.titlePage {
    margin: auto;
    width: 100%;
    display: block;
    text-align: center;
    font-weight: bolder;
    font-size: 4vmin;
    margin-bottom: 20px;
}
</style>

<script>


export default {
    name: 'MainPage',
    data() {
        return {
            connected: null,
            new_books: null,
            current_books: null,
            discover_books: null
        }
    },
    mounted() {
        this.fetchMainPage();
    },
    methods: {
        fetchMainPage() {
            var email = sessionStorage.getItem('user_email');
            if (email == null) {
                email = "";
            }
            var datas = { email: email }

            fetch("http://localhost:" + port + "/new_books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                    //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(datas)
            })
                .then(response => response.json())
                .then(data => {
                    this.new_books = data;
                })
                .catch(error => {
                    console.log(error);
                });

            fetch("http://localhost:" + port + "/discover_books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                    //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(datas)
            })
                .then(response => response.json())
                .then(data => {
                    this.discover_books = data;
                    console.log(this.discover_books);
                })
                .catch(error => {
                    console.log(error);
                });

            fetch("http://localhost:" + port + "/current_books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                    //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(datas)
            })
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('current_books', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>