<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import MyEbooksSort from "@/components/MyEbooksSort.vue";
    import MyEbooksContent from "@/components/MyEbooksContent.vue";
    import TheFooter from "@/components/TheFooter.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    var connected = true;

    const books_act = [
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

    const books_inact = [{
      id: 4,
      title: "One Piece Tome 99",
      src: require("@/assets/onepiece99.png"),
      author: "Eiichiro Oda",
      date: "04/08/2021",
      library: "Bibliothèque Municipale de Livry-Gargan",
      time: "1d 12h 32m",
    },]
</script>

<template>
  <NavbarConnected v-if = "connected" />
  <NavbarNonConnected v-if = "!connected" />
  <h1>Emprunts Actifs</h1>
  <body>
  <MyEbooksSort pseudo="Username" />
  <MyEbooksContent :books="books_act" />
  </body>

    <div>
      <h1>Emprunts Passés</h1>
      <div v-if="books_inact.length === 0">
        <p>Aucun emprunt Passé.</p>
      </div>
      <div v-else>
        <MyEbooksContent :books="books_inact" />
      </div>
    </div>

  <TheFooter />
</template>
  
  
  
<style></style>
  
<script>
  export default {
  data() {
  return {
  emprunts: [
{ id: 1, ebookId: 123, titre: 'Ebook 1' },
{ id: 2, ebookId: 456, titre: 'Ebook 2' },
{ id: 3, ebookId: 789, titre: 'Ebook 3' }
  ] // Remplacez ces données avec les vraies données de l'utilisateur
};
},
  methods: {
  redirigerVersEbook(ebookId) {
    this.$router.push({ path: '/BookDetails' })
}
}
};
</script>