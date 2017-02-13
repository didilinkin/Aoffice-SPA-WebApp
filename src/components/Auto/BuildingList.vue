<!-- 通用 - 建筑物列表组件 -->
<template>
    <div class="buildingList">
        <div class="building--box" v-for="item in getHotBuildingArr">
            <!-- 建筑 - 简介 -->
            <div class="building--intro" v-bind:style="{ backgroundImage: 'url(' + item.appListUrl.imgUrl + ')' }" @click = 'toBuildingDetails( item.code, item.type )'>
                <div class="badge"> {{ item.badge }} </div>
                <h2> {{ item.name }} </h2>
                <p> {{ item.subTitle }} </p>
            </div>
            <!-- 建筑 - 细节 ( 组件引入 ) -->
            <BuildingList_details :building_details=item />
        </div>
    </div>
</template>
<script>
import  BuildingList_details    from   './BuildingList_details.vue'
import  { mapGetters }          from 'vuex'
const   components = { BuildingList_details }

export default {
    data() {
        return {
            buildingArr : []
        }
    }
    ,mounted: function() {
        // 未来要将切换进来时的 状态清空
        this.setArr()
    }
    ,computed: mapGetters({
        // hotBuildingList_Arr : 'hotBuildingList_Arr'
        // ,getBuildingNum     : 'getBuildingNum'
        getHotBuildingArr  : 'getHotBuildingArr'
    })
    ,methods: {
        // 将 $store 的数组 放置到 $data
        setArr: function() {

            this.$data.buildingArr = this.$store.state.hotBuildingList_Arr
        }
        ,toBuildingDetails: function ( toPageCode, toPageType ) {
            // 判断大厦类型( 大楼 / 联合办公 )
            let building_type = toPageType
            if ( building_type === 'A' ) {
                location.href = '#/office-Building/' + toPageCode                               // 跳向'写字楼' 路由模版
            } else {
                location.href = '#/co-working/' + toPageCode                                    // 跳向'联合办公' 路由模版
            }
        }
    }
    ,components: components
}
</script>
<style lang="sass" scoped>
@import '../../sass/main'

=introMixin($bottom,$fontSize,$color,$weight)
    @extend %ABS
    +REM(left,16px)
    bottom: $bottom
    +REM(font-size,$fontSize)
    color: $color
    font-weight: $weight

.buildingList
    .building--box
        +REM(margin-top,$autoMargin)
        +REM(margin-bottom,$autoMargin)
        +bC($F)
        border-bottom: 1px solid rgba($badgeFont-color,.4)
        .building--intro
            @extend %REL
            width: 100%
            +REM(height,200px)
            background:
                repeat: no-repeat
                position: cover
                size: cover
            .badge
                @extend %flexCenter
                @extend %ABS
                right: 0
                +REM(padding,4px)
                +REM(padding-left,10px)
                +REM(padding-right,10px)
                +REM(width,75px)
                +REM(font-size,$badge-size)
                color: $F
                +bC($badge-bgColor)
            >h2
                +introMixin(17%,$title-size,$F,bold)
                +REM(line-height,23px)
            >p
                +introMixin(5%,$text-size,rgba($F,.77),normal)
</style>
