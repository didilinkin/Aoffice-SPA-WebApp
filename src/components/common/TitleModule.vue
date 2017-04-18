// 公用组件 - 标题组件
<template lang="pug">
.titleModule
    .string
    h2(
        v-bind:style="{ backgroundColor: titleObj.backgroundColor }"
    ) {{ titleObj.title }}
</template> 

<script>
export default {
    name: 'TitleModule',
    props: {
        titleObj: {
            type: Object,
            default: function() {
                return {
                    title: '标题',
                    backgroundColor: '#FFF'
                }
            }
        }
    }
}
</script>

<style lang="sass" >
@import "../../sass/main"

.titleModule
    +REL
    +flexCenter
    width: 50%
    +REM( height, 50px )
    +mL( 25% )
    +mR( 25% )
    .string
        +dib
        +ABS
        left: 0
        top: 50%
        z-index: 1
        +W100
        +REM( height, 1px )
        border-top: 1px solid $C-title
        +REM( border-bottom-width, 1px )
    >h2
        +dib
        z-index: 2
        +REM( padding-left, $D-autoPadding )
        +REM( padding-right, $D-autoPadding )
        +REM-fontStyle( $F-title, $C-title, 1 )
        +fW( bold )
        white-space: nowrap
</style>