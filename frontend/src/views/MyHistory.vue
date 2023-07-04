<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import MyEbooksSort from "@/components/MyEbooksSort.vue";
    import MyEbooksContent from "@/components/MyEbooksContent.vue";
    import TheFooter from "@/components/TheFooter.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import { port } from "../../../backend/controllers/Tools_controllers";
    var connected = sessionStorage.getItem('connected');
    //var pseudo = sessionStorage.getItem('user_pseudo')

    if (connected == null) {
        connected = false;
    }

    const books_act = [
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

    ]

    const books_inact = [{
      id: 4,
      title: "One Piece Tome 99",
      src: require("@/assets/onepiece99.png"),
      author: "Eiichiro Oda",
      date: "04/08/2021",
      library: "Bibliothèque Municipale de Livry-Gargan",
      time: "1d 12h 32m",
    },]
</script>

<template>
  <NavbarConnected v-if = "connected" />
  <NavbarNonConnected v-if = "!connected" />
  <h1>Emprunts Actifs</h1>
  <body>
  <MyEbooksSort :pseudo=pseudo />
  <MyEbooksContent :books=books />
  </body>

    <div>
      <h1>Emprunts Passés</h1>
      <div v-if="books_done.length === 0">
        <p>Aucun emprunt Passé.</p>
      </div>
      <div v-else>
        <MyEbooksContent :books=books_done />
      </div>
    </div>

  <TheFooter />
</template>
  
  
  
<style></style>
  
<script>
  export default {
  data() { return {
    books: [],
    books_done: [],
    pseudo: sessionStorage.getItem('user_pseudo')
  }},
  mounted(){
    this.fetchBookHistory();
    this.fetchcurrentBooks();
  },
  methods: {
  redirigerVersEbook(ebookId) {
    this.$router.push({ path: '/BookDetails' })
},
  fetchBookHistory(){
    let datas = {
                        email: sessionStorage.getItem('user_email')
                    };
            fetch("http://localhost:"+ port +"/my_history", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                        //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                    },
                    body: JSON.stringify(datas)
                })
            .then(response => {
              if (response.status >= 200 && response.status <= 299) {
                  const temp = response.json();
                  return temp;
              } else {
                  return response;
              }})
            .then(data => {
                // Traiter la réponse du serveur
                if(data.status=="success"){
                    this.books_done = data.donnees
                } else {
                    this.books_done = []
                    console.log("no books borrowed")
                }
            }).catch(error => {
                // Gérer les erreurs
                console.error("Erreur lors de l'envoi du formulaire :", error);
            });
  },
  fetchcurrentBooks(){           
                let url = "http://localhost:" + port + "/my_books"
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
                       if (response.status >= 200 && response.status <= 299) {
                            const temp = response.json();
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
};
</script>