<template lang="pug">
#index
    #loading( v-if="!this.$store.state.discover.requestState" )
        img( v-bind:src="loadingObj.loadingImgUrl" )
    div( v-else )
        h1 加载完成
        i( class="fa fa-user-circle" )

        swiper( v-bind:options="swiperOption" )
            swiper-slide Slide1
            swiper-slide Slide2
            swiper-slide Slide3
            swiper-slide Slide4
            .swiper-pagination( slot="pagination" )

        router-view( name="AppContent" )
        router-view( name="AppBottomNav" )  
</template>

<script>
/* global require: true */
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const components = { swiper, swiperSlide }

export default {
    name: 'app',
    methods: {
        // 目的: 获取首页数据
        getDiscoverInfo() {
            this.$store.dispatch({
                type: 'discover/REQUEST_DISCOVER_INFO',
                cityCode: this.$store.state.globalState.cityInfo.cityCode
            })
        }
    },
    data() {
        return {
            loadingObj: {
                loadingImgUrl: require( './assets/images/loading.png' )
            },
            swiperOption: {
                pagination: '.swiper-pagination',       // 页码元素绑定
                paginationClickable: true,              // 页码点击可实现
                centeredSlides: true,                   // 幻灯片居中
                autoplay: 3000,                         // 自动运行 时间间隔
                autoplayDisableOnInteraction: false,    // 自动运行 失去活动功能
                effect: 'fade'                          // 渐变效果
            }
        }
    },
    mounted: function() {
        this.getDiscoverInfo()
    },
    components: components
}
</script>

<style lang="sass">
@import "./sass/main"

#loading >img
    +imgCover( 100% )
</style>
