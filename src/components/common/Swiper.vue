// 公用组件 - 轮播
<template lang="pug">
swiper.swiperClass( v-bind:options="swiperOption" )
    swiper-slide( v-for="item in swiperArr" v-bind:key="item.imgUrl" )
        img.discoverBannerImg( v-bind:src="item.imgUrl" )
    .swiper-pagination( slot="pagination" )
</template>

<script>
/* global require: true */
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const components = { swiper, swiperSlide }

export default {
    name: 'Swiper',
    props: {
        swiperArr: {
            type: Array,
            default: () => {
                return [
                    {
                        imgUrl: require( '../../assets/images/discoverBannerError.jpg' )
                    }
                ]
            }
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',       // 页码元素绑定
                paginationClickable: true,              // 页码点击可实现
                centeredSlides: true,                   // 幻灯片居中
                autoplay: 2000,                         // 自动运行 时间间隔
                autoplayDisableOnInteraction: false,    // 自动运行 失去活动功能
                effect: 'fade'                          // 渐变效果
            }
        }
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"

.swiperClass
    .discoverBannerImg  // 轮播图 - 图片样式
        +imgCover( 100% )
    .swiper-pagination >.swiper-pagination-bullet-active    // 圆点样式 - 主题色
        +bC( $C-theme )
</style>