// '发现' - AppBar
<template lang="pug">
mu-appbar#DiscoverAppBar
    mu-icon-button( class="fa fa-list" slot="left" @click="toggle( true )" )
    div( class="DiscoverAppBar__search" @click="toSearch()" )
        mu-icon-button( class="fa fa-search" )
    mu-icon-button( class="fa fa-commenting" slot="right" )

    // 隐藏在左侧
    mu-drawer.left--box( v-bind:open="open" v-bind:docked="docked" @close="toggle()" )
        mu-list( @itemClick="docked ? '' : toggle()" )
            mu-list-item( 
                v-for="item in muDrawerLeft"
                v-bind:key="item.title"
                v-bind:title="item.title"
                @click="toAboutInfo( item.toAboutInfo )"
            )
</template>
 
<script>
import { appBarObj } from  './DataAppBar'   // 静态数据

export default {
    name: 'AppBar',
    methods: {
        toggle( flag ) {
            this.open = !this.open
            this.docked = !flag
        },
        toSearch() {
            location.href = '#/search/'
        },
        toAboutInfo( aboutInfoUrl ) {
            location.href = '#/aboutAplus/' + aboutInfoUrl
        }
    },
    data() {
        return {
            open: false,
            docked: true,
            muDrawerLeft: appBarObj
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

#DiscoverAppBar
    +FIXED
    +bC( rgba( $C-W, .1 ) )
    +opacity( 1 )
    .DiscoverAppBar__search
        +flexCenter
        >.mu-icon-button
            +REM-W-H( 40px )

// 通用AppBar 按钮样式
+auto--appbarBtn
</style>