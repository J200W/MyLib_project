faire un v for
<script>

</script>


<template>
 
    <h1 id="title-comments"> <b>Average Score :</b> <b id="average-score">4.8 / 5</b></h1>
    
    <div class="user-comment">
        <div>
            <h5 >Your comment</h5>
            <div class="rating-box">
                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>
            <textarea id="resume" placeholder=" Type your comment ..."></textarea>
        </div>
        <button @click="send_comment()" id="comment-button">comment</button>
    </div>
    
    

    <h1 id="title-comments">Reader Comments</h1>
    <div id="clear">
        <div class="commentBox">
                <div class="rightPanel">
                    <span><b>Username</b></span>
                    <h6>16/06/2023</h6>
                    <div class="rating-number">
                        <span id="rating-number">5</span> / 5
                    </div>
                    <hr>
                    <p class="theComment">Comment</p>
                    <button id="delete-button">delete</button>
                    
                </div>
                
        </div>
    </div>

</template>

<script>

export default {
    name: 'BookDetailComp',
    props: ['book'],
    data() {
        return {
        // Initialized to zero to begin
        current_index: 0,
        }
    },
            mounted() {
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
            send_comment(){
                console.log("send comment")
            }
        }
       
}


</script>

<style scoped>

    #comment-button{
        background-color: #D79262;
        width: 100px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        border-radius: 5px;
        
    }

    #comment-button:hover{
        background-color: #f6e387;
    }

    button:hover{
        background-color: #f6e387;
    }

    button:last-of-type{
        margin-left: auto;
        margin-right: 10%;
    }


    .user-comment{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 5%;
        gap: 1em;
    }

    .user-comment.active{
        background: #ffffff;
    }

    #resume{
        border-radius: 0px;
        width: 90%;
        height: 200px;
    }


    #average-score{
        color: rgb(222, 151, 11);
    }


    #delete-button{
        position: relative;  
        background-color: #A8A787;
    }

    #delete-button:hover{
        background-color: #D79262;
    }


    #title-comments {
        margin-left: 5%;
        margin-top: 2%;
        font-size: 2rem;
        font-family: 'Roboto', sans-serif;
        color: #000;
    }

    #clear {
        clear: both;
        margin-bottom: 30px;
    }

    .commentBox {
        background: #ffffff;
        padding: 1%;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start; 
        border-radius: 15px;
        margin-top: 20px !important;
        color: black;
        font-size: 2vmin;
        margin: 0 auto;
    }



    #rating-number {
        color: #f27100;
        font-size: larger;
        font-weight: bold;
        margin: 0 auto;
    }


    .rating-box {
    border-radius: 25px;
    width: 450px;
    margin-bottom: 25px;
    }

    .rating-box .stars {
    display: flex;
    align-items: center;
    gap: 25px;
    }
    .stars i {
    color: #aeaeae;
    font-size: 35px;
    cursor: pointer;
    transition: color 0.2s ease;
    }
    .stars i.active {
    color: #ff9c1a;
    }


</style>