<!-- "发现"页面 -->
<template>
    <div id="discover">
        <DiscoverAppBar class="test"/>
        <Swiper :swiper_arr=bannerImg_Arr  />
        <EnterpriseService />
        <Title :title_info=title_info />
        <BuildingList />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import  Swiper                  from    '../components/Discover/Swiper.vue'
import  EnterpriseService       from    '../components/Discover/EnterpriseService.vue'
import  Title                   from    '../components/Auto/Title.vue'
import  BuildingList            from    '../components/Auto/BuildingList.vue'
import  DiscoverAppBar          from    '../components/Discover/DiscoverAppBar.vue'
const   components = { Swiper,EnterpriseService,Title,BuildingList,DiscoverAppBar }

export default {
    data() {
        return {
            title_info: {
                title: '热门房源',
                backgroundColor: '#F6F6F6'
            }
        }
    }
    ,mounted: function() {
        this.getIndexData()             // 获取首页数据
        this.setBottomBtnState(0)
        this.watchScrollY()             // 监听向上滑动
    }
    ,methods: {
        // 目的: 获取首页数据
        getIndexData() {
            // console.log( '选择了联合办公' )
            this.$store.dispatch({
                type: 'setHouseListBType',
                cityCode: '3702'    // 查询当前城市 —— 行政区数据
                ,page   : '1'
                ,bType  : ''
            })
        }
        // 目的: 监听向上滑动
        ,watchScrollY() {
            window.onscroll = () => {
                let yValue = window.scrollY
                if( yValue <= 0 ) {
                    console.log(' 现在归零 ')
                } else {
                    console.log(' 开始移动 ')
                }
            }
        }
        // 改变底部按钮状态样式
        ,setBottomBtnState(state) {
            let bottomBtn_Arr = document.getElementsByClassName("mu-buttom-item")
            // 清空状态
            for( let i = 0; i < bottomBtn_Arr.length; i++ ) {
                bottomBtn_Arr[i].setAttribute("class","mu-buttom-item router-link-active")
            }
            bottomBtn_Arr[state].setAttribute("class","mu-buttom-item router-link-active mu-bottom-item-active")        // 改变"发现"按钮的状态
        }
    }
    ,computed: mapGetters({ bannerImg_Arr: 'bannerImg_Arr' })
    ,components: components
}
</script>

<style lang="sass" scoped>
@import '../sass/main'

#discover
    position: relative
    height: 100%
    +REM(margin-bottom,80px)
</style>
