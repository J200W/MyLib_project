<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import BookReader from "@/components/BookReader.vue";
import { port } from "../../../backend/controllers/Tools_controllers";
var connected = sessionStorage.getItem('connected');

if (connected == null) {
  connected = false;
}
else if (connected == "true") {
  connected = true;
}
else {
  connected = false;
}

if (!connected) {
  this.$router.push({ name: 'LogIn' });
  console.log("not connected")
}


</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <BookReader :src="pdf"></BookReader>
</template>



<script>
export default {
  name: 'ReadBook',
  data() {
    return {
      pdf: null,
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    window.onload = () => {
      window.scrollTo(0, 0);
    };
    this.fetchBookPDF();
    this.disablePrintShortcut();
  },
  methods: {
    fetchBookPDF() {
      console.log(sessionStorage.getItem('id_ebook'))
      var datas = JSON.stringify({
        id_ebook: sessionStorage.getItem('id_ebook')
      });

      fetch("http://localhost:" + port + "/get_pdf",
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: datas,
          })
          .then(response => response.json())
          .then(data => {
            this.pdf = data.donnees.toString();
            console.log(this.pdf);
          })
          .catch(error => {
            console.log(error);
          });
    },
    
    // FONCTION POUR EMPECHER CTRL+P
    disablePrintShortcut() {
      // Ajout d'un écouteur pour intercepter les événements clavier
      document.addEventListener('keydown', this.preventPrint);
    },
    preventPrint(event) {
      // Vérifier si Ctrl+P est pressé (car le code de touche pour P est 80)
      if (event.ctrlKey && (event.key === 'p' || event.keyCode === 80)) {
        event.preventDefault(); // Empêcher le comportement par défaut
        alert('La fonction d\'impression a été désactivée.');
        // Vous pouvez afficher un message ou effectuer d'autres actions ici
      }
    }
  },
  beforeDestroy() {
    // Assurez-vous de supprimer l'écouteur d'événement lors de la destruction du composant
    document.removeEventListener('keydown', this.preventPrint);
  }
}
</script>