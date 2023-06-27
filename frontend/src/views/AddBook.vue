<script setup>

    import AddBookComp from '../components/AddBookComp.vue'
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from "@/components/TheFooter.vue";

    var connected = sessionStorage.getItem('connected');

    if (connected == null) {
        connected = false;
    }

</script>

<template>

    <body>
        <NavbarConnected v-if="connected" />
        <NavbarNonConnected v-if="!connected" />
        <h1 class="titlePage">Add Book</h1>
        <hr class="hr">
        <AddBookComp />
        <TheFooter />
    </body>

</template>

<style scoped>


</style>

<script>
export default {
    name: 'AddBook',
    components: {
        AddBookComp
    },
    data() {
        return {
        }
    }
}

</script>