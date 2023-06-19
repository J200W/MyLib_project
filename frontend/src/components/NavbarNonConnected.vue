<template>
    <div id="navbar">
        <div id="navbar-left">
            <router-link to="/">
                <img id="logo" src="@/assets/logo.png" alt="logo">
            </router-link>
            <form id="search-bar" action="" method="post">
                <input placeholder="I am looking for..." type="text" name="search-input" id="search-input">
                <input type="submit" value="Search" id="search-submit">
            </form>
        </div>
        <div id="navbar-right">
            <router-link class="navbar-link" to="/LogIn">Log In</router-link>
            <router-link class="navbar-link" to="/SignUp">Sign up</router-link>
        </div>
    </div>
    <div id="empty"></div>
</template>

<style>

    #empty {
        height: 100px;
    }

    #navbar {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: left;
        max-height: 100px;
        height: auto;
        background-color: #5C5C50;
        width: 100%;
        z-index: 2;

    }

    #logo {
        height: 5rem;
        margin: auto;
        display: block;
    }

    .navbar-link {
        font-size: 2vmin;
        padding: 15px;
        margin: 0.5rem;
        text-decoration: none;
        color: white;
        align-items: left;
        border: 2px solid white;
        border-radius: 40px;
    }

    .navbar-link:hover {
        background-color: #0C0A0B;
        border: white 2px solid;
        border-radius: 40px;
        transition: all 0.3s ease-in-out;
    }

    #search-bar {
        display: flex;
        flex-direction: row;
        max-height: 100px;
        background-color: #5C5C50;
        width: fit-content;
        margin: auto;
        padding: 0.6rem;
    }

    #search-input {
        font-size: 2vmin;
        padding: 0.6rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        margin-top: 0;
        margin-bottom: 0;
        text-decoration: none;
        color: black;
        align-items: left;
        border: 2px solid #AAA;
        background-color: #AAA;
        width: 100%;
    }

    #search-submit {
        border: white 2px solid;
        background-color: white;
    }

    #navbar-left {
        display: flex;
        flex: 1;
        justify-content: left;
        align-items: center;

        max-height: 100px;
        background-color: #5C5C50;
        width: 100%;
    }

    #navbar-right {
        display: flex;
        flex: 1;
        justify-content: right;
        align-items: center;
        max-height: 140px;
        background-color: #5C5C50;
        margin-right: 20px;
    }

    #section {
        display: flex;
        justify-content: right;
        align-items: center;
        width: 50%;
        margin-right: 20px;
    }


    @media (max-width: 1100px) {
      #logo {
          height: 3rem;
      }
    }
</style>