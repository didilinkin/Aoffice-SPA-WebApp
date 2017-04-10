<template lang="pug">
#index
    // 加载动画
    #loading( v-if="loadingObj.loadingState" )
        img( v-bind:src="loadingObj.loadingImgUrl" )
    // 动画完成
    div( v-else )
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
            // console.log( this.$store.state.globalState.cityInfo.cityCode )
            this.$store.dispatch({
                type: 'discover/GET_DISCOVER_INFO',
                cityCode: this.$store.state.globalState.cityInfo.cityCode
            })
        } 
    },
    data() {
        return {
            loadingObj: {
                // 加载 状态
                loadingState: this.$store.state.globalState.loadingState.judgeShow,
                // 加载 图片
                loadingImgUrl: require( './assets/images/loading.png' )
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
