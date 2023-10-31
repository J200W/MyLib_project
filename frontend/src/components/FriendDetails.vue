<script setup>
import {port} from "../../../backend/controllers/Tools_controllers";
import Chat from "@/components/Chat";

</script>

<template>
  <div class="Friend">
  <h2 class="ToLeft">{{name}}</h2>
  <div class="ToLeft">
    <Button v-if="is_Friend==='OUI'" id="PARLER" @click="PARLER()" class="btn">CHAT WITH</Button>
    <Button v-if="is_Friend==='OUI'" id="QUITTER" @click="QUITTER()" class="btn">QUIT</Button>
  </div>
  <div class="Centered">
    <Chat v-if="ChatOpen" :friend_email="this.friend_email" :Us_email="this.Us_email"></Chat>
  </div>
  <div class="ToLeft">
    <Button v-if="is_Friend==='Pending'" id="ACCEPTER" @click="ACCEPTER()" class="btn">ACCEPT</Button>
    <Button v-if="is_Friend==='Pending'" id="REFUSER" @click="REFUSER()" class="btn">REFUSE</Button>
  </div>
  </div>


</template>

<script>
export default {
  name: "FriendList",
  props:["friend_email",'name','is_Friend','Us_email'],
  data(){
    return{
      friend_email: this.friend_email,
      ChatOpen:false,
      user_email: sessionStorage.getItem('user_email'),
      name : this.name
    }
  },
  mounted(){

  },
  methods:{
    PARLER(){
      this.ChatOpen=!this.ChatOpen;
    },
    QUITTER(){

      var datas={
        friend_email:this.friend_email,
        email:this.user_email,
      }

      fetch("http://localhost:"+port+"/req_delete_friend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      }).then(response => response.text())
      .then(data =>{
        data = JSON.parse(data);
        console.log(data);
        if(data.status === "success"){
          alert(data.message);
        }
        else{
          alert('ERROR DURING THE PURGE OF THE HERETICAL FRIEND SCUM !')
        }
      }).catch(error =>{
        console.error("HERETICAL ERROR :", error);
      })
    },
    ACCEPTER(){
      var datas={
        friend_email:this.friend_email,
        email:this.user_email,
      }
      fetch("http://localhost:"+port+"/req_accept1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      }).then(response => response.text())
      .then(data =>{
        data = JSON.parse(data);
        console.log(data);
        if(data.status === "success"){
          alert(data.message);
          fetch("http://localhost:"+port+"/req_accept2", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
              //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
            },
            body: JSON.stringify(datas)
          }).then(response => response.text())
          .then(data => {
            data = JSON.parse(data);
            console.log(data);
            if(data.status === "success"){
              alert(data.message);
            }
            else{
              alert("ERROR DURING THE CREATION OF THE FRIENDSHIP")
            }
          }).catch(error =>{
            console.error("HERETICAL ERROR :", error);
          })
        }
        else{
          alert('ERROR DURING THE DELETION OF THE ASKING STATUS')
        }
      }).catch(error =>{
        console.error("HERETICAL ERROR :", error);
      })
    },

    REFUSER(){
      var datas = {
        friend_email:this.friend_email,
        user_email:this.user_email,
      };

      fetch("http://localhost:"+port+"/refuser", {
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
            data = JSON.parse(data);
            console.log(data);
            if (data.status === "success") {
              alert(data.message);
            } else {
              alert("Erreur lors du rejet de la demande !");
            }
          }).catch(error => {
        // Gérer les erreurs
        console.error("HERETICAL ERROR :", error);
      });
    },
  }
}


</script>

<style>

</style>