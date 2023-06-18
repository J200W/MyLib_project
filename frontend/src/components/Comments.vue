<template>
    <h1 id="title-comments">Comments</h1>
    <div id="clear">
        
        <div class="commentBox">
            <div class="leftPanelImg">
                <div class="rightPanel">
                    <span>Username</span>
                    <div class="date">16/06/2023</div>
                    <div class="rating-number">
                        <span id="rating-number">5</span> /5
                    </div>
                    <hr>
                    <p class="theComment">COMMENTAIRE
                    </p>
                </div>
            </div>
        </div>

    </div>

</template>

<style>
    #title-comments {
        margin-left: 5%;
        margin-top: 2%;
        font-size: 2rem;
        font-family: 'Roboto', sans-serif;
        color: #000;
    }

    #clear {
        clear: both;
        margin-bottom: 30px;
    }

    .commentBox {
        background: #ffffff;
        padding: 1%;
        width: 90%;
        display: flex;
        border-radius: 15px;
        margin-top: 20px !important;
        color: black;
        font-size: 2vmin;
        margin: 0 auto;
    }

    .leftPanelImg {
        float: left;
        flex: 1;
    }

    .leftPanelImg img {
        min-height: 150px;
        max-height: 150px;
        min-width: 150px;
        max-width: 150px;
        border-radius: 100%;
        height: auto;
        width: auto;
        object-fit: cover;
        background: none;
    }

    #rating-number {
        color: #f27100;
        font-size: larger;
        font-weight: bold;
        margin: 0 auto;
    }
</style>