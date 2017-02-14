<!-- 通用 - 建筑物列表组件 - 细节组件 -->
<template>
    <div class="buildingList__details">
        <!-- 价格列表 - 循环 -->
        <div class="details__price">
            <mu-raised-button class="demo-raised-button price active">
                {{ building_details.priceMonthMin }} 元/月起
            </mu-raised-button>
            <mu-raised-button class="demo-raised-button price">
                {{ building_details.priceDayMin }} 元/m²/天起
            </mu-raised-button>
        </div>
        <!-- 数据列表 - ( 写字楼 ) -->
        <div class="details__numValue" v-if="building_details.judgeShow">
            <p class="numValue">
                <b> {{ building_details.amount1 }} </b> 套待租
            </p>
            <p class="numValue">
                <b> {{ building_details.amount2 }} </b> 套待租
            </p>
            <p class="numValue">
                <b> {{ building_details.amount3 }} </b> 套待租
            </p>
        </div>
        <!-- 数据列表 - ( 联合办公 ) -->
        <div class="details__numValue" v-else>
            <!-- N套办公空间 -->
            <p class="numValue">
                <b> {{ building_details.amountB }} </b>
                套办公空间
            </p>
            <!-- N个工位 -->
            <p class="numValue">
                <b> {{ building_details.amountA }} </b>
                个工位
            </p>
        </div>
    </div>
</template>

<script>
export default { props: ['building_details'] }
</script>

<style lang="sass" scoped>
@import '../../sass/main'
%details-fontStyle
    +REM(font-size,$badge-size)
    color: $badgeFont-color

.buildingList__details
    +REM-padding(8px,16px,8px,16px)
    .details__price
        display: flex
        flex-wrap: wrap
        // 设置 价格 / 租金 等信息展现按钮的宽度样式
        >.mu-raised-button
            +REM( min-width, 120px )
        /* 设置两侧的padding空余 */
        .mu-raised-button-wrapper
            +REM(padding-left,15px)
            +REM(padding-right,15px)
        .demo-raised-button
            +REM(margin-right,16px)
            box-shadow: none
        .price
            @extend %details-fontStyle
            border: 1px solid rgba($badgeFont-color,.8)
        .active
            color: rgba($theme-color,.9)
            border: 1px solid rgba($theme-color,.8)
            @extend %bold
    .details__numValue
        +REM(padding-top,8px)
        @extend %details-fontStyle
        p.numValue
            @extend %dib
            +REM(margin-right,8px)
            >b
                text-align: center
                padding: 0
                +REM(padding-left,15px)
                +REM(padding-right,10px)
                +REM(margin-right,10px)
                color: rgba($theme-color,.8)
                border-left: 1px solid rgba($badgeFont-color,.5)
                border-right: 1px solid rgba($badgeFont-color,.5)
</style>
