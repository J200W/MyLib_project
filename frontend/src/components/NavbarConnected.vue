<script setup>
var admin = sessionStorage.getItem('admin');

if (admin == null) {
  admin = false;
}
else if (admin == "true") {
  admin = true;
}
else {
  admin = false;
}




</script>

<template>
  <div id="navbar">
    <div id="navbar-left">
      <router-link to="/MainPage">
        <img id="logo" src="@/assets/logo.png" alt="logo">
      </router-link>
      <form id="search-bar" @submit="submitForm">
        <input placeholder="I am looking for..." type="text" name="search-bar" id="search-input" v-model="search">
        <input type="submit" value="Search" id="search-submit" onsubmit="submitForm()">
      </form>
    </div>
    <div id="navbar-right">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          MyLib
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a v-if="!admin" class="dropdown-item" href="/MyEbooks">My eBooks</a>
          <a v-if="!admin" class="dropdown-item" href="/MyFavorites">My Favorites</a>
          <a v-if="!admin" class="dropdown-item" href="/MyHistory">My History</a>

          <div v-if="admin">
            <!--
            <a class="dropdown-item" href="/ManageUsers">Manage users</a>
            -->
            <a class="dropdown-item" href="/ManageBooks">Manage books</a>
            <a class="dropdown-item" href="/AddBook">Add an ebook</a>
          </div>


        </div>
      </div>
      <router-link class="navbar-link" to="/MyAccount">My Account</router-link>
    </div>
  </div>
  <div id="empty"></div>
</template>

<style>
.btn {
  background-color: #D0AB77;
  border: 2px solid black;
  border-radius: 40px;
  color: black;
  font-size: 2vmin;
  padding: 15px;
  margin: 0.5rem;
  text-decoration: none;
  align-items: left;
}

.btn:hover {
  background-color: #0C0A0B;
  border: black 2px solid;
  border-radius: 40px;
  transition: all 0.3s ease-in-out;
}

#empty {
  height: 100px;
}

#navbar {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: left;
  max-height: 100px;
  height: auto;
  background-color: #D0AB77;
  width: 100%;
  z-index: 4;
  padding-left: 20px;
}

#logo {
  height: 5rem;
  margin: auto;
  display: block;
  flex: 1;
}

.navbar-link {
  font-size: 2vmin;
  padding: 1em;
  margin: 0.5rem;
  text-decoration: none;
  color: black;
  align-items: left;
  border: 2px solid black;
  border-radius: 40px;
}

.navbar-link:hover {
  background-color: #0C0A0B;
  border: black 2px solid;
  border-radius: 40px;
  transition: all 0.3s ease-in-out;
  color: white;
}

#search-bar {
  display: flex;
  flex-direction: row;
  max-height: 100px;
  background-color: #FFF;
  width: 100%;
  padding: 0.6rem;
  flex: 1;
  margin-top: auto;
  margin-bottom: auto;
}

#search-input {
  font-size: 2vmin;
  padding: 0.6rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0;
  margin-bottom: 0;
  text-decoration: none;
  color: black;
  align-items: left;
  border: 2px solid #FFF;
  background-color: #FFF;
  width: 50%;
}

#search-submit {
  border: white 2px solid;
  background-color: #D79262;
  width: fit-content;
  font-size: 2vmin;
  border-radius: 5px;
}

#search-submit:hover {
  background-color: #0C0A0B;
  border: #0C0A0B 2px solid;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  color: white;
}

#navbar-left {
  display: flex;
  justify-content: left;
  align-items: center;
  justify-content: center;
  max-height: 100px;
  background-color: #D0AB77;
  width: 100%;
}

#navbar-right {
  display: flex;
  justify-content: right;
  align-items: right;
  max-height: 140px;
  background-color: #D0AB77;
  width: 100%;
}

#section {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 50%;
  margin-right: 20px;
}


@media (max-width: 1100px) {
  #logo {
    height: 3rem;
  }

  #search-bar {
    width: 100%;
  }
}
</style>


<script>

import functions_nav from "@/router/functions_nav";
import { port } from "../../../backend/controllers/Tools_controllers";

export default
{
  name: 'NavbarConnected',
  data() {
    return {
      search: ''
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() { },
    submitForm(event) {
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
      if (this.search == "") this.search = " ";
      if (this.search !== '') {
        console.log('Formulaire soumis !', this.search);
        event.preventDefault();

        let datas = {
          search: this.search
        };

        fetch("http://localhost:" + port + "/send_research_fromNavBar", {
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
              sessionStorage.setItem('research', this.search);
              this.$router.push(
                  {
                    path: '/SearchBook',
                    query: { search: this.search }
                  }
              )
              // Check if we are already on the page
              // Get the current path
              var link = window.location.href;

              var currentPath = link.substring(link.lastIndexOf('/') + 1).split('?')[0];
              if (currentPath == 'SearchBook') {
                // wait and reload
                setTimeout(function () {
                  window.location.reload();
                }, 100);
              }
            }).catch(error => {
          // Gérer les erreurs
          console.error("Erreur lors de l'envoi du formulaire :", error);
        });
      }
    }
  }

}

</script>