<template>


    <div>
 
     <!-- <vue-pdf-embed :source="source1"/> -->
     <embed :src="src" width="100%" height="1000"/>
     
     
    </div>
 
 </template>
 
 <script>

export default {
    name: 'BookReader',
    props: ['src']
}
</script>
 