<template>
  <form class="sort-collection-search">
    <h3 class="label-selector-search">Sort</h3>
    <select class="sort-collection-select-search" v-model="sort_filter" name="sort_filter">
      <option value="titre">Title</option>
      <option value="auteur">Author</option>
      <option value="date_parution">Date</option>
    </select>

    <h3 class="label-selector-search">Category</h3>
    <select class="sort-collection-select-search" name="category" v-model="category">
      <option value="None">None</option>
      <option value="Adventure">Adventure</option>
      <option value="Romance">Romance</option>
      <option value="Mystery">Mystery</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Horror">Horror</option>
      <option value="Thriller">Thriller</option>
      <option value="Historical-Fiction">Historical Fiction</option>
      <option value="Self-Help">Self-Help</option>
      <option value="Science">Science</option>
      <option value="Dystopian">Dystopian</option>
      <option value="Humor">Humor</option>
      <option value="Crime">Crime</option>
      <option value="Young-Adult">Young Adult</option>
      <option value="Philosophy">Philosophy</option>
      <option value="Business">Business</option>
      <option value="Travel">Travel</option>
      <option value="Memoir">Memoir</option>
      <option value="Historical">Historical</option>
      <option value="Children">Children</option>
      <option value="Graphic-Novel">Graphic Novel</option>
    </select>

    <h3 class="label-selector-search">Theme</h3>
    <select class="sort-collection-select-search" name="theme" v-model="theme">
      <option value="None">None</option>
      <option value="Love">Love</option>
      <option value="Friendship">Friendship</option>
      <option value="Family">Family</option>
      <option value="War">War</option>
      <option value="Survival">Survival</option>
      <option value="Identity">Identity</option>
      <option value="Betrayal">Betrayal</option>
      <option value="Forgiveness">Forgiveness</option>
      <option value="Courage">Courage</option>
      <option value="Loss">Loss</option>
      <option value="Resilience">Resilience</option>
      <option value="Redemption">Redemption</option>
      <option value="Discovery">Discovery</option>
      <option value="Hope">Hope</option>
      <option value="Adventure">Adventure</option>
      <option value="Transformation">Transformation</option>
      <option value="Coming-of-Age">Coming of Age</option>
      <option value="Self-Discovery">Self-Discovery</option>
      <option value="Sacrifice">Sacrifice</option>
      <option value="Justice">Justice</option>
      <option value="Manga">Manga</option>
      <option value="Comics">Comics</option>
    </select>
    <input type="submit" value="Filter" @submit="updateFilter" class="sort-collection-submit">
  </form>
</template>

<style>
.sort-collection-search {
  margin-left: 5%;
  margin-bottom: 1%;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 300px;
  width: 50%;
}

.label-selector-search {
  margin-right: 1%;
  font-size: 2vmin;
  flex: 0.5;
  height: auto;
  margin-left: 4vmin;
}

.sort-collection-select-search {
  width: 200px;
  height: 5%;
  flex: 1;
  font-size: 2vmin;
  background-color: #FFF;
  border: 1px solid #000;
  padding: 5px;
  border-radius: 20px;
  margin-left: 2vmin;
}

.sort-collection-submit {
  width: 100px;
  height: 5%;
  flex: 1;
  font-size: 2vmin;
  background-color: #A8A787;
  border: 1px solid #000;
  padding: 5px;
  border-radius: 20px;
  margin-left: 2vmin;
}

.sort-collection-submit:hover {
  background-color: #D79262;
  border: 1px solid #000;
  transition: 0.3s ease all;
}

.sort-collection-search h3 {
  font-size: 2vmin;
  flex: 0.25;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  height: auto;
}
</style>

<script>
export default {
  name: 'SearchBookSort',
  props: ['result'],
  methods: {
    updateFilter(e) {
      e.preventDefault();
      console.log(this.category);
      console.log(this.theme);
      console.log(this.sort_filter);
    }
  },
  data() {
    return {
      category: new URLSearchParams(window.location.search).get('category') ? new URLSearchParams(window.location.search).get('category') : "None",
      theme: new URLSearchParams(window.location.search).get('theme') ? new URLSearchParams(window.location.search).get('theme') : "None",
      search: sessionStorage.getItem('search'),
      sort_filter: new URLSearchParams(window.location.search).get('sort_filter') ? new URLSearchParams(window.location.search).get('sort_filter') : "titre",
    }
  },
}

</script>