<script setup>

import {port, afficherMessage} from "../../../backend/controllers/Tools_controllers";

</script>

<template>
  <div>
    <h1 id="title-comments">Comments</h1>
    <button id="button_addComment" @click="verif_permits_forCom()" v-if="!showForm">Add Comment</button>

    <div v-for="(comment, index) in comments" :key="index"  class="commentBox">
      <div class="leftPanelImg">
        <div class="rightPanel">
          <span>{{ comment.pseudo_client }}</span>
          <div class="date">{{ comment.date_comment }}</div>
          <div class="rating-number">
            <span id="rating-number">{{ comment.note }}</span>/5
          </div>
          <hr>
          <p class="theComment">{{ comment.commentaire }}</p>
        </div>
        <button id="button_modify_comment" v-if="canModifyComment(comment)" @click="editComment(comment)">Modify</button>
        <button id="button_delete_comment" v-if="canDeleteComment(comment)" @click="deleteComment($event, comment)">Delete</button>
      </div>
    </div>



    <form class="commentForm" v-if="showForm" @submit="submitForm">
      <div class="commentForm_element" id="commentForm_note">
        <label for="note_new_comment">Note /5</label>
        <input id="note_new_comment" placeholder="Note" type="number" v-model="newComment.note" min="0" max="5" step="0.1" required>
      </div>
      <div class="commentForm_element" id="commentForm_text">
        <label for="note_new_comment">Commentaire </label>
        <textarea id="text_new_comment" v-model="newComment.commentaire" placeholder="Comment" required></textarea>
      </div>
      <div class="commentForm_element" id="commentForm_buttons">
        <button type="button" id="button_newComment_cancel" @click="showForm = false">Cancel</button>
        <button type="reset" id="button_newComment_reset">Reset</button>
        <button type="submit" id="button_newComment_submit">{{ isNewComment ? 'Submit' : 'Save Changes' }}</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'MyAccount',
  props: ['book'],
  data() {
    return {
      user_pseudo: sessionStorage.getItem('user_pseudo'),
      user_email: sessionStorage.getItem('user_email'),
      comments: [],
      newComment: {
        email_client: sessionStorage.getItem('user_email'),
        pseudo_client: sessionStorage.getItem('user_pseudo'),
        date_comment: this.getDateToday,
        note: 0,
        commentaire: '',
      },
      showForm: false,
      isNewComment: true,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  computed:{
    getDateToday() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    }
  },
  methods: {


    verif_permits_forCom() {
      if(this.user_email){
        // Check if the user has already commented this book
        const existingComment = this.comments.find(comment => comment.email_client === this.user_email);
        existingComment ? alert("You have already commented this book.") : this.showForm = true;
      }
      else{
        alert('You need to be connected to post comments !')
      }
    },

    fetchUserData() {
      console.log(this.book)
      fetch("http://localhost:" + port + "/recup_comments_for_ebook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_ebook: this.book.id_ebook }),
      })
          .then(response => response.json())
          .then(data => {
            console.log(data.message)
            if(data.status === "success")
              data.donnees.forEach(comment => {
                this.comments.push({email_client: comment.mail_Clients,
                  pseudo_client: comment.pseudo_Clients,
                  date_comment: comment.date_comment,
                  note: comment.note,
                  commentaire: comment.commentaire
                })
              })
              //this.comments.push(data.donnees);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des commentaires :", error);
          });
    },


    submitForm(event) {
      event.preventDefault();
      console.log("formulaire soumis !", this.newComment)

      if (this.newComment.note < 0 || this.newComment.note > 5) {
        alert("Invalid note value.");
        return;
      }
      this.newComment.date_comment = this.getDateToday;


      var datas = {
        id_ebook: this.book.id_ebook,
        newComment: this.newComment,
        isNewComment: this.isNewComment,
      };

      fetch("http://localhost:" + port + "/send_new_comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              let data_sended = {
                email_client: this.newComment.email_client,
                pseudo_client: this.newComment.pseudo_client,
                date_comment: this.newComment.date_comment,
                note: this.newComment.note,
                commentaire: this.newComment.commentaire
              }
              if(this.isNewComment)
                this.comments.push(data_sended
                ); // Objet complet pour éviter les appels par références après
              else{
                const index = this.comments.findIndex(comment => comment.email_client === data_sended.email_client);
                this.comments[index] = data_sended;
              }

              if(this.comments.includes(this.newComment)){
                console.log("Commentaire publié avec succès !")
                this.newComment.note = null
                this.newComment.commentaire = ''
              }

              this.showForm = false;
            }
          })
          .catch(error => {
            console.error("Erreur lors de l'envoi du commentaire :", error);
          });
    },
    canModifyComment(comment) {
      return comment.email_client === this.user_email;
    },
    canDeleteComment(comment) {
      return comment.email_client === this.user_email || sessionStorage.getItem('admin') === "true";
    },
    editComment(comment) {
      // Implement edit comment functionality
      this.newComment.note = comment.note
      this.newComment.commentaire = comment.commentaire

      // Set isNewComment to false to indicate that it's an existing comment being edited
      this.isNewComment = false;

      // Show the comment form
      this.showForm = true;
    },

    deleteComment(event, comment) {
      event.preventDefault();
      // Implement delete comment functionality
      console.log("Deleting comment:", comment);
      // Remove the comment from the comments array
      this.comments = this.comments.filter(c => c !== comment);
      fetch("http://localhost:" + port + "/delete_comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_ebook: this.book.id_ebook, comment: comment }),
      })
          .then(response => response.json())
          .then(data => {
            alert(data.message) //afficherMessage(data.message, 1000)
            if (data.status === "success") {
              console.log("Commentaire supprimé");
            }
          })
          .catch(error => {
            console.error("Erreur lors de la suppression du commentaire :", error);
          });
    },
  },
};
</script>

<style>


    #title-comments {
        margin-left: 5%;
        margin-top: 2%;
        font-size: 2rem;
        font-family: 'Roboto', sans-serif;
        color: #000;
    }

    #title-comments {
      display: inline-block;
      margin-right: 10px;
    }

    .commentForm button, #button_addComment {
      margin-top: 10px;
      padding: 8px 12px;
      background-color: #d3b936;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    #button_addComment{
      margin-left : 3%;
      margin-bottom: 0.6rem;
    }

    #button_addComment:hover, .commentForm button:hover {
      background-color: #b07d10;
    }

    #clear {
        clear: both;
        margin-bottom: 30px;
    }

    .commentBox {
        background: #ffffff;
        padding: 1%;
        width: 90%;
        display: flex;
        border-radius: 15px;
        margin-top: 20px !important;
        color: black;
        font-size: 2vmin;
        margin: 0 auto;
    }

    .leftPanelImg {
        float: left;
        flex: 1;
    }

    .leftPanelImg img {
        min-height: 150px;
        max-height: 150px;
        min-width: 150px;
        max-width: 150px;
        border-radius: 100%;
        height: auto;
        width: auto;
        object-fit: cover;
        background: none;
    }

    .leftPanelImg button {
        border-radius: 10%;
        
    }

    #button_delete_comment {
      background-color: #b9480b;
    }

    #button_modify_comment {
      background-color: #185d7a;
    }

    .commentBox .leftPanelImg button {
      margin-top: 10px;
      margin-right: 1%;
      padding: 8px 12px;
      background-color: #d3b936;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .commentBox .leftPanelImg button:hover {
      background-color: #b07d10;
    }

    .commentForm {
      background: #ffffff;
      padding: 1%;
      width: 90%;
      display: flex;
      border-radius: 15px;
      margin-top: 20px !important;
      color: black;
      font-size: 2vmin;
      margin: 0 auto;
      /*
      flex-direction: column;*/
      flex-direction: row;
      align-items: center;
    }
    .commentForm label {
      margin-bottom: 5px;
    }

    .commentForm input[type="number"]
    /*, .commentForm textarea */{
      /*
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;*/
      width: 80%;
      height: 70%;
      padding: 5px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      //font-size: 14px;
    }

    .commentForm textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .commentForm_element {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    #commentForm_note {
      flex: 0.08;
    }

    #commentForm_text {
      flex: 0.77;
    }

    #commentForm_buttons {
      flex: 0.15;
    }

    .commentForm button {
      margin-left: 1rem;
      height: 100%;
    }

    #button_newComment_cancel{
      background-color: #bdbcbc;
    }

    #button_newComment_reset{
      background-color: #ec8888;
    }


    #rating-number {
        color: #f27100;
        font-size: larger;
        font-weight: bold;
        margin: 0 auto;
    }
</style>

<!--
      /* {
        email_client: this.user_email, // "Email"
        pseudo_client: this.user_pseudo, // "Username"
        date_comment: this.getDateToday,
        note: 5,
        commentaire: 'COMMENTAIRE'} */ // POUR TEST UNIQUEMENT
<template>
    <h1 id="title-comments">Comments</h1>
    <div id="clear">
        <div class="commentBox">
            <div class="leftPanelImg">
                <div class="rightPanel">

                    <span>Username</span>
                    <div class="date">16/06/2023</div>
                    <div class="rating-number">
                        <span id="rating-number">5</span> /5
                    </div>
                    <hr>
                    <p class="theComment">COMMENTAIRE

                    </p>
                </div>
                <button id="delete-button">delete</button>
            </div>
        </div>



    </div>

</template> -->