<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import MyEbooksSort from "@/components/MyEbooksSort.vue";
    import MyEbooksContent from "@/components/MyEbooksContent.vue";
    import TheFooter from "@/components/TheFooter.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import { port } from "../../../backend/controllers/Tools_controllers";

    /*const books = [
        {
            id: 1,
            title: "One Piece Tome 96",
            src: require("@/assets/onepiece96.png"),
            author: "Eiichiro Oda",
            date: "04/11/2020",
            library: "Bibliothèque de l'Université de Lille",
            time: "34d 12h 32m",
        },

        {
            id: 2,
            title: "One Piece Tome 97",
            src: require("@/assets/onepiece97.png"),
            author: "Eiichiro Oda",
            date: "03/02/2021",
            library: "Bibliothèque de l'Université de Paris 8",
            time: "12d 23h 12m",
        },
        {
            id: 3,
            title: "One Piece Tome 98",
            src: require("@/assets/onepiece98.png"),
            author: "Eiichiro Oda",
            date: "07/04/2021",
            library: "Bibliothèque Municipale de Lyon",
            time: "4d 12h 32m",
        },
        {
            id: 4,
            title: "One Piece Tome 99",
            src: require("@/assets/onepiece99.png"),
            author: "Eiichiro Oda",
            date: "04/08/2021",
            library: "Bibliothèque Municipale de Livry-Gargan",
            time: "1d 12h 32m",
        },
    ]*/

    var connected = sessionStorage.getItem('connected');

    if (connected == null) {
        connected = false;
    }
</script>

<template>

    <NavbarConnected v-if = "connected" />
    <NavbarNonConnected v-if = "!connected" />
    <body>
        <MyEbooksSort :pseudo=pseudo />
        <MyEbooksContent :books=books />
    </body>
    <TheFooter />
</template>
  
<style>
.nav_bar {
    color: rgb(0, 0, 0);
    background-color: rgb(225, 128, 67);
}
</style>
  
<script>
export default {
    name: 'MyEbooks',
    data() { return {
        books : [],
        pseudo : sessionStorage.getItem('user_pseudo')
    } },
    mounted() {
        this.fetchMyBooksPage()
    },
    methods: {
        fetchUserData() {
            },
            fetchMyBooksPage() {            
                let url = "http://localhost:" + port + "/my_books"
                console.log("session st", sessionStorage.getItem('user_email'))
                console.log('le deuxiieme', [JSON.stringify(sessionStorage.getItem('user_email'))])
                const requestBody = {
                    email: sessionStorage.getItem('user_email')
                };
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                        //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then(response => {
                        console.log('pouet');
                        console.log('donc on a a raw', response);
                        if (response.status >= 200 && response.status <= 299) {
                            const temp = response.json();
                            console.log('pouet bis',temp);
                            return temp;
                        } else {
                            return response;
                        }
                    })
                    .then(data => {
                        // Traiter la réponse du serveur
                        //data = JSON.parse(data);
                        console.log('et ici ?', data)
                        if(data.status=="success"){
                            this.books = data.donnees
                        } else {
                            this.books = []
                            console.log("no books borrowed")
                        }
                        
                        
                    }).catch(error => {
                        // Gérer les erreurs
                        console.error("Erreur lors de la réception du formulaire du formulaire :", error);
                    });

            }
    }
}
</script>