<script setup>
$(document).ready(function () {
  $('.nav-toggle').click(function () {
    var collapse_content_selector = $(this).attr('href');
    var toggle_switch = $(this);
    $(collapse_content_selector).toggle(function () {
    });
  });

});
</script>

<template>
  <div id="allPage">
    <div id="left-section">
      <div id="left-left-section">
        <img id="bookImg" src="@/assets/onepiece96.png" alt="Book_example">
        <br><br>
        <p>Stock: <span>0</span></p>
        <p>Source: <span>Bibliothèque de crimée, Paris 19</span></p>
      </div>
      <div id="bookInfo">
        <h2>Info</h2>
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

    <div id="right-section">
      <h2>Clauses</h2>
      <div id="book-resume">
        <div class="row">
          <p>Date to return the book : 07/07/2023</p>
          <p>Time remaining to return the book : 34d 12h 32m</p>
          <p>WARNING !
            If you share this book you won't be able to read it again.
            You will have to wait until the book is back in the stock in order to borrow it again.<br>
            Be careful when you write the pseudo of the person you want to send it to, you won't be able to cancel the action.
            If however you realise that you made a typo, you can send an email to the administrator and he will manage it.
          </p>


        </div>
      </div>
      <form id="formshare" action="" method="post">
        <label class="formlabel" for="username">Recipient's username </label>
        <input class="forminput" type="pseudo" id="pseudo" name="pseudo" v-model="pseudo" required>
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
#share-book {
  margin-top: 5px !important;
  background-color: #A8A787;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  margin: 16px 175px;
  cursor: pointer;
  border-radius: 5px;
  width: 60%;
  height: 130%;
  margin: auto;
}
#share-book:hover {
  background-color: #545444;
  color: white;
  transition: all 0.3s ease 0s;
}
#formshare {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 25px 25px 25px 25px;
  width: 50%;
  left: 50%;
  margin: auto;
  padding: 0.5rem;
}
.formlabel {
  font-size: 2.5vmin;
  margin-bottom: 0.5rem;
}
.forminput {
  font-size: 2.5vmin;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: #A09C9C 2px solid;
  background-color: #A09C9C;
  color: #FFF;
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
    justify-content: flex-start;
    align-items: flex-start;
    justify-content: left;
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
}
</script>