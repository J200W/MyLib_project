<script setup>

import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from '@/components/TheFooter.vue'

    const books = JSON.parse(sessionStorage.getItem('similar_books'));

    var link = window.location.href;
    // Get the id of the book from the url

    var book_id = link.split("?id=").pop();

    var book_list = sessionStorage.getItem('book_list');

    book_list = JSON.parse(book_list);

    const book = book_list[book_id - 1];


    var connected = true;
    var previousUrl = document.referrer;
    previousUrl = previousUrl.split("?id=")[0]
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <body>
    <img id="bookImg" :src="book.src" alt="{{ book.title }}" >
          <div class="form-container">
            <h2 class ="titre">Enter the loan end date</h2>
            <div class = "form-group">
            <form>
              <input type="date" id="dateInput" required>
            </form>
            </div>
            <input type="submit" value="Confirm" class="bouton" onclick="

            var selectedDate = new Date(document.getElementById('dateInput').value);
            var maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 21);
            if (selectedDate > maxDate || selectedDate < new Date()) {
               alert('La date saisie doit être postérieure de moins de 3 semaines à la date actuelle.');
               return false;
            }
            return true;">

          </div>

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

<style scoped>
#bookImg {
  margin: auto;
  display: block;
  max-width: 300px;
}
.titre{
  position: center;
  margin-left: 510px;
}
.form-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
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