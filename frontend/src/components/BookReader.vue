<script setup>

// let source = ref("@/public/Yohan_Saba_TP4_database.pdf")

</script>

<template>


    <div>
 
     <!-- <vue-pdf-embed :source="source1"/> -->
     <embed :src="src" width="100%" height="1000"/>
     
     
    </div>
 
 </template>
 
 <script>

import VuePdfEmbed from 'vue-pdf-embed'

export default {
  components: {
    VuePdfEmbed,
  },
  props: ['src'],
  data() {
    return {
      source1: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
      source2: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
      source3: 'Yohan_Saba_TP4_database.pdf#toolbar=0',
    }
  },
}

</script>
 