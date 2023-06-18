<script setup>
import function_nav from "@/router/functions_nav";
</script>
<template>
  <div class="container">
      <img src="../assets/logo.png" width="140" height="140">
      <h1 class="main"> Welcome to MyLib </h1>
      <p> Explore our extensive catalog and dive into a world of captivating reads. </p>
      <button>Explore Now</button>
  </div>
   <body>
    This is the Home Page !<br><br>
      <p v-on:click=function_nav.link_MyEbooks.call(this) >MyEbooks</p>
      <p v-on:click=function_nav.link_LogIn.call(this) >LogIn</p>
      <p v-on:click=function_nav.link_SignUp.call(this) >SignUp</p>
      <p v-on:click=function_nav.link_ForgottenPassword.call(this) >ForgottenPassword</p>
      <p v-on:click=function_nav.link_MyAccount.call(this) >MyAccount</p>
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
    }
  }
</script>