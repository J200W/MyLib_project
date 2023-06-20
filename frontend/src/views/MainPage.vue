<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import Carousel from "@/components/Carousel.vue";
    import TheFooter from "@/components/TheFooter.vue";
    //import {OnePiece96} from "../assets";
    /*
    const src_images = [require("@/assets/onepiece96.png"),
      require("@/assets/onepiece97.png"),
      require("@/assets/onepiece98.png"),
      require("@/assets/onepiece99.png")];*/



    // VARIABLE TEMPORAIRE: pour les require uniquement
    const temp_images = [
      {
        id: 11,
        src: require("@/assets/onepiece96.png"),
        title: "96",
      },

      {
        id: 12,
        src: require("@/assets/onepiece97.png"),
        title: "97",
      },

      {
        id: 13,
        src: require("@/assets/onepiece98.png"),
        title: "98",
      },

      {
        id: 14,
        src: require("@/assets/onepiece99.png"),
        title: "99",
      }
    ]

    var connected = true;
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <h1 id="titleMainPage">Unleash your imagination with an extensive eBook collection</h1>
    <hr id="hr">
    <div id="carousels">
        <Carousel :images="temp_images" :name="'Continue to read'" />
        <Carousel :images="temp_images" :name="'New'" />
        <Carousel :images="temp_images" :name="'Discover'" />
    </div>

    <TheFooter />
    
</template>




<style>

#hr {
    width: 80%;
    margin: auto;
}

#carousels {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 20px;
}

#titleMainPage {
    margin: auto;
    width: 100%;
    display: block;
    text-align: center;
    font-weight: bolder;
    font-size: 5vmin;
    margin-bottom: 20px;
}
</style>

<script >
export default {
  name:'MainPage',
  data() {
    return {
      images: []
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      // Effectuer une requête HTTP vers la page PHP pour récupérer les données utilisateur
      fetch('http://localhost:80/books_for_main_page')
          .then(response => response.json())
          .then(data => {
            console.log('Données utilisateur reçues:', data);
            this.images = data;
            /*Tri en fonction des templates ?*/
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données utilisateur:', error);
          });
    }
  }
};
</script>