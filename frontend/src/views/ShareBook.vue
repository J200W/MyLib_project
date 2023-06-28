<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from "@/components/TheFooter.vue";
    import Share from "@/components/Share.vue"
    var connected = sessionStorage.getItem('connected');

    if (connected == null) {
        connected = false;
    }

</script>

<template>
  <NavbarConnected v-if="connected" />
  <NavbarNonConnected v-if="!connected" />
  <Share />
  <TheFooter />
</template>

  
  
  
<style></style>
  
<script>
export default {
    name: 'ShareBook',
    data() { return {} },
    methods: {

    }
}
</script>