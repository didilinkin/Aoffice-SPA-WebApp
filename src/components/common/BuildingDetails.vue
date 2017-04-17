// 公用组件 - 建筑详情( 价格 + 详细数量 ) - 也可单独使用该组件
<template lang="pug">
.buildingDetails
    // 价格
    .buildingDetails__price
        mu-raised-button( class="demo-raised-button price active" ) {{ buildingDetailsObj.priceMonthMinStr }} 元/月起
        mu-raised-button( class="demo-raised-button price" ) {{ buildingDetailsObj.priceDayMinStr }} 元/m²/天起
    // 数值
    .buildingDetails__numberValue( v-if="buildingDetailsObj.officeBuilding" )  
        p.number
            b {{ buildingDetailsObj.amount1 }}
            | 套待租
        p.number
            b {{ buildingDetailsObj.amount2 }}
            | 套可售
        p.number
            b {{ buildingDetailsObj.amount3 }}
            | 套待售
    
    .buildingDetails__numberValue( v-else )                                   
        p.number
            b {{ buildingDetailsObj.amountB }}
            | 套办公空间
        p.number
            b {{ buildingDetailsObj.amountA }}
            | 个工位
</template>

<script>
export default {
    name: 'BuildingDetails',
    props: {
        buildingDetailsObj: {
            type: Object,
            default: function() {
                return {
                    officeBuilding: false,      // 是否是写字楼
                    amountA: 0,                 // 工位
                    amountB: 40,                // 办公空间
                    type: 'B',
                    badge: '联合办公',
                    priceMonthMin: 700,
                    priceMonthMinStr: '700',
                    priceDayMin: 3,
                    priceDayMinStr: '3'
                }
            }
        }
    }
} 
</script>

<style lang="sass">
@import "../../sass/main"

.buildingDetails
    +REM( padding, $D-badgePadding )
    +bC( $C-W )
    +borderBottom( rgba( $C-badge, .15 ) )
    // 价格
    .buildingDetails__price
        display: flex
        flex-wrap: wrap
        .price
            +REM-fontStyle( $F-badge, $C-L-text, 1.5 )
            border: 1px solid $C-badge
        .active
            +REM-fontStyle( $F-badge, $C-theme, 1.5 )
            border: 1px solid $C-theme
    // 数值
    .buildingDetails__numberValue
        +REM( margin-top, $D-autoMargin/2 )
        +REM-fontStyle( $F-badge, $C-L-text, 1.5 )
        >p.number
            +dib
            +REM( margin-right, $D-autoMargin )
            >b
                +textCenter
                +REM-padding-LR( $D-autoMargin )
                color: rgba( $C-theme, .8 )
                border:
                    left: 1px solid $C-badge 
                    right: 1px soild $C-badge 
            &:first-child >b
                border-left: none
</style>