<template>
    <div id="myEbooksList">
        <div class="myEbooks" v-for="book in books" :key="book.id">
                <router-link class="bookLongCard" :to="{ path: '/BookDetails', query: { name: book.titre } }">
                  <div class = "picture"><img :src="book.src" alt="{{book.titre}}"/></div>


                  <div class = "datas">
                    <div class = "to_line"><p class="titre">Title :</p> <p>{{ book.titre }}</p></div>
                    <div class="to_line"><p class="titre">Author :</p><p>{{ book.auteur }}</p></div>
                    <div class="to_line"><p class="titre">Library :</p><p>{{ book.id_Biblio }}</p></div>
                    <div class="to_line"><p class="titre">Release date :</p><p>{{ new Date(book.date_parution).toDateString() }}</p></div>
                  </div>
                  <div class = "datas">
                    <div class="to_line"><p class="titre">Remaining loan time : </p><p>{{ ((new Date(book.fin_emprunt).getTime()) - (new Date(book.debut_emprunt).getTime()))/ (1000 * 3600 * 24) }} days</p></div>
                    <div class="to_line"><p class="titre">On loan</p><p>Yes</p></div>
                  </div>

                </router-link>
        </div>
    </div>
</template>

<style>
.titre{
  font-weight: bold;
}
.to_line p{
  display: inline-block;
}
.datas{
  flex : 1;
}
.picture{
  flex : 0.5;
}

    #myEbooksList {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 93%;
        margin: auto;
    }

    .myEbooks {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
    }

    .bookLongCard {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        margin: 10px;
        background-color: white;
        text-decoration: none;
        color: black;
        padding: 20px;
    }

    .bookLongCard:hover {
        background-color: #f1f1f1;
        color: black;
    }

    .bookLongCard img {
        width: auto;
        height: 100%;
        max-width: 150px;
        flex: 1;
    }

    .bookLongCard p {
        text-align: center;
        flex: 1;
        justify-content: center;
        align-items: center;
        margin: auto;
        font-size: 2vmin;
        padding: 2vmin;
    }

    
    @media screen and (max-width: 900px) {

    .bookLongCard img {
        width: auto;
        height: 100%;
        max-width: 200px;
        flex: 1;
    }

    }
</style>

<script>
export default {
    name: 'MyEbooksContent',
    props: ['books'],
}

</script>