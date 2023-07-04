<template>

    <div class="sort-collection">
        <h3 class="label-selector">Sort</h3>
        <select class="sort-collection-select">
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="date">Date</option>
            <option value="time">Time Remaining</option>
        </select>
    </div>

    <div class="sort-collection">

        <h3 class="label-selector">Genre</h3>
        <select class="sort-collection-select">
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

    <div class="input-container">
        <h3 class="label-selector-shared">Shared</h3>
        <label for="search-checkbox" class="search-label">
            <input type="checkbox" id="search-checkbox" class="search-checkbox">
            <span class="checkmark"></span>
        </label>
    </div>
</template>

<style>
    #title-MyEbook {
        font-size: 5vmin;
        text-align: left;
        color: "#000000";
        margin-left: 5%;
    }

    .sort-collection {
        margin-left: 5%;
        margin-bottom: 1%;
        display: flex;
        flex-direction: row;
        align-items: center;
        max-width: 300px;
        width: 50%;
    }

    .label-selector {
        margin-right: 1%;
        font-size: 2vmin;
        flex: 0.5;
        height: auto;
    }

    .sort-collection-select {
        width: 20%;
        height: 5%;
        flex: 1;
        font-size: 2vmin;
        background-color: #FFF;
        padding: 5px;
        border-radius: 20px;
    }

    .sort-collection h3 {
        font-size: 2vmin;
        flex: 0.25;
        margin-bottom: 0;
        align-items: center;
        justify-content: center;
        height: auto;
    }


    .input-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 5%;
        margin-bottom: 1%;
        max-width: 300px;
        width: 50%;
    }

    .search-label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .search-checkbox {
        display: none;
    }

    .checkmark {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: #FFF;
        border-radius: 3px;
        margin-left: 5px;
        position: relative;
        border: #000 solid 2px;
    }

    .label-selector-shared {
        margin-right: 1%;
        font-size: 2vmin;
        flex: 0.25;
        height: auto;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid #000;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .search-checkbox:checked+.checkmark:after {
        display: block;
    }
</style>

<script>
export default {
    props: ['pseudo', 'fav'],
}

</script>