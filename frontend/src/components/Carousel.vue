<template>
        <hr>
    <div id="carousel">
        <h1 id="title-section">{{ name }}</h1>
        <div id="carouselImages">
            <div id="carouselImagesContainer">
                <div id="carouselImagesContainerImages">
                    <div v-for="image in images" :key="image.id">
                        <router-link :to="{ path: '/BookDetails', query: { name: image.title } }">
                            <img :src="image.src" alt="image" />
                            <p>{{ image.title }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>

    #carousel {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 80%;
        height: 100%;
        margin-top: 20px;
    }

    #title-section {
        width: 100%;
        display: block;
        text-align: center;
        font-weight: bolder;
        margin-top: 20px;
    }

    #carouselImages {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    #carouselImagesContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    #carouselImagesContainerImages {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    #carouselImagesContainerImages img {
        width: 100%;
        height: 100%;
        margin-top: 20px;
        max-width: 200px;
    }

    #carouselImagesContainerImages img:hover {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:active {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:focus {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:visited {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:link {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:after {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:before {
        transform: scale(1.1);
        transition: transform 0.5s;
    }

    #carouselImagesContainerImages img:selection {
        transform: scale(1.1);
        transition: transform 0.
    }

    #carouselImagesContainerImages p {
        width: 100%;
        display: block;
        text-align: center;
        font-weight: bolder;
        margin-top: 20px;
        color: #a8a787;
        font-size: 2.2vmin;
    }

    @media screen and (max-width: 1000px) {
        #carouselImagesContainerImages img {
            max-width: 150px;
        }
        #carouselImagesContainerImages p {
            font-size: 2vmin;
        }
    }

    @media screen and (max-width: 900px) {
        #carouselImagesContainerImages img {
            max-width: 100px;
        }
    }

</style>

<script>
export default {
    name: 'Carousel',
    props: ['name', 'images'],
}
</script>