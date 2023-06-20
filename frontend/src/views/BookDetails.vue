<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import BookDetailsComp from "@/components/BookDetailsComp.vue";
    import Comments from "@/components/Comments.vue";
    import TheFooter from "@/components/TheFooter.vue";
    import Carousel from "@/components/Carousel.vue";

    const book = 
        {
            id: 1,
            title: "One Piece Tome 96",
            src: require("@/assets/onepiece96.png"),
            author: "Eiichiro Oda",
            edition: "Glenat",
            date: "04/11/2020",
            langue: "french",
            library: "Bibliothèque de l'Université de Lille",
            description:" Luffy va-t-il réussir à redonner le sourire aux habitants du pays des Wa et à libérer cette île qui a traversé de rudes épreuves au cours des vingt années de domination de Kaido et Orochi ?! Tout repose désormais sur la puissance de ses poings ! L’arc du pays des Wa est à son apogée ! Les aventures de Luffy à la poursuite du One Piece continuent ! Sed eleifend lectus id semper accumsan. Sed lobortis id ligula eget blandit. Integer interdum iaculis nunc, sed porttitor magna tincidunt in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam lobortis accumsan tempor. Aliquam sollicitudin pulvinar est, quis convallis tellus.",
            genre: "Manga",
            theme: "Romance",
            page: "120",
            stock: "8",
            source: "Crimée, bibliotheque",
        }

    
    var connected = true;

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
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <body>
        <BookDetailsComp :book="book" />
        <Comments/>
    </body>
    <TheFooter />
</template>


<style>


</style>
  
<script>
export default {
    name: 'BookDetails',
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