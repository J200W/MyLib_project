<script setup>
    import NavbarConnected from "@/components/NavbarConnected.vue";
    import NavbarNonConnected from "@/components/NavbarNonConnected.vue";
    import TheFooter from "@/components/TheFooter.vue";

    import ManageUsersComp from "@/components/ManageUsersComp.vue";
    import PopUpAddFav from "@/components/PopUpAddFav.vue";

    const connected = true

    const users = [
        {
            id: "0",
            name: "yohan",
            email: "yoyo@gmail.com",
            tel: "06 54 24 "
        },
        {
            id: "1",
            name: "james",
            email: "james@gmail.com",
            tel: "06 54 24 "
        },
        {   
            id: "2",
            name: "yohan",
            email: "yoyo@gmail.com",
            tel: "06 54 24 "
        }
    ]

</script>

<template>

    <body>

        <!-- <NavbarConnected v-if="connected" /> -->
        <!-- <NavbarNonConnected v-if="!connected" /> -->

        <ManageUsersComp :users="users"/>
        <PopUpAddFav/>

        <!-- <TheFooter/> -->

    </body>
    


</template>


<style>


</style>