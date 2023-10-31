<script setup>
   import {port} from "../../../backend/controllers/Tools_controllers";
   import Message from "@/components/Message";
</script>

<template>
<Message v-for="message in this.messages" :content="message.contenu_text_post" :sender="message.mail_Clients" :when="message.date_envoi_post" :Us_email="this.Us_email"></Message>
  <input type="text" v-model="messageText" @keydown.enter="sendMessage" placeholder="Saisissez votre message" style="backgroundColor:greenyellow; text-align: center;">
</template>

<script>
export default {
  name: "Chat",
  props:["friend_email","Us_email"],
  messages:null,
  messageText: "",

  data(){
    return{
      friend_email: this.friend_email,
      user_email:sessionStorage.getItem('user_email'),
      messages:this.messages
    }
  },

  mounted(){
    this.fetch_Chat_Data()
  },

  methods:{
    fetch_Chat_Data(){
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
      console.log('TRUE');
      var datas = {
        friend_email: this.friend_email,
        user_email: this.user_email
      };

      fetch("http://localhost:"+port+"/get_chat", {
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
              this.messages=data.donnees;
            } else {
              alert("Erreur lors de la récupération des amis !");
            }
          }).catch(error => {
        // Gérer les erreurs
        console.error("HERETICAL ERROR :", error);
      });
    },

    sendMessage(){
      var datas = {
        message:this.messageText
      }

      fetch("http://localhost:"+port+"/req_send_message", {
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

              fetch("http://localhost:"+port+"/req_send_message2", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                  //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(datas)
              })
                  .then(response => response.text())
              .then(data=>{
                data = JSON.parse(data);
                console.log(data);
                if (data.status === "success") {
                  alert(data.message);
                  datas = {
                    friend_email: this.friend_email,
                    user_email: this.user_email,
                    Id_Post : data.donnees[0].Id_Post
                  }
                  fetch("http://localhost:"+port+"/req_send_message3", {
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
                    if(data.status==='success'){
                      alert(data.message);
                    }
                    else{
                      alert("Erreur lors de L'affectation de la source et de la destination !");
                    }
                  })
                }
                else{
                  alert("Erreur lors de La récupération de l'ID du message !");
                }
              })
            } else {
              alert("Erreur lors de la rédaction du message !");
            }
          }).catch(error => {
        // Gérer les erreurs
        console.error("HERETICAL ERROR :", error);
      });
    }
  }
}
</script>

<style scoped>
.cool{
  color: greenyellow;
}
</style>