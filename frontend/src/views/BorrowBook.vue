<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from '@/components/TheFooter.vue'
    import BookDetailsComp from "@/components/BookDetailsComp.vue";

    var link = window.location.href;
    // Get the id of the book from the url

    var book_id = link.split("?id=").pop();

    var book_list = sessionStorage.getItem('book_list');

    book_list = JSON.parse(book_list);

    const book = book_list[book_id - 1];

    var connected = true;

    var previousUrl = document.referrer;
    previousUrl = previousUrl.split("?id=")[0]

    function validateDate() {
      var selectedDate = new Date(document.getElementById('dateInput').value);
      var maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 21); // Ajoute 21 jours à la date actuelle

      if (selectedDate > maxDate) {
        alert("La date saisie doit être postérieure de moins de 3 semaines à la date actuelle.");
        return false;
      }

      return true;
    }
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <body>
          <BookDetailsComp :book="book" />
          <form onsubmit="return validateDate()">
             <label for="dateInput">Saisissez une date :</label>
             <input type="date" id="dateInput" required>
             <br>
             <input type="submit" value="Soumettre">
          </form>
    </body>>
    
    <TheFooter />
</template>
  
  
  
<script>

export default {
    name: 'BorrowBook',
    data() { return {} },
    methods: {}
}
</script>