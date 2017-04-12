<template lang="pug">
#index
    #loading( v-if="!this.$store.state.discover.requestState" )
        img( v-bind:src="loadingObj.loadingImgUrl" )
    div( v-else )
        h1 加载完成
        i( class="fa fa-user-circle" )

        md-card
            md-card-actions( v-md-ink-ripple )

                .md-subhead
                    span 响应式/全屏/分页

                md-button.md-icon-button(
                    target="_blank"
                    href="https://github.com/surmon-china/vue-awesome-swiper/blob/master/examples/02-responsive.vue"
                )
                    md-icon code
            md-card-media
                // swiper
                swiper( v-bind:options="swiperOption" )
                    swiper-slide Slide 1
                    swiper-slide Slide 2
                    swiper-slide Slide 3
                    swiper-slide Slide 4
                    .swiper-pagination( slot="pagination" )


        router-view( name="AppContent" )
        router-view( name="AppBottomNav" )  
</template>

<script>
/* global require: true */
import { swiper, swiperSlide } from 'vue-awesome-swiper'

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
                pagination: '.swiper-pagination',
                paginationClickable: true
            }
        }
    },
    mounted: function() {
        this.getDiscoverInfo()
    },
    components: { swiper, swiperSlide }
}
</script>

<style lang="sass">
@import "./sass/main"

#loading >img
    +imgCover( 100% )
</style>
