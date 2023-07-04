<script setup>
import moment from 'moment';
import { port } from "../../../backend/controllers/Tools_controllers";
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

var borrowed = sessionStorage.getItem('borrowed');

if (borrowed == null) {
    borrowed = false;
}
else if (borrowed == "true") {
    borrowed = true;
}
else {
    borrowed = false;
}

</script>
<template>
    <div id="clear">
        <h1 class="title-comments">Average score : <span class="values"> {{ avg_score }} </span> /5</h1>
        <div class="user-comment" v-if="!admin">
            <div>
                <h5 class="title-comments">Based on : <span class="values">{{ nb_com }} </span> review(s)</h5>
                <div class="rating-box">
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
                <textarea id="commentTextBox" placeholder="Type your comment ..."></textarea>
            </div>
            <button @click="send_comment()" id="comment-button">Comment</button>
        </div>

        <h1 class="title-comments" v-if="!admin && comments">Reader Comments</h1>
        <div class="commentBox" v-for="comment in comments" :key="comments.mail_Clients">
            <div class="rightPanel">
                <div id="firstLineComment">
                    <span class="theComment"><b>{{ comment.pseudo_Clients }} </b></span>
                    <button v-if="comment.mail_Clients==this.email||can_modify" @click="deleteCom(comment.mail_Clients)" id="delete-button">Delete</button>
                </div>
                <h6 class="theComment">{{ moment(comment.date_comment).format("YYYY-MM-DD") }}</h6>
                <div class="rating-number theComment">
                    <span id="rating-number" class="values">
                        {{ comment.note }}
                    </span> / 5
                </div>
                <hr>
                <p class="theComment">{{ comment.commentaire }} </p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Comments',
    props: ['comments', 'avg_score', 'nb_com', 'can_modify'],
    data() {
        return {
            // Initialized to zero to begin
            current_index: 0,
            email: sessionStorage.getItem('user_email'),
        }
    },
    mounted() {
        if (this.avg_score == NaN) this.avg_score = 0;
        const stars = document.querySelectorAll(".stars i");
        // Loop through the "stars" NodeList
        stars.forEach((star, index1) => {
            // Add an event listener that runs a function when the "click" event is triggered
            star.addEventListener("click", () => {
                // Loop through the "stars" NodeList Again
                stars.forEach((star, index2) => {
                    // Add the "active" class to the clicked star and any stars with a lower index
                    // and remove the "active" class from any stars with a higher index
                    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");

                });
            });

        });
        stars.forEach((star, index3) => {
            star.addEventListener("click", () => {
                // console.log(star.className)
                this.current_index = index3 + 1
                console.log(this.current_index)
            });
        }
        )
    },
    methods: {
        send_comment() {
            if (sessionStorage.getItem('connected') == "false" || sessionStorage.getItem('connected') == null) {
                this.$router.push('/LogIn')
                return;
            }
            var link = window.location.href;
            // Get the id of the book from the url

            const id_ebook = parseInt(link.split("?id=").pop());
            fetch("http://localhost:" + port + "/add_comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: sessionStorage.getItem('user_email'),
                    id_ebook: id_ebook,
                    comment: document.getElementById("commentTextBox").value,
                    note: this.current_index,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status == "success") {
                        alert(data.message)
                        location.reload()
                    }
                    else {
                        alert("Error")
                    }
                })
        },
        deleteCom(email) {
            fetch("http://localhost:" + port + "/delete_comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status == "success") {
                        alert("Comment deleted")
                        location.reload()
                    }
                    else {
                        alert("Error")
                    }
                })
        }
    }

}
</script>

<style scoped>
#comment-button {
    padding: 1vmin;
    font-size: 2.2vmin;
    color: white;
    background-color: #D0AB77;
    border-radius: 20px;
    border: none;
    transition: all 0.3s ease 0s;
    width: fit-content;
    display: block;
}

#comment-button:hover {
    background-color: #D79262;
    transition: all 0.3s ease 0s;
}

#firstLineComment {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

button:hover {
    background-color: #f6e387;
}


.user-comment {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.values {
    color: #D79262;
    font-weight: bold;
    padding-left: 1vmin;
}

.commentBox {
    display: flex;
    flex-direction: column;
    padding: 2vmin;
    background-color: #fff;
    border-radius: 3vmin;
    margin: auto;
    margin-bottom: 4vmin;
}


.user-comment.active {
    background: #ffffff;
}

.theComment {
    font-size: 2.2vmin;
    color: #000;
    margin: 0;
    padding: 0;
}

#commentTextBox {
    border-radius: 0px;
    width: 100%;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    padding: 1vmin;
    border-radius: 2vmin;
}

#average-score {
    color: rgb(222, 151, 11);
}

#delete-button {
    padding: 1vmin;
    font-size: 2.2vmin;
    color: white;
    background-color: #d76462;
    border-radius: 20px;
    border: none;
    transition: all 0.3s ease 0s;
    width: fit-content;
    display: block;
}

#delete-button:hover {
    background-color: #d44340;
}

#clear {
    clear: both;
    width: 90%;
    margin: 0;
    margin: auto;
}

.title-comments {
    padding-bottom: 1%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    margin-top: 20px !important;
    color: black;
    margin: 0 auto;
    font-size: 3vmin;
    gap: 1vmin;
}

#rating-number {
    color: #f27100;
    font-weight: bold;
    margin: 0 auto;
    padding : 0;
}

.rating-box {
    border-radius: 25px;
    width: 450px;
    margin-bottom: 25px;
}

.rating-box .stars {
    display: flex;
    align-items: center;
    gap: 2vmin;
}

.stars i {
    color: #aeaeae;
    font-size: 3.5vmin;
    cursor: pointer;
    transition: color 0.2s ease;
}

.stars i.active {
    color: #ff9c1a;
}
</style>