<script setup>
import moment from "moment/moment";
import { port } from "../../../backend/controllers/Tools_controllers";
import { link_MyEbooks } from "@/router/functions_nav";

</script>

<template>
  <div id="allPage">

    <div id="left-section">
      <div id="left-left-section">
        <h1 id="title-book">{{ book.titre }}</h1>
        <img id="bookImg" :src="book.src" alt="zdz">
      </div>
    </div>

    <div id="right-section">
      <h2>Clauses</h2>
      <div id="book-resume">
        <div className="row">
          <p>Date to return the book : {{ fin_emprunt }}</p>
          <p>Time remaining to return the book : {{ time }}</p>
          <p>WARNING !
            If you share this book you won't be able to read it again.
            You will have to wait until the book is back in the stock in order to borrow it again.<br>
            Be careful when you write the pseudo of the person you want to send it to, you won't be able to cancel the
            action.
            If however you realise that you made a typo, you can send an email to the administrator and he will manage
            it.
          </p>


        </div>
      </div>
      <div id="formshare">
        <form @submit="submitForm">
          <input type="email" id="pseudo" name="pseudo" placeholder="Email of the person" required>
          <input type="submit" value="Confirm" class="bouton" @click="share">
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#pseudo {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #000;
  background-color: #f8f8f8;
  border-radius: 3vmin;
  resize: none;
}

.bouton {
  background-color: #000;
  border: none;
  color: white;
  padding: 1vmin 2vmin;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5vmin;
  margin: 1vmin 0.5vmin;
  cursor: pointer;
  border-radius: 3vmin;
}

.bouton:hover {
  background-color: #d44340;
  transition: all 0.3s ease 0s;
}

#title-book {
  margin: auto;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 2vmin;
  margin-bottom: 2vmin !important;
}

hr {
  border: 0;
  height: 1px;
  background: black;
}

#allPage {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* Aligner les éléments en haut */
  align-items: flex-start;
  height: max-content;
  width: 100%;
  margin-top: 0.6rem;
}

#left-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  justify-content: left;
  width: 50%;
}

#left-left-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  justify-content: left;
  padding-left: 20px;
  padding-right: 20px;
}

#bookInfo {
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  /* Aligner le contenu en haut */
  align-items: flex-start;
  /* Aligner le contenu à gauche */
  justify-content: top;
}

#right-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* Aligner le contenu en haut */
  color: black;
  width: 50%;
  max-height: 50vh;
  padding-left: 20px;
  padding-right: 20px;
}

h2 {
  text-align: left;
  font-size: 1.5rem;
}

#book-resume {
  flex: 1;
  justify-content: space-between;
  max-height: 50vh;
  background-color: white;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  font-size: 2vmin;
}

#bookImg {
  margin: auto;
  display: block;
  max-width: 225px;
}

#formshare {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 3% auto;
  align-items: center;
  flex-wrap: nowrap;
}

.formlabel {
  font-size: 2.5vmin;
  flex: 0.3;
  margin: auto;
  text-align: left;
  margin-bottom: 0.5rem;
}

.forminput {

  font-size: 2.1vmin;
  padding: 0.5rem;
  border-radius: 10px;
  border: #A09C9C 2px solid;
  background-color: #A09C9C;
  color: #FFF;
  flex: 0.4;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

#share-book {
  flex: 0.2;
  background-color: #A8A787;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  width: 60%;
  height: 130%;
  margin: auto;
  margin-top: 5px !important;
  margin: 16px 175px;
}

#share-book:hover {
  background-color: #545444;
  color: white;
  transition: all 0.3s ease 0s;
}

@media (max-width: 1000px) {
  #allPage {
    flex-direction: column;
    justify-content: flex-start;
    /* Aligner les éléments en haut */
    align-items: flex-start;
    height: max-content;
    width: 100%;
    margin-top: 0.6rem;
  }

  #left-section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: left;
    justify-content: flex-start;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  #right-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* Aligner le contenu en haut */
    color: black;
    width: 100%;
    max-height: 50vh;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
  }

}
</style>

<script>
export default {
  name: 'Share',
  props: ['book', 'debut_emprunt', 'fin_emprunt', 'time'],
  data() {
    return {
      pseudo_destination: '',
    }
  },
  mounted() {
  },
  methods: {
    submitForm(event) {
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
      event.preventDefault();

      if (confirm("Voulez-vous vraiment partager ce livre ?")) {
        var pseudo = document.getElementById("pseudo").value;

        var datas = {
          email: sessionStorage.getItem('user_email'),
          email_dest: pseudo,
          id_ebook: JSON.parse(sessionStorage.getItem('book')).id_ebook,
          book_shared: sessionStorage.getItem('book'),
          debut_emprunt: this.debut_emprunt,
          fin: this.fin_emprunt,
        };

        fetch("http://localhost:" + port + "/send_share_book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
            //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
          },
          body: JSON.stringify(datas)
        })
          .then(response => response.text())
          .then(data => {
            var message = JSON.parse(data);
            alert(message.message);
            this.$router.push('/MainPage');
          })
          .catch(error => {
            // Gérer les erreurs
            console.error("Erreur lors de l'envoi du formulaire :", error);
          });
      }
    }
  }

}
/*
src_image
Titre
Stock
Source
Auteur
Edition
dateParution
Langue
Genre
Pages
Temps de retour
 */
</script>

<!--
<div id="left-section">
      <div id="left-left-section">
        <img id="bookImg" src="@/assets/onepiece96.png" alt="Book_example">
        <br><br>
        <p>Stock: <span>0</span></p>
        <p>Source: <span>Bibliothèque de crimée, Paris 19</span></p>
      </div>
      <div id="bookInfo">
        <h2>Info</h2>
        <p>Title : <span>One piece 96</span></p>
        <hr>
        <p>Author : <span>Eichiro Oda</span></p>
        <hr>
        <p>Edition : <span>Glénat</span></p>
        <hr>
        <p>Release : <span>7 octobre 2020</span></p>
        <hr>
        <p>Languages : <span>French</span></p>
        <hr>
        <p>Genre : <span>Manga, Aventures, Pirates</span></p>
        <hr>
        <p>Pages : <span>192</span></p>
      </div>
    </div>
   -->