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
            <option value="adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="mystery">Mystery</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
            <option value="historical-fiction">Historical Fiction</option>
            <option value="self-help">Self-Help</option>
            <option value="science">Science</option>
            <option value="dystopian">Dystopian</option>
            <option value="humor">Humor</option>
            <option value="crime">Crime</option>
            <option value="young-adult">Young Adult</option>
            <option value="philosophy">Philosophy</option>
            <option value="business">Business</option>
            <option value="travel">Travel</option>
            <option value="memoir">Memoir</option>
            <option value="historical">Historical</option>
            <option value="children">Children</option>
            <option value="graphic-novel">Graphic Novel</option>
        </select>

        <h3 class="label-selector-search">Theme</h3>
        <select class="sort-collection-select-search" name="theme" v-model="theme">
            <option value="None">None</option>
            <option value="love">Love</option>
            <option value="friendship">Friendship</option>
            <option value="family">Family</option>
            <option value="war">War</option>
            <option value="survival">Survival</option>
            <option value="identity">Identity</option>
            <option value="betrayal">Betrayal</option>
            <option value="forgiveness">Forgiveness</option>
            <option value="courage">Courage</option>
            <option value="loss">Loss</option>
            <option value="resilience">Resilience</option>
            <option value="redemption">Redemption</option>
            <option value="discovery">Discovery</option>
            <option value="hope">Hope</option>
            <option value="adventure">Adventure</option>
            <option value="transformation">Transformation</option>
            <option value="coming-of-age">Coming of Age</option>
            <option value="self-discovery">Self-Discovery</option>
            <option value="sacrifice">Sacrifice</option>
            <option value="justice">Justice</option>
            <option value="manga">Manga</option>
            <option value="comics">Comics</option>
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