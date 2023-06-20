<template>
    <div id="navbar">
        <div id="navbar-left">
            <router-link to="/MainPage">
                <img id="logo" src="@/assets/logo.png" alt="logo">
            </router-link>
            <form id="search-bar" action="" method="post">
                <input placeholder="I am looking for..." type="text" name="search-bar" id="search-input">
                <input type="submit" value="Search" id="search-submit">
            </form>
        </div>
        <div id="navbar-right">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    MyLib
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="/MyEbooks">My Ebooks</a>
                    <a class="dropdown-item" href="/MyFavorites">My Favorites</a>
                    <a class="dropdown-item" href="/MyHistory">History</a>
                </div>
            </div>
            <router-link class="navbar-link" to="/MyAccount">My Account</router-link>
        </div>
    </div>
    <div id="empty"></div>
</template>

<style>

    .btn {
        background-color: #D0AB77;
        border: 2px solid black;
        border-radius: 40px;
        color: black;
        font-size: 2vmin;
        padding: 15px;
        margin: 0.5rem;
        text-decoration: none;
        align-items: left;
    }

    .btn:hover {
        background-color: #0C0A0B;
        border: black 2px solid;
        border-radius: 40px;
        transition: all 0.3s ease-in-out;
    }

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
        background-color: #D0AB77;
        width: 100%;
        z-index: 2;
        padding-left: 20px;
    }

    #logo {
        height: 5rem;
        margin: auto;
        display: block;
        flex: 1;
    }

    .navbar-link {
        font-size: 2vmin;
        padding: 1em;
        margin: 0.5rem;
        text-decoration: none;
        color: black;
        align-items: left;
        border: 2px solid black;
        border-radius: 40px;
    }

    .navbar-link:hover {
        background-color: #0C0A0B;
        border: black 2px solid;
        border-radius: 40px;
        transition: all 0.3s ease-in-out;
        color: white;
    }

    #search-bar {
        display: flex;
        flex-direction: row;
        max-height: 100px;
        background-color: #FFF;
        width: 100%;
        padding: 0.6rem;
        flex: 1;
        margin-top: auto;
        margin-bottom: auto;
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
        border: 2px solid #FFF;
        background-color: #FFF;
        width: 50%;
    }

    #search-submit {
        border: white 2px solid;
        background-color: white;
        width: fit-content;
        font-size: 2vmin;
        border-radius: 5px;
    }

    #search-submit:hover {
        background-color: #0C0A0B;
        border: #0C0A0B 2px solid;
        transition: all 0.2s ease-in-out;
        border-radius: 5px;
        color: white;
    }

    #navbar-left {
        display: flex;
        justify-content: left;
        align-items: center;
        justify-content: center;
        max-height: 100px;
        background-color: #D0AB77;
        width: 100%;
    }

    #navbar-right {
        display: flex;
        justify-content: right;
        align-items: right;
        max-height: 140px;
        background-color: #D0AB77;
        width: 100%;
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

        #search-bar {
            width: 100%;
        }
    }
</style>