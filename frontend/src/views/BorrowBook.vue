<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from '@/components/TheFooter.vue'
    import MyEbooksContent from "@/components/MyEbooksContent.vue";

    const book = [
    {
        id: 1,
        title: "One Piece Tome 96",
        src: require("@/assets/onepiece96.png"),
        author: "Eiichiro Oda",
        date: "04/11/2020",
        library: "Bibliothèque de l'Université de Lille",
        time: "34d 12h 32m",
    },
    ]

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
    var connected = true;
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <body>
          <MyEbooksContent :books="book" />
          <div class="form-container">
            <h2>Entrez la date de fin d'emprunt</h2>
            <div class = "form-group">
            <form onsubmit="return validateDate()">
              <input type="date" id="dateInput" required>
            </form>
            </div>
            <input type="submit" value="Soumettre" id="bouton">
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

<style>
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

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #d5c040;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #ccaa1f;
}

</style>