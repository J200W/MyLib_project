<template>

    <p>Hi</p>
  </template>
  
  
  
  <style>
    
  </style>
  
  <script>
    export default{
      name:'MyHistory',
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