<!--

    npm install @splidejs/vue-splide

-->
<template>
    <h1 id="titleCarousel">{{ name }}</h1>
    <div id="carousel">
        <Splide :options="{ rewind: true }" aria-label="Vue Splide Example">
            <SplideSlide>
                <router-link to="/BookDetails?book=book_example">
                    <img class="slide" src="@/assets/book_example.png" alt="Sample 1">
                </router-link>
            </SplideSlide>
            <SplideSlide>
                <router-link to="/BookDetails">
                    <img class="slide" src="@/assets/book_example2.png" alt="Sample 2">
                </router-link>
            </SplideSlide>
            <SplideSlide>
                <router-link to="/BookDetails">
                    <img class="slide" src="@/assets/book_example3.png" alt="Sample 2">
                </router-link>
            </SplideSlide>
        </Splide>
    </div>
</template>

<style>
    #titleCarousel {
        text-align: center;
    }

    #carousel {
        max-width: 300px;
    }
    .slide {
        max-width: 300px;
    }
</style>

  
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';
import '@splidejs/vue-splide/css';

export default defineComponent({
    components: { Splide, SplideSlide },
    props: ['name']
});
</script>