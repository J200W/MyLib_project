<script setup>

import PopUpAddFav from "@/components/PopUpAddFav.vue";
import ModalBox from "./ModalBox.vue";

const admin = false

</script>


<template>
    
    <div id="allPage">
        
        <div id="left-section">
            <div id="left-left-section" >
                <img id="bookImg" :src="book.src" alt="{{ book.title }}">
                <router-link v-show="!admin" to="/BorrowBook" id="borrow-book">Borrow Book</router-link>
                
                <div v-show="admin" class="file-selector">
                    <label for="imageUpload" class="btn btn-primary">Click to load an image</label>
                    <input type="file" id="imageUpload" accept="image/*" style="display: none">
                </div>
                
                
        
                <!-- add the popup -->
                    

                <PopUpAddFav v-show="!admin" @click="add_to_fav()"/>
                    
            </div>
            <div id="bookInfo">
                <h2 id="information"><b>Information</b></h2>
                <!-- <button v-if="!admin" @click="add_to_fav()" id="button-add-fav">add fav</button> -->
                <p><b>Author:  </b> 
                    <span v-if="!admin" >{{book.author}}</span>
                    <input v-else @click="console.log(book.author)" v-model="book.author" placeholder="Author" />
                    
                </p>
                <hr>
                <p><b>Edition:  </b> 
                    <!-- <span>{{book.edition}}</span> -->
                    <span v-if="!admin" >{{book.edition}}</span>
                    <input v-else @click="console.log(book.edition)" v-model="book.edition" placeholder="Edition" />
                </p>
                <hr>
                <p><b>Release:  </b> 
                    <!-- <span>{{ book.date }}</span> -->
                    <span v-if="!admin" >{{book.date}}</span>
                    <input v-else @click="console.log(book.date)" v-model="book.date" placeholder="Edition" />
                </p>
                <hr>
                <p><b>Languages:  </b> 
                    <span v-if="!admin" >{{ book.langue }}</span>
                    <!-- <span v-if="!admin" >{{book.langue}}</span> -->

                    <select v-else v-model="book.langue">
                        <option v-for="num in test_array" :key="num" >French</option>
                    </select>
                    <!-- <input v-else @click="console.log(book.langue)" v-model="book.langue" placeholder="Edition" /> -->
                    
                </p>
                <hr>
                <p><b>Genre:  </b> 
                    <!-- <span>{{ book.genre }}</span> -->
                    <span v-if="!admin" >{{book.genre}}</span>
                    <!-- <input v-else @click="console.log(book.genre)" v-model="book.genre" placeholder="Edition" /> -->

                    <select v-else v-model="book.genre">
                        <option v-for="num in test_array" :key="num" >Manga</option>
                    </select>
                    
                </p>
                <hr>
                <p><b>Theme:  </b> 
                    <!-- <span>{{ book.theme }}</span> -->
                    <span v-if="!admin" >{{book.theme}}</span>
                    <!-- <input v-else @click="console.log(book.theme)" v-model="book.theme" placeholder="Edition" /> -->
                    <select v-else v-model="book.theme">
                        <option v-for="num in test_array" :key="num" >Action</option>
                        <!-- <option>Romance</option> -->
                    </select>
                </p>
                <hr>
                <p><b>Pages:  </b> 
                    <!-- <span>{{ book.page }}</span> -->
                    <span v-if="!admin" >{{book.page}}</span>
                    <input v-else @click="console.log(book.page)" v-model="book.page" placeholder="Page" />
                </p>
                <hr>
                <p><b>Stock:  </b> 
                    <!-- <span>{{ book.stock }}</span> -->
                    <span v-if="!admin" >{{book.stock}}</span>
                    <input v-else @click="console.log(book.stock)" v-model="book.stock" placeholder="Stock" />
                </p>
                <p><b>Source:  </b> 
                    <!-- <span>{{ book.source }}</span> -->
                    <span v-if="!admin" >{{book.source}}</span>
                    <input v-else @click="console.log(book.source)" v-model="book.source" placeholder="Source" />
                </p>
            </div>
            
            
        </div>


        <div id="right-section">
            <h2>Resume :</h2>
            <div id="book-resume">
                <div class="row">
                    <p v-if="!admin">{{ book.description }}</p>
                    <textarea class="resume" v-else v-model="book.description" placeholder="resume"></textarea>
                </div>
                
            </div>
            
            <!-- <button v-show="admin" @click="save_book_information()" id="button-save-info" class="save-button">Save Information</button> -->
            

            <ModalBox v-show="admin" @click="save_book_information()"></ModalBox>

        </div>

        
        

        

    </div>

    

    
</template>

<script>


let save = false

const test_array = [1,2,3,4]

    export default {
        name: 'BookDetailComp',
        props: ['book'],

        methods: {
                confirm_action() {
                    let test = confirm("Are you sure you want to erase the previous informations with the new ones ? ");
                    
                    if(test === true){
                        console.log("new informations saved")
                        // ajouter a la db
                    }
                    else{
                        console.log("save cancel")
                        // ne rien faire de plus
                    }
                },

                save_book_information(){
                    // this.confirm_action()
                    if(save === false){
                        console.log("new informations saved")
                        save = true

                    }
                    
                },
                add_to_fav(){
                    console.log("add to fav to bd")
                    
                    //
                }
            
        }
    }

</script>

<style scoped>

    .btn-primary{
        margin-left: 40px;
        margin-top: 25px;
        font-size: 15px;
        padding: 10px 10px;
        color: white;
        background-color: #A8A787;
        border-radius: 0%;
    }

    .btn-primary:hover{
        background-color: #D79262;
    }

    .file-selector{
        margin-bottom: 20px;
    }

    .resume{
        height: 200px;
    }

    #button-save-info{
        margin-top: 50px;
        margin-left: 240px;
        width: 200px;
        height: 110px;
        color: white;
        background-color: #A8A787;
        border-radius: 20px;
   
    }

    #button-save-info:hover{
        background-color: #D79262;
        color: white;
        transition: all 0.3s ease 0s;
    }

    hr {
        border: 0;
        height: 1px;
        background: black;
    }

    #allPage {
        display: flex;
        flex-direction: row;
        justify-content: flex-start; /* Aligner les éléments en haut */
        align-items: flex-start;
        height: max-content;
        width: 100%;
        margin-top: 0.6rem;
    }

    #left-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        justify-content: left;
        width: 35%;
    }

    #left-left-section {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
        justify-content: left;
        padding-left: 45px;
        padding-right: 80px;
    }

    #bookInfo {
        flex: 1;
        flex-direction: column;
        justify-content: flex-start; /* Aligner le contenu en haut */
        align-items: flex-start; /* Aligner le contenu à gauche */
        justify-content: top;
    }

    #right-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Aligner le contenu en haut */
        color: black;
        width: 50%;
        max-height: 50vh;
        padding-left: 20px;
        padding-right: 20px;
        margin-left:110px;
    }

    h2 {
        text-align: left;
        font-size: 1.5rem;
        
        
    }

    #information{
        margin-bottom: 20px;
    }

    #book-resume {
        flex: 1;
        justify-content: space-between;
        max-height: 50vh;
        background-color: white;
        margin-top: 10px;
        padding: 20px;
        border-radius: 20px;
        font-size: 2vmin;
        overflow: auto;
    }

    #bookImg {
        margin: auto;
        display: block;
        max-width: 300px;
    }

    #borrow-book {
        margin-top: 20px !important;
        margin-bottom: 20px !important;
        background-color: #A8A787;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 1rem;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
    }

    #borrow-book:hover {
        background-color: #D79262;
        color: white;
        transition: all 0.3s ease 0s;
    }

    @media (max-width: 1000px) {
        #allPage {
            flex-direction: column;
            justify-content: flex-start; /* Aligner les éléments en haut */
            align-items: flex-start;
            height: max-content;
            width: 100%;
            margin-top: 0.6rem;
        }

        #left-section {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            justify-content: left;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
        }

        #right-section {
            display: flex;
            flex-direction: column;
            justify-content: flex-start; /* Aligner le contenu en haut */
            color: black;
            width: 100%;
            max-height: 50vh;
            padding-left: 20px;
            padding-right: 20px;
            margin-top: 20px;
        }
        
    }

</style>