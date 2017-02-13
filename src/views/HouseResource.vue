<!-- "房源"页面 -->
<template>
    <div id="houseResource">
        <Auto_AppBar />
        <BuildingTabs />
        <BuildingList />
    </div>
</template>

<script>
import  BuildingList            from        '../components/Auto/BuildingList.vue'
import  BuildingTabs            from        '../components/HouseResource/Building_Tabs.vue'
import  Auto_AppBar             from        '../components/Auto/Auto_AppBar.vue'

const   components  = { BuildingList, BuildingTabs, Auto_AppBar }

export default {
    mounted: function() {
        this.setListObj_marginTop()
        this.setBottomBtnState(1)
    }
    ,methods: {
        // 改变底部按钮状态样式
        setBottomBtnState(state) {
            let bottomBtn_Arr = document.getElementsByClassName("mu-buttom-item")
            for( let i = 0; i < bottomBtn_Arr.length; i++ ) {                                                           // 清空状态
                bottomBtn_Arr[i].setAttribute("class","mu-buttom-item router-link-active")
            }
            bottomBtn_Arr[state].setAttribute("class","mu-buttom-item router-link-active mu-bottom-item-active")        // 改变"发现"按钮的状态
        }
        // 目的: 通过计时器 二次修改 房源列表对象的高度
        ,setListObj_marginTop: function() {
            setTimeout(() => {
                const appBar_height     = document.getElementsByClassName("auto__AppBar")[0].offsetHeight       // 获取AppBar对象高度
                const tabs_height       = document.getElementById("building_tabs").offsetHeight                 // 获取tabs对象高度
                const buildingList_Obj  = document.getElementsByClassName("buildingList")[0]                    // 获取房源列表对象
                buildingList_Obj.style.marginTop = appBar_height + tabs_height + 18 + "px"                      // 设置房源列表对象 的 margin-top值( 要加上一个$autoMargin值 )
            }, 100)
        }
    }
    ,components: components
}
</script>

<style lang="sass" scoped>
@import '../sass/main'

#houseResource
    min-height: 60vh
    +REM(margin-bottom,80px)
</style>
