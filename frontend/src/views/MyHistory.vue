<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import SearchBookSort from "@/components/SearchBookSort.vue";
import MyEbooksContent from "@/components/MyEbooksContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import { port } from "../../../backend/controllers/Tools_controllers";
var connected = sessionStorage.getItem('connected');
//var pseudo = sessionStorage.getItem('user_pseudo')
if (connected == null) {
  connected = false;
}
if (connected == "true") {
  connected = true;
}
if (connected == "false") {
  connected = false;
}
</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <h1 id="title">My History</h1>

  <body>
    <MyEbooksContent :books=books_done />
  </body>
  <TheFooter />
</template>
  
  
<style scoped>
#title {
  font-size: 5vmin;
  text-align: left;
  color: "#000000";
  margin-left: 5%;
}
</style>

<script>
export default {
  data() {
    return {
      books: [],
      books_done: [],
      pseudo: sessionStorage.getItem("user_pseudo")
    };
  },
  mounted() {
    this.fetchBookHistory();
  },
  methods: {
    redirigerVersEbook(ebookId) {
      this.$router.push({ path: "/BookDetails" });
    },
    fetchBookHistory() {
      let datas = {
        email: sessionStorage.getItem("user_email")
      };
      fetch("http://localhost:" + port + "/my_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      })
        .then(response => {
          if (response.status >= 200 && response.status <= 299) {
            const temp = response.json();
            return temp;
          }
          else {
            return response;
          }
        })
        .then(data => {
          // Traiter la réponse du serveur
          if (data.status == "success") {
            this.books_done = data.donnees;
            console.log("books borrowed", this.books_done); 
          }
          else {
            this.books_done = [];
            console.log("no books borrowed");
          }
        }).catch(error => {
          // Gérer les erreurs
          console.error("Erreur lors de l'envoi du formulaire :", error);
        });
    },
  },
  components: { SearchBookSort }
};
</script>