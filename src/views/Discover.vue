<!-- "发现"页面 -->
<template>
    <div id="discover">
        <DiscoverAppBar />
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
        this.watchScrollY()             // 监听向上滑动, 改变样式
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
                let yValue              = window.scrollY
                    ,discoverAppBarObj  = document.getElementById('discoverAppBar')                     // 获得顶部appBar元素
                    ,btnArr             = document.getElementsByClassName('material-icons')             // 检索按钮数组( 需要的只是前三个 ) 改变其样式( 强调 )
                    ,inputObj           = document.getElementsByClassName('discoverAppBar__search')[0]  // 顶部appBar部分 - 输入框样式改变( 当屏幕下滑时 )

                if( yValue <= 0 ) {
                    discoverAppBarObj.setAttribute('style', 'background-color: rgba(255, 255, 255, 0.1)')
                    // 修改顶部appBar 按钮样式
                    for(let i = 0; i < 3; i++) {
                        btnArr[i].setAttribute('style', 'color: #FFF !important')
                    }
                    inputObj.setAttribute('style', 'background-color: none !important')
                } else {
                    discoverAppBarObj.setAttribute('style', 'background-color: rgba(255, 255, 255, 0.95) !important; box-shadow: 0px 0px 5px 5px #FFF')
                    // 修改顶部appBar 按钮样式
                    for(let i = 0; i < 3; i++) {
                        btnArr[i].setAttribute('style', 'color: rgb(255,94,27) !important')
                    }
                    inputObj.setAttribute('style', 'background-color: rgba(156,157,159, .3) !important')
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
