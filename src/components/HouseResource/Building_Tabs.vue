<!-- 房源页( 顶级 ) - Tab切换组件 -->
<template>
    <div id="building_tabs">
        <mu-tabs :value="activeTab" @change="handleTabChange" >
            <mu-tab value="tab1" title="全部类型" @click = "showbuildingList('all')" />
            <mu-tab value="tab2" title="写字楼"   @click = "showbuildingList('building')" />
            <mu-tab value="tab3" title="联合办公" @click = "showbuildingList('coWorking')" />
            <mu-tab value="tab4" title="工位"     @click = "showbuildingList('coWorking')" />
            <mu-tab value="tab5" @active="handleActive" icon="search" title="筛选"/>
        </mu-tabs>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeTab: 'tab1'
        }
    }
    ,mounted: function() {
        // 未来要将切换进来时的 状态清空
        this.getInitInfo()
    }
    ,methods: {
        getInitInfo() {
            // console.log( '选择了联合办公' )
            this.$store.dispatch({
                type: 'setHouseListBType',
                cityCode: '3702'    // 查询当前城市 —— 行政区数据
                ,page   : '1'
                ,bType  : ''
            })
        }
        ,handleTabChange(val) {
            this.activeTab = val
        }
        ,handleActive() {
            // 暂无处理
            window.alert('右侧栏')
        }
        ,showbuildingList( bType ) {

            // 改变数组时, 修改计数值
            const setBuildingNum = () => {
                this.$store.dispatch({                                                          // 目的: 改变地图层级
                    type: 'setBuildingNum'
                })
            }
            setBuildingNum()

            if( bType == 'building' ) {
                // console.log( '选择了building' )
                this.$store.dispatch({
                    type: 'setHouseListBType',
                    cityCode: '3702'    // 查询当前城市 —— 行政区数据
                    ,page   : '1'
                    ,bType  : 'A'
                })
            } else if( bType == 'coWorking' ) {
                // console.log( '选择了联合办公' )
                this.$store.dispatch({
                    type: 'setHouseListBType',
                    cityCode: '3702'    // 查询当前城市 —— 行政区数据
                    ,page   : '1'
                    ,bType  : 'B'
                })
            } else {
                // console.log( '选择了联合办公' )
                this.$store.dispatch({
                    type: 'setHouseListBType',
                    cityCode: '3702'    // 查询当前城市 —— 行政区数据
                    ,page   : '1'
                    ,bType  : ''
                })
            }


        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

#building_tabs
    position: fixed
    top: 1.5rem
    z-index: 1
    width: 100%

.mu-tabs
    +bC($F)
    button
        padding: 0
        +REM(padding-left,$autoMargin/2)
        +REM(padding-right,$autoMargin/2)
        // 最后一个按钮 - 按键效果

</style>
