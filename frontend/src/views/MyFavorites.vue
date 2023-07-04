<script setup>

    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from '@/components/TheFooter.vue'
    import MyEbooksSort from "@/components/MyEbooksSort.vue";
    import MyEbooksContent from "@/components/MyEbooksContent.vue";
    import { port } from "../../../backend/controllers/Tools_controllers";

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

    const pseudo = sessionStorage.getItem('user_pseudo');

</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <body>
     <MyEbooksSort :pseudo="pseudo" :fav="true" />
     <MyEbooksContent :books="books_fav" :fav="true"  />
  </body>
    <TheFooter />
</template>

<style scoped></style>
  
<script>
    export default {
        name: 'MyFavorites',
        data() { return {
            books_fav : []
        } },
        mounted() {
            this.fetchMyFavorites()
        },
        methods: {
          fetchMyFavorites() {
            fetch("http://localhost:" + port + "/get_favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: sessionStorage.getItem('user_email')
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                this.books_fav = data.donnees;
                console.log(this.books_fav)
            })
            .catch((error) => {
                console.error("Error:", error);
            });

          }
        }
    }
</script>