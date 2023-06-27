<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import Carousel from "@/components/Carousel.vue";
import TheFooter from "@/components/TheFooter.vue";
import {port } from "../../../backend/controllers/Tools_controllers";


const new_books = JSON.parse(sessionStorage.getItem('new_books'))
const current_books = JSON.parse(sessionStorage.getItem('current_books'))
const discover_books = JSON.parse(sessionStorage.getItem('discover_books'))


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
        <Carousel :books="current_books" :name="'Continue to read'" />
        <Carousel :books="new_books" :name="'New'" />
        <Carousel :books="discover_books" :name="'Discover'" />
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
    data() { return {} },
    mounted() {
        this.fetchMainPage();
    },
    methods: {
        fetchMainPage() {
            fetch("http://localhost:" + port + "/get_new_books")
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('new_books', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                });

            fetch("http://localhost:" + port + "/get_current_books")
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('current_books', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                });
            fetch("http://localhost:" + port + "/get_discover_books")
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('discover_books', JSON.stringify(data));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>