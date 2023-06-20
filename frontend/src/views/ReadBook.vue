<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from "@/components/TheFooter.vue";

    var connected = true;
</script>

<template>
    <NavbarConnected v-if="connected" />
    <NavbarNonConnected v-if="!connected" />
    <p>Hi</p>
    <TheFooter />
</template>
  
  
  
<style></style>
  
<script>
export default {
    name: 'ReadBook',
    data() { return {} }
}
</script>