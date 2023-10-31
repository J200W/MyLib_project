<script setup>
import NavbarConnected from "@/components/NavbarConnected";
import FriendDetails from "@/components/FriendDetails";
import TheFooter from "@/components/TheFooter";
import {port} from "../../../backend/controllers/Tools_controllers";
import FriendList from "@/components/FriendDetails";
</script>

<template>
  <NavbarConnected/>
  <div style="text-align: center; margin-bottom: 20px"><input type="text" v-model="searchText" @keydown.enter="ask_friendship" placeholder="Demander l'amitié à..."></div>
  <div v-if="Friends != null">
    <h1 class="titlePage">Liste des Amis</h1>
    <FriendList v-for="Friend in Friends" :friend_email="Friend.mail_Clients" :name="Friend.pseudo_Clients" is_Friend="OUI" :Us_email="this.Us_mail"></FriendList>
  </div>
  <div v-if="Askers!=null">
    Liste des Demandes d'Amis
    <FriendList v-for="Asker in Askers" :friend_email="Asker.mail_Clients" :name="Asker.pseudo_Clients" :is_Friend="Asker.Status" :Us_email="this.Us_mail"></FriendList>
  </div>
  <TheFooter/>
</template>

<script>

export default {
  name: "MyFriends",
  data(){
    return {
      Friends:null,
      Askers:null,
      searchText: "",
      Us_mail:sessionStorage.getItem('user_email')
    }
  },

  mounted() {
    this.fetch_friends_datas();
  },
  methods:{
    fetch_friends_datas(){
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires

      var datas = {
        email: sessionStorage.getItem('user_email')
      };

      fetch("http://localhost:"+port+"/req_datas_friends", {
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
              this.Friends=data.donnees;
            } else {
              alert("Erreur lors de la récupération des amis !");
            }
          }).catch(error => {
        // Gérer les erreurs
        console.error("HERETICAL ERROR :", error);
      });


      fetch("http://localhost:"+port+"/req_datas_askers", {
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
              this.Askers=data.donnees;
            } else {
              alert("Erreur lors de la récupération des demandes d'amis !");
            }
          }).catch(error => {
        // Gérer les erreurs
        console.error("HERETICAL ERROR :", error);
      });
    },

    ask_friendship(){
      var datas={
        friend_pseudo:this.searchText
      }
      fetch("http://localhost:"+port+"/req_ask_friendship1", {
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
            if (data.status === "success") {
              alert(data.message);
              datas = {
                friend_email:data.donnees[0].mail_Clients,
                email:this.Us_mail,
              };
              console.log(datas.email);
              fetch("http://localhost:"+port+"/req_ask_friendship2", {
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
                    if (data.status === "success") {
                      alert(data.message);
                    }
                    else{
                      alert('ERREUR LORS DE LA DEMANDE')
                    }
                  })
            }
            else{
              alert('ERREUR : LE FUTUR AMI EST INEXISTANT')
            }
          })

    }
  }
}
</script>

<style>
.Centered{
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 4px 8px black;
  margin-right: 900px;
  margin-left: 700px;
  position: absolute;
}
.ToLeft{
  margin-bottom: 20px;
}
.ToRight{
  text-align: right;
}
.overflow{
  overflow: auto;
}
.Friend{
  margin-bottom: 40px;
  box-shadow: 0 4px 8px black;
  margin-right: 1200px;
  margin-left: 0;
}
</style>