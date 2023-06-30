<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import Carousel from "@/components/Carousel.vue";
import TheFooter from "@/components/TheFooter.vue";
import { port } from "../../../backend/controllers/Tools_controllers";


var new_books = JSON.parse(sessionStorage.getItem('new_books'))
var current_books = JSON.parse(sessionStorage.getItem('current_books'))
if (current_books == null) {
    current_books = []
}
var discover_books = JSON.parse(sessionStorage.getItem('discover_books'))


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
        <Carousel v-if="current_books.length>0" :books="current_books" :name="'Continue to read'" />
        <Carousel v-if="new_books.length>0" :books="new_books" :name="'New'" />
        <Carousel v-if="discover_books.length>0" :books="discover_books" :name="'Discover'" />
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

    },
    methods: {
    }
}
</script>