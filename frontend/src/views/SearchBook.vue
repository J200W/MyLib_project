<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import SearchBookSort from "@/components/SearchBookSort.vue";
    import SearchBookContent from "@/components/SearchBookContent.vue";
    import TheFooter from "@/components/TheFooter.vue";

    const books = [
        {
            id: 1,
            title: "One Piece Tome 96",
            src: require("@/assets/onepiece96.png"),
            author: "Eiichiro Oda",
            date: "04/11/2020",
            library: "Bibliothèque de l'Université de Lille",
            genre: "Manga",
        },

        {
            id: 2,
            title: "One Piece Tome 97",
            src: require("@/assets/onepiece97.png"),
            author: "Eiichiro Oda",
            date: "03/02/2021",
            library: "Bibliothèque de l'Université de Paris 8",
            genre: "Manga",
        },
        {
            id: 3,
            title: "One Piece Tome 98",
            src: require("@/assets/onepiece98.png"),
            author: "Eiichiro Oda",
            date: "07/04/2021",
            library: "Bibliothèque Municipale de Lyon",
            genre: "Manga",
        },
        {
            id: 4,
            title: "One Piece Tome 99",
            src: require("@/assets/onepiece99.png"),
            author: "Eiichiro Oda",
            date: "04/08/2021",
            library: "Bibliothèque Municipale de Livry-Gargan",
            genre: "Manga",
        },
    ]

    var connected = true;
</script>

<template>
    <NavbarConnected v-if = "connected" />
    <NavbarNonConnected v-if = "!connected" />
    <SearchBookSort result="input result" />
    <SearchBookContent :books="books"/>
    <TheFooter />
</template>
  

<style></style>
  
<script>
export default {
    name: 'SearchBook',
    data() { return {} },
    methods: {
    }
}
</script>