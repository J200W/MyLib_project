<script setup>

    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from '@/components/TheFooter.vue'
    import MyEbooksSort from "@/components/MyEbooksSort.vue";
    import MyEbooksContent from "@/components/MyEbooksContent.vue";
    
    const books_fav = [
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
    ]

    var connected = sessionStorage.getItem('connected');

    if (connected == null) {
        connected = false;
    }

</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <h1>Mes favoris</h1>
  <body>
     <MyEbooksSort pseudo="Username" />
     <MyEbooksContent :books="books_fav" />
  </body>
    <TheFooter />
</template>

<style></style>
  
<script>
    export default {
        name: 'MyFavorites',
        data() { return {} },
        methods: {
        }
    }
</script>