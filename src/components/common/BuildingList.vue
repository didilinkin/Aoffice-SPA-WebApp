// 公用组件 - 建筑展示列表( 附加 '建筑详情' )
<template lang="pug">
.buildingList
    .buildingList--itemBox.auto--modulePaddingBottom( v-for="item in buildingListArr" )
        .itemBox--intro(
            v-lazy:background-image='item.appListUrl'
            @click="toBuildingDetails( item.code, item.type )"
        )
            .badge {{ item.badge }}
            h2 {{ item.name }}
            p {{ item.subTitle }}
        BuildingDetails( 
            v-bind:buildingDetailsObj="item"
            v-show="hasDetails"
        )
</template>

<script>
import BuildingDetails  from './BuildingDetails'
const components = { BuildingDetails }

export default {
    name: 'BuildingList',
    props: {
        buildingListArr: {
            type: Array,
            default: function() {
                return [
                    {
                        officeBuilding: false,      // 是否是写字楼
                        amountA: 0,                 // 工位
                        amountB: 40,                // 办公空间
                        code: 'B000000016',
                        badge: '联合办公',
                        type: 'B',
                        appListUrl: 'http://images.aplusoffice.cn/images/app/building2/B000000016/list/app_list_url.jpg',
                        name: '欢乐颂创意办公空间',
                        subTitle: '欢乐颂创意办公空间',
                        priceMonthMin: 700,
                        priceMonthMinStr: '700',
                        priceDayMin: 3,
                        priceDayMinStr: '3'
                    }
                ]
            }
        },
        hasDetails: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        // 使用策略模式, 执行跳转
        toBuildingDetails: function( buildingDetailsUrl, buildingType ) {
            let skipUrl = {
                'A': function( url ) {
                    return location.href = '#/office-Building/' + url
                },
                'B': function( url ) {
                    return location.href = '#/co-working/' + url
                }
            }
            skipUrl[ buildingType ]( buildingDetailsUrl )
        }
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"

=introFontStyle( $bottom, $fontSize, $fontColor, $fontWeight )
    +ABS
    +REM( left, $D-autoMargin )
    bottom: $bottom
    +REM-fontStyle( $fontSize, $fontColor, 1.5 )
    +fW( $fontWeight )

.buildingList
    +bC( $C-base )
    .itemBox--intro
        +REL
        +W100
        +REM( height, $D-imgInfoHeight )
        background: 
            repeat: no-repeat
            position: cover
            size: cover
        .badge
            +flexCenter
            +ABS
            right: 0
            +REM( padding, $D-badgePadding )
            +REM( width, $D-badgeWidth )
            +REM-fontStyle( $F-badge, $C-W, 1 )
            +bC( $C-badge )
        >h2
            +introFontStyle( 17%, $F-title, $C-W, bold )
        >p
            +introFontStyle( 5%, $F-text, rgba( $C-W, .85 ), normal )
</style>