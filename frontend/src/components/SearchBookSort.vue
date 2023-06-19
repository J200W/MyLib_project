<template>
    <h1 id="title-MyEbook">Results for "{{ result }}"</h1>

    <div class="sort-collection-search">
        <h3 class="label-selector-search">Sort</h3>
        <select class="sort-collection-select-search">
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="date">Date</option>
            <option value="time-remaining">Time Remaining</option>
        </select>

        <h3 class="label-selector-search">Genre</h3>
        <select class="sort-collection-select-search">
            <option value="Biography">Biography</option>
            <option value="Classic">Classic</option>
            <option value="Children's literature">Children's literature</option>
            <option value="Comic">Comic</option>
            <option value="Cookbook">Cookbook</option>
            <option value="Diary">Diary</option>
            <option value="Dictionary">Dictionary</option>
            <option value="Drama">Drama</option>
            <option value="Encyclopedia">Encyclopedia</option>
            <option value="Fairytale">Fairytale</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Guide">Guide</option>
            <option value="Health">Health</option>
            <option value="Crime fiction">Crime fiction</option>
            <option value="Horror">Horror</option>
            <option value="Humour">Humour</option>
            <option value="Literary fiction">Literary fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Poetry">Poetry</option>
            <option value="Romance">Romance</option>
            <option value="Satire">Satire</option>
            <option value="Science fiction">Science fiction</option>
            <option value="Short story">Short story</option>
            <option value="Thriller">Thriller</option>
            <option value="Young adult fiction">Young adult fiction</option>
        </select>
    </div>
</template>

<style>
    #title-MyEbook {
        font-size: 5vmin;
        text-align: left;
        color: "#000000";
        margin-left: 5%;
    }

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
        padding: 5px;
        border-radius: 20px;
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
}

</script>