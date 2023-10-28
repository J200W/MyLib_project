<script setup>
import moment from 'moment';
import functions_nav from "@/router/functions_nav";

var admin = sessionStorage.getItem('admin');

if (admin == null) {
  admin = false;
}
else if (admin == "true") {
  admin = true;
}
else {
  admin = false;
}
</script>

<template>

  <div id="searchFriendList">
    <div class="searchFriend" v-for="friend in friends" :key="friend.id_Client">
      <router-link class="friendLongCard-search" :to="{ path: '/BookDetails', query: { id: book.id_ebook } }">
        <div class="bookImg">
          <img :src="book.name_img" alt="{{book.name_img}}" />
        </div>
        <div class="bookInfo">
          <div id="firstline">
            <p class="bookInfo-section"><span class="titleBook-search">{{ book.titre }}</span></p>
          </div>

          <p bookInfo-section><span>Author: </span>{{ book.auteur }}</p>
          <p bookInfo-section><span>Release date: </span>{{ moment(book.date_parution).format("YYYY-MM-DD") }}</p>
          <p bookInfo-section><span>Library: </span>{{ book.id_Biblio }}</p>
          <p bookInfo-section><span>Categories: </span>{{ book.category[0] }}, {{ book.category[1] }}, {{
              book.category[2] }}</p>
          <p bookInfo-section><span>Themes: </span>{{ book.theme[0] }}, {{ book.theme[1] }}, {{ book.theme[2] }}
          </p>
        </div>
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "SearchFriendContent"
}
</script>

<style scoped>

</style>