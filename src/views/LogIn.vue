<template>
    <div id="navbar">
        
        <router-link to="/">
            <img id="logo" src="@/assets/logo.png" alt="logo">
        </router-link>
        
        <!--<div id="section">
        
        Non connectÃ©
            <router-link class="links" to="/login">Log In</router-link>
        Exemple
            <router-link to="/">Account</router-link>
            <router-link to="/signup">Sign Up</router-link>

        #section {
            display: flex;
            justify-content: right;
            align-items: center;
            width: 50%;
            margin-right: 20px;
        }

        </div>-->

    </div>
    <body>

        <form action="" method="post">
            <label class="form-label" for="username">Email Address</label>
            <input class="form-input" type="email" id="username" name="username" required>
            <label class="form-label" for="password">Password</label>
            <input class="form-input" type="password" id="password" name="password" required><br><br>
            <input class="form-submit" type="submit" value="Submit">
            <p id="pwdforgotten">Password forgotten ? <span><router-link to="/resetpassword">Reset password</router-link></span></p>
        </form>
        
    </body>
</template>

<style>

    * {
        box-sizing: border-box;
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    body {
        background-color: #F7EDE2;
    }

    #navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        padding: 5px;
        max-height: 140px;
        background-color: #0C0A0B;
    }

    #logo {
        height: 5rem;
        margin: auto;
        display: block;
    }

    .links {
        text-decoration: none;
        color: white;
        background-color: #0C0A0B;
        font-size: 2.5vmin;
        border: #f5f5f5 2px solid;
        border-radius: 40px;
        padding: 0.8rem;
        margin-left: 1rem;
    }
    
    .links:hover {
        color: black;
        background-color: #FFF !important;
        transition: all 0.1s ease-in-out;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: left;
        padding: 40px 40px 40px 40px;
        width: 50%;
        background-color: #DCDADA;
        top: 50%;
        left: 50%;
        margin: auto;
        margin-top: 10%;
    }

    .form-label {
        font-size: 2.5vmin;
        margin-bottom: 0.5rem;
    }

    .form-input {
        font-size: 2.5vmin;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 10px;
        border: #A09C9C 2px solid;
        background-color: #A09C9C;
        color: #FFF;
    }

    .form-submit {
        font-size: 2.5vmin;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 10px;
        border: #0C0A0B 2px solid;
        background-color: #0C0A0B;
        color: #FFF;
        width: 50%;
        margin: auto;
    }

    .form-submit:hover {
        color: black;
        background-color: #FFF !important;
        transition: all 0.1s ease-in-out;
    }
    #pwdforgotten {
      font-size: 1.5vmin;
      margin-top: 1rem;
    }

    @media (max-width: 1100px) {
        #section {
            width: 50%;
        }

        #section router-link {
            font-size: 2vmin;
            padding: 0.6rem;
        }

        #logo {
            height: 3rem;
        }
    }

</style>

  <script>
    export default{
      name:'LogIn',
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