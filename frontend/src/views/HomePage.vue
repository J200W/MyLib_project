<script setup>
import function_nav from "@/router/functions_nav";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
    <div class="container">
        <img src="../assets/logo.png" width="140" height="140">
        <h1 class="main"> Welcome to MyLib </h1>
        <p> Explore our extensive catalog and dive into a world of captivating reads. </p>
        <router-link class="link" to="/MainPage">Explore Now</router-link>
    </div>

    <body>
        This is the Home Page !<br><br>
        <p v-on:click=function_nav.link_MyEbooks.call(this)>MyEbooks</p>
        <p v-on:click=function_nav.link_LogIn.call(this)>LogIn</p>
        <p v-on:click=function_nav.link_SignUp.call(this)>SignUp</p>
        <p v-on:click=function_nav.link_ForgottenPassword.call(this)>ForgottenPassword</p>
        <p v-on:click=function_nav.link_MyAccount.call(this)>MyAccount</p>
        <p v-on:click=function_nav.link_BookDetails.call(this)>BookDetails</p>
        <p v-on:click=function_nav.link_MyFavorites.call(this)>MyFavorites</p>
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
    font-size: 5rem;

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
    margin-top: 120px;
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
    methods: {
    }
}
</script>