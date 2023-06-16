<template>
  <div class="nav_bar">
    <p v-on:click=link_MyEbooks() >My Ebooks</p>
    <p v-on:click=link_MyFavorites() >My Favorites</p> 
    <p v-on:click=link_MyHistory() >My History</p> 
    <p v-on:click=link_SearchBook() >Research</p> 
    <p v-on:click=link_MyAccount() class="profile"><img src="../assets/profil.png" alt="profile"></p>
</div>
</template>
  
<style>
  .nav_bar{color:rgb(0, 0, 0);background-color: rgb(225, 128, 67);}
  .profile{}
</style>
  
  <script>
    export default{
      name:'MyEbooks',
      data(){return {}},
      methods:{
        link_HomePage: function(event){
          this.$router.push({path: '/'})
        },
        link_LogIn: function(event){
          this.$router.push({path: '/LogIn'})
        },
        link_SignUp: function(event){
          this.$router.push({path: '/SignUp'})
        },
        link_ForgottenPassword: function(event){
          this.$router.push({path: '/ForgottenPassword'})
        },
        link_MyAccount: function(event){
          this.$router.push({path: '/MyAccount'})
        },
        link_BookDetails: function(event){
          this.$router.push({path: '/BookDetails'})
        },
        link_MyEbooks: function(event){
          this.$router.push({path: '/MyEbooks'})
        },
        link_MyFavorites: function(event){
          this.$router.push({path: '/MyFavorites'})
        },
        link_MyHistory: function(event){
          this.$router.push({path: '/MyHistory'})
        },
        link_BorrowBook: function(event){
          this.$router.push({path: '/BorrowBook'})
        },
        link_ReadBook: function(event){
          this.$router.push({path: '/ReadBook'})
        },
        link_SearchBook: function(event){
          this.$router.push({path: '/SearchBook'})
        },
        link_ShareBook: function(event){
          this.$router.push({path: '/ShareBook'})
        }
      }
    }
  </script>