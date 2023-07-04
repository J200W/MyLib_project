<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from "@/components/TheFooter.vue";
import Share from "@/components/Share.vue"
import {port} from "../../../backend/controllers/Tools_controllers";
import {ref, onMounted} from 'vue';
import moment from "moment";

var connected = sessionStorage.getItem('connected');
if (connected == null) {
  connected = false;
}

if (connected == "true") {
  connected = true;
}
else {
  connected = false;
}

const book = JSON.parse(sessionStorage.getItem('book'));
const bookSrc = ref(book.src);
const bookTitre = ref(book.titre);

</script>

<template>
    <body>
        <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <Share :book="book_shared"
         :debut_emprunt="debut_emprunt"
         :fin_emprunt="fin_emprunt"
         :time="time"/>
    </body>
  <TheFooter />
</template>




<style></style>

<script>

export default {
  name: 'ShareBook',
  mounted() {
    this.fetchBookBorrowed();
  },
  data() {
    return {
        book_shared: JSON.parse(sessionStorage.getItem('book')),
        debut_emprunt: null,
        fin_emprunt: null,
        time: null
    };
  },

  methods: {
    fetchBookBorrowed() {
        var book = JSON.parse(sessionStorage.getItem('book'));
        console.log(book);
        var id_ebook = book.id_ebook;
        fetch("http://localhost:" + port + "/get_book_borrowed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('user_email'),
                id_ebook: id_ebook
            }),
        })
        .then((response) => response.json())
        .then((data) => {   
            this.debut_emprunt = moment(data.donnees[0].debut_emprunt).format('DD-MM-YYYY');
            this.fin_emprunt = moment(data.donnees[0].fin_emprunt).format('DD-MM-YYYY');
            this.time = new Date(data.donnees[0].fin_emprunt) - new Date(data.donnees[0].debut_emprunt);
            // Convert this.time to days, hours, minutes, seconds
            this.time = moment.duration(this.time).humanize();
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
        });
    },
    fetchUserData() {

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