<template>
  <div class="navBar">
    <div class="logo"></div>
    <div class="searchBar"></div>
    <div class="navItem">My Ebooks</div>
    <div class="navItem">Research</div>
    <div class="navItem">Favorites</div>
    <div class="navItem">History</div>
    <div class="user"></div>
  </div>


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
          <option value="homme">Homme</option>
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
</template>

<script>

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
  /*
  mounted() {
    this.fetchUserData();
  },*/
  methods: {
    fetchUserData() {
      // Effectuer une requête HTTP vers la page PHP pour récupérer les données utilisateur
      fetch('api/userData.php')
          .then(response => response.json())
          .then(data => {
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

    }
  }
};
</script>

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
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #D3E8F3;
  height: 100%;
  padding: 0 2%;
}

.logo {
  width: 8.7%;
  height: 50px;
  background: url('@/assets/logo.png') no-repeat center center;
  background-size: contain;
}

.searchBar {
  flex: 1;
  margin: 0 2%;
  height: 49.9%;
  background: #FFFFFF;
}

.navItem {
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-weight: 100;
  font-size: 1.6vw;
  line-height: 1.9vw;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  margin-right: 2%;
}
</style>

