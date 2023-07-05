<script setup>
import NavbarSimple from "@/components/NavbarSimple.vue";
import TheFooter from "@/components/TheFooter.vue";
import {port} from "../../../backend/controllers/Tools_controllers";
import { link_MainPage } from "@/router/functions_nav";
</script>

<template>
    <NavbarSimple />

    <body>

        <div id="tab-selector">
            <router-link class="tabs selected" to="/LogIn">Log In</router-link>
            <router-link class="tabs" to="/SignUp">Sign Up</router-link>
        </div>

        <form id="form-login" @submit="submitForm">
            <label class="form-label" for="username">Email Address</label>
            <input class="form-input" type="email" id="username" name="username" v-model="email" required>
            <label class="form-label" for="password">Password</label>
            <input class="form-input" type="password" id="password" name="password" v-model="password" required>
            <label class="form-label" for="admin">Adminstrator</label>
            <input class="form-checkbox" type="checkbox" id="admin" name="admin" v-model="admin"><br><br>
            <input class="form-submit" type="submit" value="Submit">
            <p id="pwdforgotten">Password forgotten ?
                <span>
                    <router-link to="/ForgottenPassword">Reset password</router-link>
                </span>
            </p>
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

#form-login {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    padding: 40px 40px 40px 40px;
    width: 50%;
    background-color: #FFF;
    left: 50%;
    margin: auto;
}

#tab-selector {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
    background-color: #FFF;
    top: 50%;
    left: 50%;
    margin: auto;
}

.tabs {
    flex: 1;
    text-decoration: none;
    color: black;
    width: 100%;
    text-align: center;
    padding: 1rem;
}

.tabs:hover {
    background-color: #D79262;
    color: white;
    transition: all 0.3s ease 0s;
}

.selected {
    background-color: #D79262;
    color: white;
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

#pwdforgotten {
    font-size: 1.5vmin;
    margin-top: 1rem;
}

.form-checkbox {
    justify-content: flex-start;
    align-items: flex-start;
    width: 3vmin;
    height: 3vmin;
}

@media (max-width: 1100px) {
    #section {
        width: 50%;
    }

    #section router-link {
        font-size: 2vmin;
        padding: 0.6rem;
    }
}
</style>

<script>


export default
    {
        name: 'LogIn',
        data() {
            return {
                email: '',
                password: '',
                admin: null
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
              console.log('Formulaire soumis !', this.email, this.password, this.admin);
                event.preventDefault();
                if (this.admin == null) {
                    this.admin = false;
                }

                var datas = {
                    email: this.email,
                    password: this.password,
                    admin: this.admin
                };

                fetch("http://localhost:" + port + "/send_login", {
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
                        console.log(data);
                        data = JSON.parse(data);
                      alert(data.message);
                        if (data.status === "success") {
                            if (this.admin === true) {
                                sessionStorage.setItem('admin', "true");
                            } else {
                                sessionStorage.setItem('admin', "false");
                            }
                            sessionStorage.setItem('user_email', data.donnees.email);
                            sessionStorage.setItem('user_pseudo', data.donnees.pseudo);
                            sessionStorage.setItem('connected', true);
                            var email = sessionStorage.getItem('user_email');
                            if (email == null) {
                              email = "";
                            }
                            link_MainPage.call(this);
                        }
                    }).catch(error => {
                        // Gérer les erreurs
                        console.error("Erreur lors de l'envoi du formulaire :", error);
                    });

            }
        }
    }
</script>
