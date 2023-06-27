<template>

        <div class="body">

        <div class="toast">
            <div class="toast-content">
                <!-- <i class="fas fa-solid fa-check check"></i> -->

                    <div class="message">
                        <!-- <span class="text text-1"></span> -->
                        <span class="text text-2">Book have been added to your favorite!</span>
                    </div>
                    
            </div>
            <!-- <i class="fa-solid fa-xmark close"></i> -->
            
            <div class="progress"></div>
        </div>

        <button class="trigger-popUp">Add To Fav</button>

        </div>



</template>


<script>
  export default {
    mounted() {
        const button = document.querySelector(".trigger-popUp");
        let toast = document.querySelector(".toast");
        let closeIcons = document.querySelector(".close");
        let progress = document.querySelector(".progress");


        button.addEventListener("click", () =>{
            toast.classList.add("active");
            console.log(1456)
            progress.classList.add("active");

            setTimeout(() =>{
                toast.classList.remove("active");
            }, 2400);

            setTimeout(() =>{
                progress.classList.remove("active");
            }, 2700);

        });
        }
  }

</script>



<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.toast:not(.show) {
    display: block;
}

.body{
    /* height: 100vh;  */
    /* display: flex;  */
    /* align-items: center;  */
    /* justify-content: center ;  */
    /* background-color: #f2f2f2; */
    z-index: 2;
    overflow : hidden;
    position: static;
    margin-left: 50px;
}

.toast{
    /* display: none; */
    position: fixed;
    top: 25px;
    right: 35px;
    border-radius: 12px;
    background: #fff;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    border-left: 6px solid #cf974d;
    overflow:  hidden;
    transform: translateX(calc(100% + 60px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35)
}

.toast.active{
    /* display: block; */
    transform: translateX(0%);
}

.toast .toast-content{
    display: flex;
    align-items: center;

}

.toast-content .check{


    display: flex;
    align-items: center;
    justify-content: center;

    height: 35px;
    width: 35px;
    background-color:#cf974d ;
    color: white;
    font-size: 3vmin;
    border-radius: 50%;
}

.toast-content .message{
    display: flex;
    flex-direction: column;
    margin: 0 20px;

}


.message .text{
    font-size: 2.5vmin;
    font-weight: 600;
    color: #666666;
}


.message .text.text-1{
    font-weight: 600;
    color: #333
}


.toast .close{
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7

}


.toast .close:hover{
    opacity: 1;
}

.toast .progress{

    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #ddd
}

.toast .progress:before{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0px;
    height: 100%;
    width: 100%;
    background-color: #cf974d;
}

.progress.active:before{
    animation: progress 2.4s linear forwards;


}

@keyframes progress{
    100%{
        right: 100%;
    }    
}


button{
    
        margin-bottom: 20px !important;
        background-color: #d1b462;
        border: none;
        color: white;
        padding: 15px 30px;
        text-align: center;
        text-decoration: none;
        font-size: 2vmin;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
}


button:hover{
    background-color: #ac7433;
    color: white;
    transition: all 0.3s ease 0s;
}

.toast.active ~ button{
    pointer-events: none;
}

</style>