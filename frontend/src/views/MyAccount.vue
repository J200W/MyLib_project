MyAccount




<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from "@/components/TheFooter.vue";
import {port} from "../../../backend/controllers/Tools_controllers";

var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <body>

        <h1 class="titlePage">My Account</h1>
        <hr class="hr">
        <form id="myAccountForm" @submit="submitForm">
            <div class="form-group">
                <label class="form-labelMyaccount" for="email">Email</label>
                <input type="email" class="form-input" v-model="email" name="email" readonly />
            </div>
            <div class="form-group">
                <label class="form-labelMyaccount" for="pseudo">Pseudo</label>
                <input type="text" class="form-input" v-model="pseudo" name="pseudo" placeholder="Entrez your new pseudo" />
            </div>
            <router-link class="form-group" to="/">
                Change password
            </router-link>
            <div class="form-group number">
                <label class="form-labelMyaccount">Number of borrowed books : </label>
                <span class="form-labelMyaccount"> {{ books }}</span>
            </div>
            <div id="myAccountButton">
                <input type="submit" class="form-submitMyAccount" value="Save information" />
                <button id="disconnect" class="form-submitMyAccount" @click="disconnect">Disconnect</button>
            </div>
        </form>
    </body>
    <TheFooter />
</template>

<style scoped>
#myAccountForm {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    padding: 40px 40px 40px 40px;
    width: 50%;
    background-color: #FFF;
    left: 50%;
    margin: auto;
    margin-top: 3vmin;
}

.form-group {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    padding: 10px 10px 10px 10px;
    width: 100%;
    background-color: #FFF;
    left: 50%;
    margin: auto;
}

.form-input {
    font-size: 2.5vmin;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    border: #A09C9C 2px solid;
    background-color: #A09C9C;
    color: #FFF;
    width: 100%;
}

.number {
    flex-direction: row;
}

#myAccountButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 10px 10px;
    width: 100%;
    background-color: #FFF;
    left: 50%;
    margin: auto;
}

.form-submitMyAccount {
    font-size: 2.5vmin;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    border: none;
    background-color: #A8A787;
    color: #FFF;
    width: 30%;
    transition: all 0.3s ease 0s;
    margin: auto;
}

.form-submitMyAccount:hover {
    background-color: #D79262;
    transition: all 0.3s ease 0s;
}

.form-labelMyaccount {
    font-size: 2vmin;

}

#disconnect {
    background-color: #d76462;
    transition: all 0.3s ease 0s;
    margin: auto;
}

#disconnect:hover {
    background-color: #d44340;
    transition: all 0.3s ease 0s;
}


@media screen and (max-width: 1000px) {
    #myAccountForm {
        width: 70%;
    }
}
</style>

<script >

export default {
    name: 'MyAccount',
    data() {
        return {
            email: sessionStorage.getItem('user_email'),
            pseudo: sessionStorage.getItem('user_pseudo'),
        };
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        fetchUserData(){
          // RECUPERER NUMBER BORROWED BOOKS
        },
        submitForm(event) {
            // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
            const admin = sessionStorage.getItem('admin')
            console.log('Formulaire soumis !', this.pseudo, this.email, admin);
            event.preventDefault();

            var datas = {
                pseudo: this.pseudo,
                email: this.email,
                admin: admin,
            };

            fetch("http://localhost:"+ port +"/modify_myAccount", {
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
                    console.log(data);
                    alert(data.message);
                    if(data.status){
                      sessionStorage.setItem('user_pseudo', data.donnees.pseudo);
                    }

                }).catch(error => {
                    // Gérer les erreurs
                    console.error("Erreur lors de l'envoi du formulaire :", error);
                });

        },

        disconnect() {
            sessionStorage.clear();
            this.$router.push('/');
        }
    }
};
</script>
