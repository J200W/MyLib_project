<script setup>

// let source = ref("@/public/Yohan_Saba_TP4_database.pdf")


</script>

<template>
    <div id="pdfViewer">
        <vue-pdf-embed :source="src" />
    </div>
</template>

<style>
    #pdfViewer {
        width: 90%;
        margin: auto;
    }
</style>

 
<script>


import VuePdfEmbed from 'vue-pdf-embed'

export default {
    name: 'BookReader',
    components: {
        VuePdfEmbed,
    },
    props: ['src'],
    data() {
        return {}
    }
}

</script>
 