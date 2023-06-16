<template>
  <div class="container">
      <img src="../assets/logo.png" width="140" height="140">
      <h1 class="main"> Welcome to MyLib </h1>
      <p> Explore our extensive catalog and dive into a world of captivating reads. </p>
      <button>Explore Now</button>
  </div>
   <body>
    This is the Home Page !<br><br>
      <p v-on:click=link_MyEbooks() >MyEbooks</p> 
      <p v-on:click=link_LogIn() >LogIn</p> 
      <p v-on:click=link_SignUp() >SignUp</p> 
      <p v-on:click=link_ForgottenPassword() >ForgottenPassword</p> 
      <p v-on:click=link_MyAccount() >MyAccount</p> 
  </body> 
</template>




<style scoped>
p {
color : #6D6779;
font-weight: bold;
}

h1.main {
/* margin: auto;
padding: 300px; */
color : black;
font-family: 'Kanit';
font-weight: bold;
font-size: 5rem;

}  


button {
background-color: black;
padding: 10px 44px;
border-radius: 20px;
color: white;
font-family : 'Kanit';

transition-duration: 0.25s;
}

button:hover {
background-color: white; /* Green */
color: black;
}


.container{
margin-top : 120px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
gap : 2em

}
</style>

<script>
  export default{
    name:'HomePage',
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