<template>
  <div class="message">
    <p class = "dynamicP" :style="{ backgroundColor: sender === Us_email ? '#42b983' : 'white' }">{{content}}</p>
  </div>

</template>

<script>
export default {
  name: "Message",
  props:['content','sender','when',"Us_email"]
}
</script>

<style>
.dynamicP{
  display: block;
}
</style>