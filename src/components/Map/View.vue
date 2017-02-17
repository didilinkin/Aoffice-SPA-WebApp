<!-- "地图"页面 - 百度地图视图组件( 接收经过筛选后的表现数据 ) -->
<template>
    <div id="mapView"></div>
</template>

<script>
import  { mapActions, mapGetters }  from    'vuex'
export default {
    data() {
        return {

        }
    }
    ,mounted: function() {
        this.firstLoading()         // 未来要将切换进来时的 状态清空
    }
    ,methods: {
        // 目的: 状态清空
        firstLoading() {
            // 给 $store的 openMapNum : + 1
            this.initOpenMapNum()
            // 开始判断 '打开次数'
            let openMapNum = this.$store.state.map.mapState.openMapNum.length
            console.log( openMapNum )
            switch( true ) {
                case openMapNum < 2:
                    // 初次加载
                    this.determineRequest( true )
                    break
                case openMapNum > 1 && openMapNum < 20:
                    // 非初次加载
                    this.determineRequest( false )
                    break
                default:
                    // 当切换次数大于20次. 重置状态 和 参数
                    this.resetState()
                    this.determineRequest( true )
                    break
            }
        }
        // 目的: 向 $store 的 openMapNum次数 加一( 判断切换次数状态, 用于初始化 )
        ,initOpenMapNum() {
            this.$store.dispatch({
                type: 'initOpenMapNum'
            })
        }
        // 目的: 判断发起交互的接口
        ,determineRequest( initResult ) {
            // 保存所有需要的状态

            if( initResult == true ) {
                // 获取初始化的结果事件( 不需要判断层级 )
                console.log(' 初始化 ')
            } else {
                // 非初次加载 - 需要判断层级 - 然后整理参数 - 获取结果
                console.log(' 非初次加载, 判断层级 ')
            }
        }
        // 目的: 重置 检索参数 + openMapNum次数
        ,resetState() {
            this.$store.dispatch({
                type: 'resetState'
            })
        }
    }

    ,computed: mapGetters({

    })
    ,watch: {

    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

</style>

// let city_Longitude  = this.$store.state.city.cityLongitude                          // 经度
//     ,city_Latitude  = this.$store.state.city.cityLatitude
//     ,zoom           = this.$store.state.map.mapState.zoomNum
// this.$baiduMap( city_Longitude, city_Latitude, zoom )
