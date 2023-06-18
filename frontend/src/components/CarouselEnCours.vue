<template>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="@/assets/book_example.png" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="@/assets/book_example.png" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="@/assets/book_example.png" alt="Third slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="@/assets/book_example.png" alt="Fourth slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="@/assets/book_example.png" alt="Fifth slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="@/assets/book_example.png" alt="Sixth slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<style>
    .slide {
        max-width: 300px;
    }
    .carousel-inner{
        height: 100%;
        width: auto;

    }
    .carousel-inner img {
        width: auto;
        height: 100%;
    }
</style>

<script>
$('.carousel').carousel({
  interval: 200
})
export default {
    name: 'CarouselEncours',
}
</script>