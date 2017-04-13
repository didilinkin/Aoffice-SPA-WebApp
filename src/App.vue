<template lang="pug">
#index
    #loading( v-if="!this.$store.state.discover.requestState" )
        img( v-bind:src="loadingImg" )
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
        requestDiscoverInfo() {
            this.$store.dispatch({
                type: 'discover/REQUEST_DISCOVER_INFO',
                cityCode: this.$store.state.globalState.cityInfo.cityCode
            })
        }
    },
    data() {
        return {
            loadingImg: require( './assets/images/loading.png' )
        }
    },
    mounted: function() {
        this.requestDiscoverInfo()
    }
}
</script>

<style lang="sass">
@import "./sass/main"

#loading >img
    +imgCover( 100% )
</style>
