<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import BookReader from "@/components/BookReader.vue";
    var connected = sessionStorage.getItem('connected');

    if (connected == null) {
        connected = false;
    }

    const source3 = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <BookReader :src="source3"></BookReader>
</template>
  
  

<script>
export default {
    name: 'ReadBook',
    data() { return {} },
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
        }
    },
}
</script>