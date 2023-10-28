<script setup>

var connected = sessionStorage.getItem('connected');
</script>
<template>
  <div v-for="friend in Friends" :key="friend.id">
    <div>
      <p>friend_name : {{friend.pseudo_client}}</p>
      <p>friend_email : {{friend.email}}</p>
      <p>Delete Friend</p>
      <button>Show Messages</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "FriendsList",
  Friends:[],
  methods:{
    fetchUserFriendsData(){
      var datas = {email: email}
      fetch("http://localhost:" + port + "/req_datas_friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      })
          .then(response => response.json())
          .then(data => {
            this.Friends = data;
            if (this.Friends.length == 0) {
              this.Friends = null;
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>