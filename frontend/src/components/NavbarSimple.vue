<template>
    <div id="navbar-simple">
        <router-link to="/MainPage">
            <img id="logo" src="../assets/logo.png" alt="Logo" srcset="">
        </router-link>
    </div>
    <div id="empty-simple"></div>
</template>

<style>

    #empty-simple {
        height: 25px;
    }

    #navbar-simple {
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        max-height: 140px;
        background-color: #D0AB77;
    }

    #logo {
        height: 2rem;
        margin: auto;
        display: block;
    }


    @media (max-width: 1100px) {
      #logo {
          height: 3rem;
      }

      
    }
</style>