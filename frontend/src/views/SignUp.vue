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

        <form id="form-signup" @submit="submitForm">
            <label class="form-label" for="pseudo">Pseudo</label>
            <input class="form-input" type="text" id="pseudo" name="pseudo" v-model="pseudo" required>
            <label class="form-label" for="email">Email Address</label>
            <input class="form-input" type="email" id="email" name="email" v-model="email" required>
            <label class="form-label" for="password">Password</label>
            <input class="form-input" type="password" id="password" name="password" v-model="password" required><br><br>
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
    data() {
        return {
            pseudo: '',
            birthdate: '',
            email: '',
            password: ''
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
            console.log('Formulaire soumis !', this.email, this.password, this.pseudo);
            event.preventDefault();

            var datas = {
                email: this.email,
                password: this.password,
                pseudo: this.pseudo,
            };

            fetch("http://localhost:80/send_signUp", {
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
                    const message = data.message;
                    console.log(data)
                    if (data.status) {
                        alert(message);
                        this.$router.push('/LogIn');
                    } else {
                        alert(message);
                    }

                }).catch(error => {
                    // Gérer les erreurs
                    console.error("Erreur lors de l'envoi du formulaire :", error);
                });

        }
    }
}
</script>