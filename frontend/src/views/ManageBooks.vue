<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import SearchBookSort from "@/components/SearchBookSort.vue";
import SearchBookContent from "@/components/SearchBookContent.vue";
import TheFooter from "@/components/TheFooter.vue";
import functions_nav from "@/router/functions_nav";
import { port } from "../../../backend/controllers/Tools_controllers";
import { ref, onMounted } from 'vue';
const image = ref(null);
var research_data = sessionStorage.getItem('research');

var connected = sessionStorage.getItem('connected');

if (connected == null) {
    connected = false;
}
if (connected == "true") {
    connected = true;
}
if (connected == "false") {
    connected = false;
}

</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <h1 id="title-MyEbook">eBooks of {{name_lib}}</h1>
    <SearchBookSort :result="research_data"  @category="updateCategory" @theme="updateTheme" />
    <SearchBookContent v-if="book_list" :manage="true" :books="book_list" :search="''" />
    <TheFooter />
</template>
  
<script>

export default {
    name: 'ManageBooks',
    data() {
        return {
            book_list: null,
            category: null,
            theme: null,
            name_lib: null,
        }
    },
    mounted() {
        this.fetchLibraryBooks()
    },
    methods: {
        fetchLibraryBooks() {
            let url = "http://localhost:" + port + "/books_library"
            const requestBody = {
                email: sessionStorage.getItem('user_email')
            };
            fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("Something went wrong on api server!");
                    }
                })
                .then((response) => {
                    this.book_list = response;
                }).catch((error) => {
                    console.error(error);
                });
        },
        updateCategory(category) {
            this.category = category;
            this.fetchMyBooksPage()
        },
        updateTheme(theme) {
            this.theme = theme;
            this.fetchMyBooksPage()
        },
    },
    components: {
        NavbarConnected,
        NavbarNonConnected,
        SearchBookSort,
        SearchBookContent,
        TheFooter,
    },
}

</script>

<style scoped>
    #title-MyEbook {
        font-size: 5vmin;
        text-align: left;
        color: "#000000";
        margin-left: 5%;
    }
</style>