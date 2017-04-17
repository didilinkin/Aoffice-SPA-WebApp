// 公用组件 - 底部导航
<template lang="pug">
mu-paper#BottomNav
    mu-bottom-nav.bottomNav--box(
        v-bind:value="bottomNav"
        v-bind:style="{ color: '#FFF' }"
        @change="handleChange"
    )
        mu-bottom-nav-item.router-link-active.bottomNav--box--item(
            v-for="item in bottomNavItemLink"
            v-bind:key="item.value"
            v-bind:value="item.value"
            v-bind:title="item.title"
            v-bind:href="'#' + item.href"
        )
            i.fa( v-bind:class="item.iconClass" )
</template> 

<script> 
import { dataBottomNav } from './DataBottomNav.js' 

export default {
    name: 'BottomNav',
    methods: {
        handleChange( val ) {
            this.bottomNav = val
        }
    },
    data() {
        return {
            bottomNav: 'movies',
            bottomNavColor: 'movies',
            bottomNavItemLink: dataBottomNav
        }
    }
}   
</script>

<style lang="sass">
@import "../../sass/main"

#BottomNav
    +FIXED
    bottom: 0
    z-index: 9999
    +W100

.bottomNav--box
    +REM( height, 60px )
    .bottomNav--box--item
        +flexCenter
        +textCenter
        +tD
        .mu-buttom-item-wrapper
            height: initial
        .mu-bottom-item-text    
            +REM( margin-top, $D-autoMargin/4 )
</style>