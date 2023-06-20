

<template>
    <div id="allPage">
        <div id="left-section">
            <div id="left-left-section">
                <img id="bookImg" src="@/assets/onepiece96.png" alt="Book_example">
                <router-link to="/BorrowBook" id="borrow-book">Borrow Book</router-link>
                <p>Stock: <span>0</span></p>
                <p>Source: <span>Bibliothèque de crimée, Paris 19</span></p>
            </div>
            <div id="bookInfo">
                <h2>Info</h2>
                <p>Author : <span>Eichiro Oda</span></p>
                <hr>
                <p>Edition : <span>Glénat</span></p>
                <hr>
                <p>Release : <span>7 octobre 2020</span></p>
                <hr>
                <p>Languages : <span>French</span></p>
                <hr>
                <p>Genre : <span>Manga, Aventures, Pirates</span></p>
                <hr>
                <p>Pages : <span>192</span></p>
            </div>
        </div>

        <div id="right-section">
            <h2>Resume</h2>
            <div id="book-resume">
                <div class="row">
                    <p>Luffy va-t-il réussir à redonner le sourire aux habitants du pays des Wa et à 
                        libérer cette île qui a traversé de rudes épreuves au cours des vingt années de domination de 
                        Kaido et Orochi ?! Tout repose désormais sur la puissance de ses poings ! L’arc du pays des 
                        Wa est à son apogée ! Les aventures de Luffy à la poursuite du One Piece continuent !
                        Sed eleifend lectus id semper accumsan. Sed lobortis id ligula eget blandit. 
                        Integer interdum iaculis nunc, sed porttitor magna tincidunt in. Interdum et malesuada fames 
                        ac ante ipsum primis in faucibus. Aliquam lobortis accumsan tempor. Aliquam sollicitudin pulvinar 
                        est, quis convallis tellus.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

    hr {
        border: 0;
        height: 1px;
        background: black;
    }

    #allPage {
        display: flex;
        flex-direction: row;
        justify-content: flex-start; /* Aligner les éléments en haut */
        align-items: flex-start;
        height: max-content;
        width: 100%;
        margin-top: 0.6rem;
    }

    #left-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        justify-content: left;
        width: 50%;
    }

    #left-left-section {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
        justify-content: left;
        padding-left: 20px;
        padding-right: 20px;
    }

    #bookInfo {
        flex: 1;
        flex-direction: column;
        justify-content: flex-start; /* Aligner le contenu en haut */
        align-items: flex-start; /* Aligner le contenu à gauche */
        justify-content: top;
    }

    #right-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Aligner le contenu en haut */
        color: black;
        width: 50%;
        max-height: 50vh;
        padding-left: 20px;
        padding-right: 20px;
    }

    h2 {
        text-align: left;
        font-size: 1.5rem;
    }

    #book-resume {
        flex: 1;
        justify-content: space-between;
        max-height: 50vh;
        background-color: white;
        margin-top: 20px;
        padding: 20px;
        border-radius: 20px;
        font-size: 2vmin;
        overflow: auto;
    }

    #bookImg {
        margin: auto;
        display: block;
        max-width: 225px;
    }

    #borrow-book {
        margin-top: 20px !important;
        background-color: #D0AB77;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 1rem;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
    }

    #borrow-book:hover {
        background-color: #D79262;
        color: white;
        transition: all 0.3s ease 0s;
    }

    @media (max-width: 1000px) {
        #allPage {
            flex-direction: column;
            justify-content: flex-start; /* Aligner les éléments en haut */
            align-items: flex-start;
            height: max-content;
            width: 100%;
            margin-top: 0.6rem;
        }

        #left-section {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            justify-content: left;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
        }

        #right-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start; /* Aligner le contenu en haut */
            color: black;
            width: 100%;
            max-height: 50vh;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 20px;
        }
        
    }

</style>