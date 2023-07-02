<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from '@/components/TheFooter.vue';
import { ref } from 'vue';

const book = JSON.parse(sessionStorage.getItem('Book'));
const bookSrc = ref(book.src);
const bookTitre = ref(book.titre);

var connected = true;
</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <body>
  <img id="bookImg" :src="bookSrc" :alt="bookTitre">
  <div class="form-container">
    <div><h2 class ="titre">Enter the loan end date</h2></div>

    <div class = "form-group">
      <form>
        <input type="date" id="dateInput" required>
      </form>
    </div>
    <input type="submit" value="Confirm" class="bouton" onclick="

            var selectedDate = new Date(document.getElementById('dateInput').value);
            var maxDate = new Date();
            var date_borrow = new Date();
            maxDate.setDate(maxDate.getDate() + 21);
            if (selectedDate > maxDate || selectedDate < new Date()) {
               alert('La date saisie doit être postérieure de moins de 3 semaines à la date actuelle.');
               return false;
            }
            return true;">

  </div>

  </body>

  <TheFooter />
</template>

<script>

import {ref} from "vue";

export default {
  name: 'BorrowBook',
  mounted() {
    this.borrow();
  },
  data() { return {} },
  methods: {
    borrow(){
      const book = JSON.parse(sessionStorage.getItem('Book'));
      let datas = {
        user_mail: sessionStorage.getItem('user_email'),
        book_id : ref(book.id),
        fin_emprunt: selectedDate,
        debut_emprunt : date_borrow,
        marquepage: 0
      };
      fetch("http://localhost:"+ port +"/post_particular_book_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      })
          .then(response => response.text())
          .then(data => {

          }).catch(error => {
        // Gérer les erreurs
        console.error("Erreur lors de l'envoi du formulaire :", error);
      });
    }
  }
}
</script>

<style scoped>

#bookImg {
  margin: auto;
  display: block;
  max-width: 250px;
}

.form-container {
  position: absolute;
  top : 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color : #FFFFFF;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


</style>