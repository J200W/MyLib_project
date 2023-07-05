<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from '@/components/TheFooter.vue';
import { port } from "../../../backend/controllers/Tools_controllers";
import { ref } from 'vue';
const book = JSON.parse(sessionStorage.getItem('book'));
const bookSrc = ref(book.src);
const bookTitre = ref(book.titre);

</script>
<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />

    <body>
        <img id="bookImg" :src="bookSrc" :alt="bookTitre">
        <div class="form-container">
            <div>
                <h2 class="titre">Enter the loan end date</h2>
            </div>
            <div class="form-group">
                <form>
                    <input type="date" id="dateInput" required>
                </form>
            </div>
            <input type="submit" value="Confirm" class="bouton" @click="borrow">
        </div>
    </body>
    <TheFooter />
</template>
<script>
import { ref } from "vue";
export default {
    name: 'BorrowBook',
    data() {
        return {
            selectedDate: null
        }
    },
    mounted() {
        var connected = sessionStorage.getItem('connected');


        if (connected == null) {
            connected = false;
        }

        if (connected == "true") {
            connected = true;
        }
        else {
            connected = false;
        }

        if (connected == false) {
            alert("You must be connected to borrow a book");
            window.location.href = "/LogIn";
        }
        return
    },
    methods: {
        borrow() {
            this.selectedDate = document.getElementById('dateInput').value;
            // Put maximum date to 3 weeks after today
            let today = new Date();
            let maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21);
            if (this.selectedDate > maxDate.toJSON().slice(0, 10)) {
                alert("You can't borrow a book for more than 3 weeks");
                return;
            }
            const book = JSON.parse(sessionStorage.getItem('book'));
            let datas = {
                user_mail: sessionStorage.getItem('user_email'),
                book_id: book.id_ebook,
                debut_emprunt: new Date().toJSON().slice(0, 10),
                fin_emprunt: this.selectedDate
            };
            console.log(datas)
            fetch("http://localhost:" + port + "/borrow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                    //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(datas)
            })
                .then(response => response.text())
                .then(data => {
                    // Récupérer les données au format JSON
                    data = JSON.parse(data);
                    if (data.status === "success") {
                        alert("Book borrowed successfully");
                        this.$router.push('/MyEbooks');
                    }
                    else {
                        alert(data.message);
                    }
                }).catch(error => {
                    // Gérer les erreurs
                    console.error("Erreur lors de l'envoi du formulaire :", error);
                });
            // Reste du code de votre méthode borrow...
            return true;
        }
    }
}
</script>
<style scoped>
#bookImg {
    margin: auto;
    display: block;
    max-width: 250px;
}

.form-container {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #FFFFFF;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
