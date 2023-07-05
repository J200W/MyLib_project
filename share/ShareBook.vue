<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from "@/components/TheFooter.vue";
import Share from "@/components/Share.vue"
import {port, verif_stock_date} from "../../../backend/controllers/Tools_controllers";
//import {verif_stock_date} from "../../../backend/controllers/Tools_controllers";

var connected = sessionStorage.getItem('connected');
if (connected == null) {
  connected = false;
}

</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <Share :book_shared="book_shared"
         :emprunt_dates="emprunt_dates"
         :stock="stock" />
  <TheFooter />
</template>




<style></style>

<script>

export default {
  name: 'ShareBook',
  mounted() {
    this.fetchUserData();
  },
  data() {
    return {
      book_shared: {},
      emprunt_dates: {},
      stock: -1,
    };
  },

  methods: {
    fetchUserData() {

      // TEMPORAIRE
      /*
      sessionStorage.setItem("book_detailed",
          JSON.stringify({
        id: 53,
        title: "One Piece 96",
        src: "onepiece96.png",
        author: "Eiichiro Oda",
        library: "Bibliothèque de l'Université de Lille",
        theme: "Manga1",
        genre: "Shonen",
        date: "2020-12-16",
        edition: "Glénat",
        language: "Français",
        pdf: "onepiece96.pdf",
        pages: 192,
        description:
            "Luffy et ses compagnons sont enfin arrivés sur Onigashima, où se déroule le plus grand festival du monde ! Mais pour infiltrer le pays des samouraïs, il leur faut un passeport, et pour l’obtenir, il leur faut affronter les gardiens de la porte des enfers !",
      })); */

      /*
    sessionStorage.setItem("book_detailed_emprunt_dates",
        JSON.stringify({
          debut_emprunt: "2021-05-01",
          fin_emprunt: "2021-05-08",
        }));*/



      //sessionStorage.setItem("book_detailed_stock", "1");

      //this.book_shared = JSON.parse(sessionStorage.getItem("book_detailed"));
      this.book_shared = JSON.parse(sessionStorage.getItem("Book"));
      this.emprunt_dates = JSON.parse(sessionStorage.getItem("book_detailed_emprunt_dates"));
      console.log(this.emprunt_dates)
      this.stock = verif_stock_date(this.emprunt_dates.debut_emprunt, this.emprunt_dates.fin_emprunt)
      sessionStorage.setItem("book_detailed_stock", "" + this.stock);
      //this.stock = +sessionStorage.getItem("book_detailed_stock");

    }
    // Effectuer une requête HTTP vers la page PHP pour récupérer les données utilisateur
    /*
      fetch("http://localhost:" + port +"/elements_to_send.php")
          .then(response => response.json())
          .then(data => {
            console.log('Données utilisateur reçues:', data);

          .catch(error => {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
          });
    },*/
  }
}
</script>