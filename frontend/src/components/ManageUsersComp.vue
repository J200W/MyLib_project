<script setup>


</script>

<template>

    <div v-for="user in users" :key="user.id">
        <p>{{ user.name }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.tel }}</p>
        
    </div>

</template>


<script>
        export default {
        name: 'ManageUsersComp',
        props: ['users'],
    }


</script>


<style>


</style>