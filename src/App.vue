<template lang="pug">
#index
    // 加载动画
    #loading( v-if="!this.$store.state.discover.requestState" )
        img( v-bind:src="loadingObj.loadingImgUrl" )
    // 动画完成
    div( v-else )
        h1 加载完成
        router-view( name="AppContent" )
        router-view( name="AppBottomNav" )
</template>

<script>
/* global require: true */
export default {
    name: 'app',
    methods: {
        // 目的: 获取首页数据
        getDiscoverInfo() {
            // 测试获取 city数据
            this.$store.dispatch({
                type: 'discover/GET_DISCOVER_INFO',
                cityCode: this.$store.state.globalState.cityInfo.cityCode
            })
        } 
    },
    data() {
        return {
            loadingObj: {
                loadingImgUrl: require( './assets/images/loading.png' ) // 加载 图片
            }
        }
    },
    mounted: function() {
        this.getDiscoverInfo()               // 获取首页数据
    }
}
</script>

<style lang="sass">
@import "./sass/main"

#loading >img
    +imgCover( 100% )
</style>
