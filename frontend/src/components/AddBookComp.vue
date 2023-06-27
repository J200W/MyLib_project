<script>

</script>


<template>
    <form id="addbook-form" @submit="submitForm">
        <div id="addbook-content">
            <div id="right-addbook">
                <img id="preview-img" src="https://via.placeholder.com/200" alt="preview image">
                <label for="book-file">Book cover</label>
                <input required class="file" type="file" name="book-file" id="book-img" @change="previewImg"
                    accept="image/*">
                <label for="book-file">PDF file</label>
                <input required class="file" type="file" name="book-file" id="book-file" accept=".pdf">
            </div>

            <div id="left-addbook">
                <div class="form-line">
                    <div class="form-subline">
                        <label for="ebook-title" class="ebook-label">Title</label>
                        <input required type="text" name="ebook-title" class="ebook-input">
                    </div>
                    <div class="form-subline">
                        <label for="ebook-author" class="ebook-label">Author</label>
                        <input required type="text" name="ebook-author" class="ebook-input">
                    </div>
                </div>


                <div class="form-line">
                    <div class="form-subline">
                        <label for="ebook-date" class="ebook-label">Release date</label>
                        <input required type="date" name="ebook-date" class="ebook-input">
                    </div>
                    <div class="form-subline">
                        <label for="ebook-language" class="ebook-label">Language</label>
                        <input required type="text" name="ebook-language" class="ebook-input">
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-subline">
                        <label for="ebook-editor" class="ebook-label">Editor</label>
                        <input required type="text" name="ebook-editor" class="ebook-input">
                    </div>
                    <div class="form-subline">
                        <label for="ebook-page" class="ebook-label">Number of pages</label>
                        <input required type="number" name="ebook-page" class="ebook-input">
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-subline-selector">
                        <label for="ebook-category1" class="ebook-label">Category n°1</label>
                        <select name="ebook-category1" class="ebook-input">
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
                    </div>

                    <div class="form-subline-selector">
                        <label for="ebook-category2" class="ebook-label">Category n°2</label>
                        <select name="ebook-category2" class="ebook-input">
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
                    </div>

                    <div class="form-subline-selector">
                        <label for="ebook-category3" class="ebook-label">Category n°3</label>
                        <select name="ebook-category3" class="ebook-input">
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
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-subline-selector">
                        <label for="ebook-theme1" class="ebook-label">Theme n°1</label>
                        <select name="ebook-theme1" class="ebook-input">
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
                    </div>
                    <div class="form-subline-selector">
                        <label for="ebook-theme2" class="ebook-label">Theme n°2</label>
                        <select name="ebook-theme2" class="ebook-input">
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
                    </div>
                    <div class="form-subline-selector">
                        <label for="ebook-theme3" class="ebook-label">Theme n°3</label>
                        <select name="ebook-theme3" class="ebook-input">
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
                    </div>
                </div>

                <label for="ebook-biblio" class="ebook-label">Name of the library owner</label>
                <input required type="text" name="ebook-biblio" class="ebook-input">

                <label for="ebook-description" class="ebook-label">Description</label>
                <textarea name="ebook-description" class="ebook-input description" cols="30" rows="10"></textarea>

            </div>
        </div>
        <input required class="addbook-button" type="submit" value="Add Book">
    </form>
</template>

<style scoped>
/* GENERAL */

#addbook-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 100%;
    background-color: #F7EDE2;
    margin-top: 3vmin;
}

.addbook-button {
    font-size: 1.5vmin;
    margin: auto;
    display: block;
    margin-top: 3vmin;
    font-size: 2vmin;
    padding: 1.5vmin;
    background-color: #A8A787;
    border: none;
    border-radius: 3vmin;
    color: #FFF;
    transition: all 0.3s ease 0s;
}

.addbook-button:hover {
    background-color: #D79262;
    transition: all 0.3s ease 0s;
}


.file {
    padding: 3vmin;
    font-size: 2vmin;
}

/* RIGHT SECTION */

#right-addbook {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #F7EDE2;
    flex: 1;
    width: 50%;
}

.form-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.form-subline {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 45%;
}

.form-subline-selector {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 30%;
}

.ebook-label {
    font-size: 2vmin;
    margin-top: 1vmin;
}

.form-line>label {
    font-size: 2vmin;
}

.form-line>input {
    width: 45%;
    font-size: 2vmin;
}

.ebook-input {
    font-size: 2vmin;
    padding: 0.8vmin;
    border-radius: 20px;
    border: 1px solid black;
}

.description {
    font-size: 2vmin;
    padding: 0.8vmin;
    width: 100%;
    min-height: 300px;
    max-height: 300px;
    border-radius: 2vmin;
    overflow: auto;
}

/* LEFT SECTION */

#left-addbook {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 100%;
    width: 50%;
    flex: 1.75;

}

#preview-img {
    max-width: 300px;
    font-size: 2vmin;
}


@media screen and (max-width: 1000px) {
    #addbook-content {
        flex-direction: column;
        margin: auto;
    }

    #right-addbook {
        width: 100%;
    }

    #left-addbook {
        width: 100%;
    }

    #preview-img {
        max-width: 200px;

    }
}
</style>

<script>

import functions_nav from "@/router/functions_nav";

export default
    {
        name: 'AddBookComp',
        data() {
            return {
                researched_name: ''
            };
        },
        mounted() {
            this.fetchUserData();
        },
        methods: {
            fetchUserData() { },
            submitForm(event) {
                event.preventDefault();
                const form = document.querySelector('#addbook-form');
                const formData = new FormData(form);
                const bookFile = document.querySelector('#book-file').files[0];
                console.log(bookFile);
                const ebook_title =  formData.get('ebook-title');
                const ebook_author =  formData.get('ebook-author');
                const ebook_date =  formData.get('ebook-date');
                const ebook_language =  formData.get('ebook-language');
                const ebook_editor =  formData.get('ebook-editor');
                const ebook_page =  formData.get('ebook-page');
                const ebook_category1 =  formData.get('ebook-category1');
                const ebook_category2 =  formData.get('ebook-category2');
                const ebook_category3 =  formData.get('ebook-category3');

                const ebook_theme1 =  formData.get('ebook-theme1');
                const ebook_theme2 =  formData.get('ebook-theme2');
                const ebook_theme3 =  formData.get('ebook-theme3');

                const ebook_biblio =  formData.get('ebook-biblio');
                const ebook_description =  formData.get('ebook-description');
                const ebook_img =  formData.get('book-file').name;

                const ebook = {
                    title: ebook_title,
                    author: ebook_author,
                    date: ebook_date,
                    language: ebook_language,
                    editor: ebook_editor,
                    page: ebook_page,
                    category: [ebook_category1, ebook_category2, ebook_category3],
                    theme: [ebook_theme1, ebook_theme2, ebook_theme3],
                    biblio: ebook_biblio,
                    description: ebook_description,
                    img: ebook_img,
                    pdf: bookFile.name
                }

                console.log(ebook);

                fetch("http://localhost:80/add_book", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                        //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                },
                body: JSON.stringify(ebook).
                then(response => {
                    console.log(response);
                })

            })

                /*formData.append('book-file', bookFile);
                console.log(formData);
                axios.post('http://localhost:3000/api/books', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(response => {
                        console.log(response);
                        this.$router.push({ name: 'Home' });
                    })
                    .catch(error => {
                        console.log(error);
                    });*/
            },
            previewImg() {
                const preview = document.querySelector('#preview-img');
                const file = document.querySelector('#book-img').files[0];
                const reader = new FileReader();

                reader.addEventListener("load", function () {
                    // convert image file to base64 string
                    preview.src = reader.result;
                }, false);

                if (file) {
                    reader.readAsDataURL(file);
                }
                
            },
        }
    }
</script>