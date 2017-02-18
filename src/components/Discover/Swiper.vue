<template lang="pug">
    .swiper-container
        .swiper-wrapper
            .swiper-slide( v-for="item in swiper_arr" )
                img.bannerImg( :src="item.imgUrl" )
        .swiper-pagination
</template>

<script>
import Swiper from '../../assets/script/swiper.min.js'
export default {
    props: [ 'swiper_arr' ]
    // Banner
    ,mounted: function () {
        this.carousel()
    }
    ,methods: {
        carousel: function () {
            setTimeout(() => {
                const swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    loop: true,
                    centeredSlides: true,
                    autoplay: 2500,
                    autoplayDisableOnInteraction: false
                })
            }, 100)
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'
@import '../../sass/vendors/Swiper.min'

.swiper-container
    +w-h(100%,100%)
    +mL(auto)
    +mR(auto)
.swiper-slide
    text-align: center
    font-size: 18px
    background: #fff
    /* Center slide text vertically */
    display: -webkit-box
    display: -ms-flexbox
    display: -webkit-flex
    display: flex
    -webkit-box-pack: center
    -ms-flex-pack: center
    -webkit-justify-content: center
    justify-content: center
    -webkit-box-align: center
    -ms-flex-align: center
    -webkit-align-items: center
    align-items: center
    img.bannerImg
        width: 100%
</style>
