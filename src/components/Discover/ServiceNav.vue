// '发现' - 服务导航
<template lang="pug">
#Discover__serviceNav( class="ServiceNav auto--moduleMarginTop" )
    TitleModule( v-bind:titleObj="serviceNavTitle" )
    .ServiceNav__iconBtnBox.auto--modulePaddingTB
        .iconBtnBox__item(
            v-for="item in serviceNavIconBtn"
            v-bind:key="item.serviceUrl"
            @click="toService( item.serviceUrl )"
        )
            .item--imgBox
                img( v-bind:src="item.iconImg" )
            p.auto--moduleMarginTop {{ item.title }}

    .ServiceNav__toFormBtnBox
        .toFormBtn__item(
            v-for="item in serviceNavToFormBtn"
            v-bind:key="item.serviceUrl"
            @click="toService( item.serviceUrl )"
        )
            img( v-bind:src="item.iconImg" )
            h4 {{ item.title }}
            p {{ item.subTitle }}
</template>

<script> 
import { dataServiceNav }   from './DataServiceNav'

import TitleModule          from '../common/TitleModule'
const components = { TitleModule }

export default {
    name: 'ServiceNav',
    methods: {
        toService: function( serviceUrl ) {
            location.href = '#/service/' + serviceUrl
        }
    },
    data() {
        return {
            serviceNavTitle: dataServiceNav.title,
            serviceNavIconBtn: dataServiceNav.iconBtn,
            serviceNavToFormBtn: dataServiceNav.toFormBtn
        }
    },
    components: components
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

#Discover__serviceNav
    +textCenter
    +bC( $C-W )

.ServiceNav__iconBtnBox         // 图标 按钮容器
    +flexCenter
    .iconBtnBox__item
        flex: 1
        >.item--imgBox
            +mC
            +REM-W-H( 60px )
            +radius( 50% )
            +bC( $C-base )
            +pseudoClassColor( active, $bC, darken, $C-base, 10% )
            >img
                +imgCover( 100% )
        >p
            +REM-fontStyle( $F-title, 1 )
            +fW
            color: $C-title
            +pseudoClassColor( active, color, darken, $C-title, 10% )

.ServiceNav__toFormBtnBox       // 前往表单页 按钮容器
    +flexCenter
    .toFormBtn__item
        flex: 1
        +REM( margin, $D-autoMargin )
        +REM( padding, $D-autoPadding )
        +bC( $C-base )
        +pseudoClassColor( active, $bC, darken, $C-base, 10% )
        >img
            +imgCover( 40% )
        >h4
            +REM-fontStyle( $F-title, 2 )
            color: $C-EnterpriseService
        >p
            +REM-fontStyle( $F-text )
            color: $C-text
</style>