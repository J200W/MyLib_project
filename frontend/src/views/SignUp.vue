<script setup>
import NavbarSimple from "@/components/NavbarSimple.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>


<template>
    <NavbarSimple />

    <body>
        <div id="tab-selector">
            <router-link class="tabs" to="/LogIn">Log In</router-link>
            <router-link class="tabs selected" to="/SignUp">Sign Up</router-link>
        </div>

        <form id="form-signup" action="" method="post">
            <label class="form-label" for="pseudo">Pseudo</label>
            <input class="form-input" type="text" id="pseudo" name="pseudo" required>
            <label class="form-label" for="date">Date of birth</label>
            <input class="form-input" type="date" id="date" name="date" required>
            <label class="form-label" for="email">Email Address</label>
            <input class="form-input" type="email" id="email" name="email" required>
            <label class="form-label" for="password">Password</label>
            <input class="form-input" type="password" id="password" name="password" required><br><br>
            <input class="form-submit" type="submit" value="Submit">
        </form>

    </body>
    <TheFooter />
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

#form-signup {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    padding: 40px 40px 40px 40px;
    width: 50%;
    background-color: #FFF;
    top: 50%;
    left: 50%;
    margin: auto;
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
    border: #A8A787 2px solid;
    background-color: #D0AB77;
    color: #FFF;
    width: 50%;
    margin: auto;
}

.form-submit:hover {
    background-color: #D79262;
    border: #545444 2px solid;
    color: white;
    transition: all 0.3s ease 0s;
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
export default {
    name: 'SignUp',
    data() { return {} },
    methods: {
        link_HomePage: function (event) {
            this.$router.push({ path: '/' })
        },
        link_LogIn: function (event) {
            this.$router.push({ path: '/LogIn' })
        },
        link_SignUp: function (event) {
            this.$router.push({ path: '/SignUp' })
        },
        link_ForgottenPassword: function (event) {
            this.$router.push({ path: '/ForgottenPassword' })
        },
        link_MyAccount: function (event) {
            this.$router.push({ path: '/MyAccount' })
        },
        link_BookDetails: function (event) {
            this.$router.push({ path: '/BookDetails' })
        },
        link_MyEbooks: function (event) {
            this.$router.push({ path: '/MyEbooks' })
        },
        link_MyFavorites: function (event) {
            this.$router.push({ path: '/MyFavorites' })
        },
        link_MyHistory: function (event) {
            this.$router.push({ path: '/MyHistory' })
        },
        link_BorrowBook: function (event) {
            this.$router.push({ path: '/BorrowBook' })
        },
        link_ReadBook: function (event) {
            this.$router.push({ path: '/ReadBook' })
        },
        link_SearchBook: function (event) {
            this.$router.push({ path: '/SearchBook' })
        },
        link_ShareBook: function (event) {
            this.$router.push({ path: '/ShareBook' })
        },
        link_MainPage: function (event) {
            this.$router.push({ path: '/MainPage' })
        },
    }
}
</script>