<script setup>
import {link_SearchBook} from "@/router/functions_nav";
import {port} from "../../../backend/controllers/Tools_controllers";
</script>

<template>
    <div id="navbar">
        <div id="navbar-left">
            <router-link to="/MainPage">
                <img id="logo" src="@/assets/logo.png" alt="logo">
            </router-link>
            <form id="search-bar" @submit="submitForm">
                <input placeholder="I am looking for..." type="text" name="search-input" id="search-input" v-model="researched_name">
                <input type="submit" value="Search" id="search-submit">
            </form>
        </div>
        <div id="navbar-right">
            <router-link class="navbar-link" to="/LogIn">Log In</router-link>
            <router-link class="navbar-link" to="/SignUp">Sign up</router-link>
        </div>
    </div>
    <div id="empty"></div>
</template>

<style>

    #empty {
        height: 100px;
    }

    #navbar {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: left;
        max-height: 100px;
        height: auto;
        background-color: #D0AB77;
        width: 100%;
        z-index: 2;

    }

    #logo {
        height: 5rem;
        margin: auto;
        display: block;
    }

    .navbar-link {
        font-size: 2vmin;
        padding: 15px;
        margin: 0.5rem;
        text-decoration: none;
        color: black;
        align-items: left;
        border: 2px solid black;
        border-radius: 40px;
    }

    .navbar-link:hover {
        background-color: #0C0A0B;
        border: black 2px solid;
        border-radius: 40px;
        transition: all 0.3s ease-in-out;
        color: white;
    }

    #search-bar {
        display: flex;
        flex-direction: row;
        max-height: 100px;
        background-color: #D0AB77;
        width: fit-content;
        margin: auto;
        padding: 0.6rem;
    }

    #search-input {
        font-size: 2vmin;
        padding: 0.6rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-top: 0;
        margin-bottom: 0;
        text-decoration: none;
        color: black;
        align-items: left;
        border: 2px solid #FFF;
        background-color: #FFF;
        width: 100%;
    }

    #search-submit {
        border: #D79262 2px solid;
        background-color: #D79262;
        color: #FFF;
    }

    #navbar-left {
        display: flex;
        flex: 1;
        justify-content: left;
        align-items: center;

        max-height: 100px;
        background-color: #D0AB77;
        width: 100%;
    }

    #navbar-right {
        display: flex;
        flex: 1;
        justify-content: right;
        align-items: center;
        max-height: 140px;
        background-color: #D0AB77;
        margin-right: 20px;
    }

    #section {
        display: flex;
        justify-content: right;
        align-items: center;
        width: 50%;
        margin-right: 20px;
    }


    @media (max-width: 1100px) {
      #logo {
          height: 3rem;
      }
    }
</style>

<script>

export default
    {
        name: 'NavbarNonConnected',
        data() {
            return {
                researched_name: ''
            };
        },
        mounted() {
            this.fetchUserData();
        },
        methods: {
            fetchUserData() {
            },

            submitForm(event) {
                // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
                if (this.search == "") this.search = " ";
                if (this.search !== '') {
                    console.log('Formulaire soumis !', this.search);
                    event.preventDefault();

                    let datas = {
                        search: this.search
                    };

                    fetch("http://localhost:" + port + "/send_research_fromNavBar", {
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
                            sessionStorage.setItem('research', this.search);
                            this.$router.push(
                                {
                                    path: '/SearchBook',
                                    query: { search: this.search }
                                }
                            )
                            // Check if we are already on the page
                            // Get the current path
                            var link = window.location.href;

                            var currentPath = link.substring(link.lastIndexOf('/') + 1).split('?')[0];
                            if (currentPath == 'SearchBook') {
                                // wait and reload
                                setTimeout(function () {
                                    window.location.reload();
                                }, 100);
                            }
                        }).catch(error => {
                            // Gérer les erreurs
                            console.error("Erreur lors de l'envoi du formulaire :", error);
                        });
                }
            }
          }
        }
    }

</script>