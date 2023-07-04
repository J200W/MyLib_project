<script setup >
import functions_nav from "@/router/functions_nav";
import { port } from "../../../backend/controllers/Tools_controllers";
</script>


<template>
    <form id="addbook-form" @submit="submitForm">
        <div id="addbook-content">
            <div id="right-addbook">
                <img id="preview-img" src="https://via.placeholder.com/200" alt="preview image">
                <label for="book-file">Book cover</label>
                <input required class="file" type="file" name="book-file-img" id="book-file-img" @change="previewImg"
                    accept="image/*">
                <label for="book-file">PDF file</label>
                <input required class="file" type="file" name="book-file-pdf" id="book-file-pdf" accept=".pdf">
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
                        <label for="ebook-editor" class="ebook-label">Editor</label>
                        <input required type="text" name="ebook-editor" class="ebook-input">
                    </div>
                    <div class="form-subline">
                        <label for="ebook-page" class="ebook-label">Number of pages</label>
                        <input required min="0" type="number" name="ebook-page" class="ebook-input">
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-subline-3">
                        <label for="ebook-date" class="ebook-label">Release date</label>
                        <input required type="date" name="ebook-date" class="ebook-input">
                    </div>
                    <div class="form-subline-3">
                        <label for="ebook-language" class="ebook-label">Language</label>
                        <input required type="text" name="ebook-language" class="ebook-input">
                    </div>
                    <div class="form-subline-3">
                        <label for="ebook-stock" class="ebook-label">Stock</label>
                        <input min="0" required type="number" name="ebook-stock" class="ebook-input">
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-subline-3">
                        <label for="ebook-category1" class="ebook-label">Category n°1</label>
                        <select name="ebook-category1" class="ebook-input">
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
                    </div>

                    <div class="form-subline-3">
                        <label for="ebook-category2" class="ebook-label">Category n°2</label>
                        <select name="ebook-category2" class="ebook-input">
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
                    </div>

                    <div class="form-subline-3">
                        <label for="ebook-category3" class="ebook-label">Category n°3</label>
                        <select name="ebook-category3" class="ebook-input">
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
                    </div>
                </div>

                <div class="form-line">
                    <div class="form-subline-3">
                        <label for="ebook-theme1" class="ebook-label">Theme n°1</label>
                        <select name="ebook-theme1" class="ebook-input">
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
                    </div>
                    <div class="form-subline-3">
                        <label for="ebook-theme2" class="ebook-label">Theme n°2</label>
                        <select name="ebook-theme2" class="ebook-input">
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
                    </div>
                    <div class="form-subline-3">
                        <label for="ebook-theme3" class="ebook-label">Theme n°3</label>
                        <select name="ebook-theme3" class="ebook-input">
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
                    </div>
                </div>

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

.form-subline-3 {
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
                const bookFile = document.querySelector('#book-file-pdf').files[0];
                const coverFile = document.querySelector('#book-file-img').files[0];

                const formData = new FormData(form);
                const ebook_title = formData.get('ebook-title');
                const ebook_author = formData.get('ebook-author');
                var ebook_date = formData.get('ebook-date');

                const ebook_stock = formData.get('ebook-stock');
                const ebook_language = formData.get('ebook-language');
                const ebook_editor = formData.get('ebook-editor');
                const ebook_page = formData.get('ebook-page');
                const ebook_category1 = formData.get('ebook-category1');
                const ebook_category2 = formData.get('ebook-category2');
                const ebook_category3 = formData.get('ebook-category3');

                const ebook_theme1 = formData.get('ebook-theme1');
                const ebook_theme2 = formData.get('ebook-theme2');
                const ebook_theme3 = formData.get('ebook-theme3');

                const ebook_biblio = formData.get('ebook-biblio');
                const ebook_description = formData.get('ebook-description');
                var ebook_img = formData.get('book-file-img').name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                var ebook_pdf = bookFile.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');


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
                    pdf: ebook_pdf,
                    admin: sessionStorage.getItem('user_email'),
                    stock: ebook_stock
                }
                try {
                    // Convert book file to base64
                    const readerPDF = new FileReader();
                    readerPDF.readAsArrayBuffer(bookFile);
                    readerPDF.onloadend = function () {
                        var arrayBuffer = readerPDF.result;
                        var bytes = new Uint8Array(arrayBuffer);
                        var data_pdf = {
                            pdf: bytes,
                            name: ebook_pdf,
                        }
                        fetch("http://localhost:" + port + "/upload_book_pdf", {
                            method: "POST",
                            body: JSON.stringify(data_pdf),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status != "success") {
                                    throw new Error(data.message);
                                }
                            })
                    }
                    // Convert image file to base64
                    var readerIMG = new FileReader();
                    readerIMG.readAsArrayBuffer(coverFile);
                    readerIMG.onloadend = function () {
                        var arrayBuffer = readerIMG.result;
                        var bytes = new Uint8Array(arrayBuffer);
                        var data_img = {
                            img: bytes,
                            name: ebook_img
                        }
                        fetch("http://localhost:" + port + "/upload_book_img", {
                            method: "POST",
                            body: JSON.stringify(data_img),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status != "success") {
                                    throw new Error(data.message);
                                }
                            })
                    }

                    fetch("http://localhost:" + port + "/add_book", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
                            //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
                        },
                        body: JSON.stringify(ebook)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status == "success") {
                                alert(data.message);
                                location.reload();
                            } else {
                                alert(data.message);
                            }
                        })
                } catch (error) {
                    alert(error.message);
                }
            },
            previewImg() {
                const preview = document.querySelector('#preview-img');
                const file = document.querySelector('#book-file-img').files[0];
                const readerPREV = new FileReader();

                readerPREV.addEventListener("load", function () {
                    // convert image file to base64 string
                    preview.src = readerPREV.result;
                }, false);

                if (file) {
                    readerPREV.readAsDataURL(file);
                }

            },
        }
    }
</script>