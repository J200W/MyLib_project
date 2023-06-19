<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import MyEbooksSort from "@/components/MyEbooksSort.vue";
    import MyEbooksContent from "@/components/MyEbooksContent.vue";
    import TheFooter from "@/components/TheFooter.vue";

    const books = [
        {
            id: 1,
            title: "One Piece Tome 96",
            src: require("@/assets/onepiece96.png"),
            author: "Eiichiro Oda",
            date: "04/11/2020",
            library: "Bibliothèque de l'Université de Lille",
            time: "34d 12h 32m",
        },

        {
            id: 2,
            title: "One Piece Tome 97",
            src: require("@/assets/onepiece97.png"),
            author: "Eiichiro Oda",
            date: "03/02/2021",
            library: "Bibliothèque de l'Université de Paris 8",
            time: "12d 23h 12m",
        },
        {
            id: 3,
            title: "One Piece Tome 98",
            src: require("@/assets/onepiece98.png"),
            author: "Eiichiro Oda",
            date: "07/04/2021",
            library: "Bibliothèque Municipale de Lyon",
            time: "4d 12h 32m",
        },
        {
            id: 4,
            title: "One Piece Tome 99",
            src: require("@/assets/onepiece99.png"),
            author: "Eiichiro Oda",
            date: "04/08/2021",
            library: "Bibliothèque Municipale de Livry-Gargan",
            time: "1d 12h 32m",
        },
    ]

    var connected = true;
</script>

<template>

    <NavbarConnected v-if = "connected" />
    <NavbarNonConnected v-if = "!connected" />
    <body>
        <MyEbooksSort pseudo="Username" />
        <MyEbooksContent :books="books" />
    </body>
    <TheFooter />
</template>
  
<style>
.nav_bar {
    color: rgb(0, 0, 0);
    background-color: rgb(225, 128, 67);
}
</style>
  
<script>
export default {
    name: 'MyEbooks',
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
        link_MainPage: function(event){
            this.$router.push({path: '/MainPage'})
        },
    }
}
</script>