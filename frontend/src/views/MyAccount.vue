<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from "@/components/TheFooter.vue";

var connected = true;
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <div class="form-container">
        <h2>Enregistrement utilisateur</h2>
        <form @submit="submitForm">
            <div class="form-group">
                <label for="pseudo">Pseudo:</label>
                <input type="text" id="pseudo" v-model="pseudo" placeholder="Entrez votre pseudo" />
            </div>
            <div class="form-group">
                <label for="genre">Genre:</label>
                <select id="genre" v-model="genre">
                    <option value="homme">homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                </select>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" placeholder="Entrez votre adresse email" />
            </div>
            <div class="form-group">
                <label for="birthdate">Date de naissance:</label>
                <input type="date" id="birthdate" v-model="birthdate" />
            </div>
            <div class="form-group">
                <label>Nombre de livres empruntés:</label>
                <span class="books-label">{{ books }}</span>
            </div>
            <button type="submit">Enregistrer</button>
        </form>
    </div>
    <TheFooter />
</template>

<style scoped>
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

<script >
export default {
  name:'MyAccount',
  data() {
    return {
      pseudo: 'JohnDoe',
      genre: 'homme',
      email: 'john@example.com',
      birthdate: '',
      books: 0
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      // Effectuer une requête HTTP vers la page PHP pour récupérer les données utilisateur
      fetch('http://localhost:80/elements_to_send.php')
          .then(response => response.json())
          .then(data => {
            console.log('Données utilisateur reçues:', data);
            this.pseudo = data.pseudo;
            this.genre = data.genre;
            this.email = data.email;
            this.birthdate = data.birthdate;
            this.books = data.books;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
          });
    },
    submitForm(event) {
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
      console.log('Formulaire soumis !', this.pseudo, this.genre, this.email, this.birthdate, this.books);
      event.preventDefault();

      var datas = {
        pseudo: this.pseudo,
        genre: this.genre,
        email: this.email,
        birthdate: this.birthdate,
        books: this.books
      };

      fetch("http://localhost:80/test_recup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      })
          .then(response => response.text())
          .then(data => {
            // Traiter la réponse du serveur
            console.log("now on serveur", data);
          })  .catch(error => {
        // Gérer les erreurs
        console.error("Erreur lors de l'envoi du formulaire :", error);
      });

    }
  }
};
</script>