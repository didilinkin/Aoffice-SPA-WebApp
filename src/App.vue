<template lang="pug">
#index
    #loading( v-if="!this.$store.state.discover.requestState" )
        img( v-bind:src="loadingObj.loadingImgUrl" )
    div( v-else )
        h1 加载完成
        i( class="fa fa-user-circle" )
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
            this.$store.dispatch({
                type: 'discover/GET_DISCOVER_INFO',
                cityCode: this.$store.state.globalState.cityInfo.cityCode
            })
        }
    },
    data() {
        return {
            loadingObj: {
                loadingImgUrl: require( './assets/images/loading.png' )
            }
        }
    },
    mounted: function() {
        this.getDiscoverInfo()
    }
}
</script>

<style lang="sass">
@import "./sass/main"

#loading >img
    +imgCover( 100% )
</style>
