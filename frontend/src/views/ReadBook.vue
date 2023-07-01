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
    },
    methods: {
        fetchBookPDF() {
            var datas = JSON.stringify({
                id_ebook: sessionStorage.getItem('id_book')
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
        }
    },

}
</script>