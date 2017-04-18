// '发现' - '热门房源'模块
<template lang="pug">
#Discover__resoutce.auto--moduleBottomNavMargin
    // 标题
    TitleModule( v-bind:titleObj="resourceTitle" )    
    // 列表渲染
    BuildingList(
        v-bind:buildingListArr="resourceArr"
        v-bind:hasDetails="true"
    )
</template>

<script>
import TitleModule      from '../common/TitleModule'
import BuildingList     from '../common/BuildingList'
const components = { TitleModule, BuildingList }

export default {
    name: 'Resource',
    data() {
        return {
            resourceTitle: {
                title: '热门房源',
                backgroundColor: '#F6F6F6'
            },
            resourceArr: this.$store.state.discover.resoutceArr
        }
    }, 
    components: components
}    
</script>