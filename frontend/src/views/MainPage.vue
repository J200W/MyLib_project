<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import Carousel from "@/components/Carousel.vue";
    import TheFooter from "@/components/TheFooter.vue";

    const books = [
        {
            id: 1,
            src: require("@/assets/onepiece96.png"),
            title: "One Piece 96",
        },

        {
            id: 2,
            src: require("@/assets/onepiece97.png"),
            title: "One Piece 97",
        },

        {
            id: 3,
            src: require("@/assets/onepiece98.png"),
            title: "One Piece 98",
        },

        {
            id: 4,
            src: require("@/assets/onepiece99.png"),
            title: "One Piece 99",
        }
    ]
    var connected = true;
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <h1 id="titleMainPage">Unleash your imagination with an extensive eBook collection</h1>
    <hr id="hr">
    <div id="carousels">
        <Carousel :books="books" :name="'Continue to read'" />
        <Carousel :books="books" :name="'New'" />
        <Carousel :books="books" :name="'Discover'" />
    </div>

    <TheFooter />
    
</template>




<style>

#hr {
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

#titleMainPage {
    margin: auto;
    width: 100%;
    display: block;
    text-align: center;
    font-weight: bolder;
    font-size: 5vmin;
    margin-bottom: 20px;
}
</style>

<script>
export default {
    name: 'MainPage',
    data() { return {} },
    methods: {
        link_HomePage: function (event) {
            this.$router.push({ path: '/' })
        },
        link_LogIn: function (event) {
            this.$router.push({ path: '/LogIn' })
        },
        link_SignUp: function (event) {
            this.$router.push({ path: '/SignUp' })
        },
        link_ForgottenPassword: function (event) {
            this.$router.push({ path: '/ForgottenPassword' })
        },
        link_MyAccount: function (event) {
            this.$router.push({ path: '/MyAccount' })
        },
        link_BookDetails: function (event) {
            this.$router.push({ path: '/BookDetails' })
        },
        link_MyEbooks: function (event) {
            this.$router.push({ path: '/MyEbooks' })
        },
        link_MyFavorites: function (event) {
            this.$router.push({ path: '/MyFavorites' })
        },
        link_MyHistory: function (event) {
            this.$router.push({ path: '/MyHistory' })
        },
        link_BorrowBook: function (event) {
            this.$router.push({ path: '/BorrowBook' })
        },
        link_ReadBook: function (event) {
            this.$router.push({ path: '/ReadBook' })
        },
        link_SearchBook: function (event) {
            this.$router.push({ path: '/SearchBook' })
        },
        link_ShareBook: function (event) {
            this.$router.push({ path: '/ShareBook' })
        },
        link_MainPage: function (event) {
            this.$router.push({ path: '/MainPage' })
        },
    }
}
</script>