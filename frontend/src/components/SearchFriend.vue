<script setup>
import NavbarConnected from "@/components/NavbarConnected.vue";
import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
import TheFooter from "@/components/TheFooter.vue";
import functions_nav from "@/router/functions_nav";
import { port } from "../../../backend/controllers/Tools_controllers";
import SearchFriendContent from "@/components/SearchFriendContent.vue";
import { ref, onMounted } from 'vue';
const image = ref(null);
const isLoading = ref(false);
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
  <h1 id="title-MyEbook">Results for "{{ this.search }}"</h1>
  <SearchFriendContent v-if="book_list" :books="book_list" :manage="false" />
  <TheFooter />
</template>

<script>
export default {
  name: "SearchFriend"
}
</script>

<style scoped>

</style>