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
    <h1 id="title-MyEbook">eBooks of {{ name_lib }}</h1>
    <SearchBookSort :result="research_data" @category="updateCategory" @theme="updateTheme" />
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
            var url = new URL(window.location.href);
            var category = url.searchParams.get("category");
            var theme = url.searchParams.get("theme");
            var sort = url.searchParams.get("sort_filter");

            if (category == null) {
                category = "None";
            }
            if (theme == null) {
                theme = "None";
            }
            if (sort == null) {
                sort = "titre";
            }
            const datas = {
                email: sessionStorage.getItem('user_email'),
                category: category,
                theme: theme,
                sort_filter: sort,
            };
            console.log(datas)
            fetch("http://localhost:" + port + "/books_library", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datas),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status !== 'success') {
                        console.log("Error in fetching books");
                    }
                    else {
                        this.book_list = data.donnees[0];
                        this.name_lib = data.donnees[1];
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        updateCategory(category) {
            this.category = category;
        },
        updateTheme(theme) {
            this.theme = theme;
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