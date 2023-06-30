<script setup>


</script>

<template>

    <div v-for="user in users" :key="user.id">
        <div class="user" id="user-panel">
            <!-- <p>{{ user.name }}</p>
            <p>{{ user.email }}</p> -->
            <p class="align-center"><b>Pseudo :  </b> 
                    <span>{{ user.name }}</span>
                </p>
            <p class="align-center"><b>Email :  </b> 
                    <span>{{ user.email }}</span>
                </p>


            <button @click="confirm_delete()">Delete User</button>
            
        </div>
        
        
    </div>

</template>


<script>
        export default {
        name: 'ManageUsersComp',
        props: ['users'],
        methods: {
                remove_book(){
                    console.log("remove book")
                    const element = document.getElementById("user-panel");
                    console.log("element")
                    console.log(element)
                    element.remove()
                },
                confirm_delete() {
                    let test = confirm("Are you sure you want to erase the previous informations with the new ones ? ");
                    if(test === true){
                        console.log("user delete")
                        this.remove_book()
                        // ajouter a la db
                    }
                    else{
                        console.log("user deletet cancel")
                        // ne rien faire de plus
                    }
        }
    }
}


</script>


<style scoped>


div{
    background-color: white;
    margin-bottom: 15px;
}

p{
    margin-right: 20px;
    display: inline;
}

.align-center{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
    width: 100%;
}

.user{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
    width: 100%;
    padding: 10px;
}


button{
    width: fit-content;
}



</style>