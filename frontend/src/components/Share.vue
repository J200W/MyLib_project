<script setup>
$(document).ready(function () {
  $('.nav-toggle').click(function () {
    var collapse_content_selector = $(this).attr('href');
    var toggle_switch = $(this);
    $(collapse_content_selector).toggle(function () {
    });
  });

});

import {port} from "../../../backend/controllers/Tools_controllers";
import {link_MyEbooks} from "@/router/functions_nav";
</script>

<template>
  <div id="allPage">

    <div id="left-section">
      <div id="left-left-section">
        <img id="bookImg" src="@/assets/onepiece96.png" alt="Book_example">
        <br><br>
        <p>Stock: <span>{{ stock }}</span></p>
        <p>Source: <span>{{ book_shared.library }}</span></p>
      </div>
      <div id="bookInfo">
        <h2>Info</h2>
        <p>Title : <span>{{ book_shared.title }}</span></p>
        <hr>
        <p>Author : <span>{{ book_shared.author }}</span></p>
        <hr>
        <p>Edition : <span>{{ book_shared.edition }}</span></p>
        <hr>
        <p>Release : <span>{{ book_shared.date }}</span></p>
        <hr>
        <p>Languages : <span>{{ book_shared.language }}</span></p>
        <hr>
        <p>Genre : <span>{{ book_shared.genre }}</span></p> <!-- A revoir car plusieurs -->
        <hr>
        <p>Pages : <span>{{ book_shared.pages }}</span></p>
      </div>
    </div>

    <div id="right-section">
      <h2>Clauses</h2>
      <div id="book-resume">
        <div class="row">
          <p>Date to return the book : {{emprunt_dates.fin_emprunt}}</p>
          <p>Time remaining to return the book : {{calcul_time_remaining}}</p>
          <p>WARNING !
            If you share this book you won't be able to read it again.
            You will have to wait until the book is back in the stock in order to borrow it again.<br>
            Be careful when you write the pseudo of the person you want to send it to, you won't be able to cancel the action.
            If however you realise that you made a typo, you can send an email to the administrator and he will manage it.
          </p>


        </div>
      </div>
      <form id="formshare" @submit="submitForm">
        <label class="formlabel" for="username">Recipient's username </label>
        <input class="forminput" type="text" id="pseudo" name="pseudo" v-model="pseudo_destination" required>
        <button type="submit" id="share-book">Share the book to this person</button>
      </form>
    </div>
  </div>
</template>

<style>

hr {
  border: 0;
  height: 1px;
  background: black;
}
#allPage {
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* Aligner les éléments en haut */
  align-items: flex-start;
  height: max-content;
  width: 100%;
  margin-top: 0.6rem;
}
#left-section {
  display: flex;
  flex-direction: row;
  //justify-content: flex-start;
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
  justify-content: flex-start; /* Aligner le contenu en haut */
  align-items: flex-start; /* Aligner le contenu à gauche */
  justify-content: top;
}
#right-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Aligner le contenu en haut */
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
  width: 90%;
  height: 50%;
  margin: 3% auto;
  align-items: center;
  flex-wrap: nowrap;
//padding: 25px 25px 25px 25px;
  /*
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  //padding: 25px 25px 25px 25px;
  width: 50%;
  left: 50%;
  margin: auto;
  padding: 0.5rem;*/
}

.formlabel {
  font-size: 2.5vmin;
  flex: 0.3;
  margin-right: 0.5rem;
  text-align: center;
  //margin-bottom: 0.5rem;
}
.forminput {

  font-size: 2.1vmin;
  padding: 0.5rem;
  border-radius: 10px;
  border: #A09C9C 2px solid;
  background-color: #A09C9C;
  color: #FFF;
  flex: 0.4;
//margin-right: 1rem;
  //margin-bottom: 1rem;
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
  margin: auto;   //margin-top: 5px !important;   //margin: 16px 175px;
}
#share-book:hover {
  background-color: #545444;
  color: white;
  transition: all 0.3s ease 0s;
}

@media (max-width: 1000px) {
  #allPage {
    flex-direction: column;
    justify-content: flex-start; /* Aligner les éléments en haut */
    align-items: flex-start;
    height: max-content;
    width: 100%;
    margin-top: 0.6rem;
  }

  #left-section {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: left;     //justify-content: flex-start;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  #right-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Aligner le contenu en haut */
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
  props: ['book_shared', 'emprunt_dates', 'stock'],
  data () {
    return {
      pseudo_destination: '',
    }
  },
  mounted(){
  },
  computed:{
    calcul_time_remaining(){
      let date1 = new Date(this.emprunt_dates.debut_emprunt);
      let date2 = new Date(this.emprunt_dates.fin_emprunt);

      let diffInMilliseconds = date2 - date1;
      let diffInSeconds = diffInMilliseconds / 1000;
      let diffInMinutes = diffInSeconds / 60;
      let diffInHours = diffInMinutes / 60;
      let diffInDays = diffInHours / 24;

      let restHours = diffInHours % 24;
      let restMinutes = diffInMinutes % 60;

      return diffInDays + "d " + restHours + "h " + restMinutes + "m";

    }
  },
  methods:{
    submitForm(event) {
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
      console.log('Formulaire soumis !', this.pseudo_destination, sessionStorage.getItem('user_email'), this.book_shared);
      event.preventDefault();

      var datas = {
        email: sessionStorage.getItem('user_email'),
        pseudo_destination: this.pseudo_destination,
        book_shared: this.book_shared,
        stock: this.stock
      };

      fetch("http://localhost:" + port +"/send_share_book", {
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
            //console.log("answer from serveur", data);
            data = JSON.parse(data)
            alert(data.message)
            if(data.status === "success"){
              data.stock -= 1;
              sessionStorage.setItem("stock", JSON.stringify(data.stock))
              link_MyEbooks.call(this)
            }
          })
          .catch(error => {
        // Gérer les erreurs
        console.error("Erreur lors de l'envoi du formulaire :", error);
      });

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