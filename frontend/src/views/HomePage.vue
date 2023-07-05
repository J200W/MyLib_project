<script setup>
import function_nav from "@/router/functions_nav";
import TheFooter from "@/components/TheFooter.vue";
import { port } from "../../../backend/controllers/Tools_controllers";

</script>

<template>
        <body>
    <div class="container">
        <img src="../assets/logo2.png" width="180" height="180">
        <h1 class="main"> Welcome to MyLib </h1>
        <p> Our goal is to digitize library books to give as many people as possible in the world to have access to any kinds of books and writings, vector of culture and knowledge.</p>
        <p> Like a real library: borrow, read, share, enjoy, then start again, all completely <b>free</b>. </p>
        <router-link class="link" to="/MainPage">Explore Now</router-link>
    </div>
    </body>

    <TheFooter />
</template>



<style scoped>
p {
    color: #6D6779;
    font-weight: bold;
}

h1.main {
    font-weight: 600;
    color: black;
    font-weight: bold;
    font-size: 4rem;

}

.link {
    background-color: #D0AB77;
    padding: 10px 44px;
    border-radius: 20px;
    color: white;
    transition-duration: 0.25s;
}

.link:hover {
    background-color: #D79262;
    /* Green */
    color: white;
}

button {
    background-color: black;
    padding: 10px 44px;
    border-radius: 20px;
    color: white;
    font-family: 'Kanit';

    transition-duration: 0.25s;
}

button:hover {
    background-color: white;
    /* Green */
    color: black;
}


.container {
    margin-top: 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2em
}
</style>

<script>
export default {
    name: 'HomePage',
    data() { return {} },
    mounted() {
    },
    methods: {
        
    }
}
</script>