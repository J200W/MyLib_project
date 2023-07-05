<template>
  <div id="myEbooksList">
      <div class="myEbooks" v-for="book in books" :key="book.id_ebook">
              <router-link class="bookLongCard" :to="{ path: '/BookDetails', query: { id: book.id_ebook } }">
                <div class = "picture"><img id="imageBook" :src="book.name_img" alt="{{book.titre}}"/></div>
                <div class = "datas1">
                  <div class = "to_line"><p class="titre">Title :</p> <p>{{ book.titre }}</p></div>
                  <div class="to_line"><p class="titre">Author :</p><p>{{ book.auteur }}</p></div>
                  <div class="to_line"><p class="titre">Library :</p><p>{{ book.id_Biblio }}</p></div>
                  <div class="to_line"><p class="titre">Release date :</p><p>{{ new Date(book.date_parution).toDateString() }}</p></div>
                </div>
                <div class = "datas2" v-if="!fav">
                  <div v-if="book.on_loan" class="to_line"><p class="titre">Remaining loan time : </p><p>{{ book.days_left }} days</p></div>
                  <div v-if="book.on_loan" class="to_line"><p class="titre">On loan :</p><p class="y">Yes</p></div>
                  <div v-else class="to_line"><p class="titre">On loan :</p><p class="n">No</p></div>
                  <div v-if="book.sender" class="to_line"><p class="titre">Shared by :</p><p class="y">{{ book.sender }}</p></div>
                </div>
              </router-link>
      </div>
  </div>
</template>


<style scoped>
#imageBook {
    height: auto;
    width: auto;
    max-height: 260px;
}

.y{
  color: green;
}


.n{
  color: red;
}

.titre{
  font-weight: bold;
}
.to_line p{
  display: inline-block;
  text-align: left;
}
.datas1{
  flex : 1;
}
.datas2{
  flex : 0.5;
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
        text-align: left;
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
        max-width: 100px;
        flex: 1;
    }

    }
</style>

<script>
import { now } from 'moment';

export default {
    name: 'MyEbooksContent',
    props: ['books', 'fav'],
}

</script>