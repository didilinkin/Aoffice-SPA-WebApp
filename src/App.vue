<template lang="pug">
#index
    #loading
</template>

<script>
/* global require: true */

export default {
    name: 'app',
    methods: {
        // 目的: 测试 $store中modules的别名actions
        testModulesActions() {
            // console.log( this.$store.state.globalState )    // 测试模块状态是否加载: 成功
            this.$store.dispatch({
                type: 'globalState/TEST_ACTIONS'
            })
        }
    },
    data() {
        return {
            // 加载动画
            loadingAnimation: {
                imgUrl: require( './assets/images/loading.png' )
            }
        }
    },
    mounted: function() {
        this.testModulesActions()     // 测试 $store中modules的别名actions
    }
}
</script>

<style lang="sass">
@import "./sass/main"

.demo-float-button
    margin-right: 12px
</style>
