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
import { mapGetters } from  'vuex'

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
            }
        }
    },
    computed: mapGetters({
        getterDiscoverInfo: 'getterDiscoverInfo'
    }),
    watch: {
        // 监听: 测试modules getters是否收到消息
        getterDiscoverInfo: function() {
            console.log( 'getters获取到信息!' )
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
