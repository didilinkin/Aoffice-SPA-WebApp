<!-- "地图"页面 - 百度地图视图组件( 接收经过筛选后的表现数据 ) -->
<template>
    <div id="mapView"></div>
</template>

<script>
import  { mapActions, mapGetters }  from    'vuex'
export default {
    data() {
        return {
            baiduMap        : {}        // 存储: 'miniMap'对象
            ,resultArr      : []        // 存储: 返回结果的数组
        }
    }
    ,mounted: function() {
        this.firstLoading()
    }
    ,methods: {
        // 目的: 状态清空
        firstLoading() {
            this.initOpenMapNum()                                           // 给 $store的 openMapNum : + 1
            // 开始判断 '打开次数'
            let openMapNum = this.$store.state.map.mapState.openMapNum.length
            // console.log( openMapNum )
            switch( true ) {
                case openMapNum < 2:
                    this.interfaceRequest()                                 // 初次加载
                    break
                case openMapNum > 1 && openMapNum < 20:                     // 页面打开加载次数未超过限制( 直接检索 )
                    this.interfaceRequest()
                    break
                default:                                                    // 当切换次数大于20次, 重置状态 和 参数 -> 然后发起请求
                    this.resetState()
                    this.interfaceRequest()
                    break
            }
        }
        // 目的: 初始化地图
        ,initMap() {
            // 保存城市状态( 用于初始化 )
            let city_Longitude  = this.$store.state.city.cityLongitude
                ,city_Latitude  = this.$store.state.city.cityLatitude
                ,zoomNum        = this.$store.state.map.mapState.zoomNum
            const miniMap       = new BMap.Map("mapView", {enableMapClick:false})               //关闭底图可点功能
            const miniMapPoint  = new BMap.Point( city_Longitude, city_Latitude)
            miniMap.centerAndZoom(miniMapPoint, zoomNum)                                        // 层级
            miniMap.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT
                ,type: BMAP_NAVIGATION_CONTROL_SMALL
            }))
            this.$data.baiduMap = miniMap
            // console.dir( this.$data.baiduMap )
        }
        // 目的: 向 $store 的 openMapNum次数 加一( 判断切换次数状态, 用于初始化 )
        ,initOpenMapNum() {
            this.$store.dispatch({
                type: 'initOpenMapNum'
            })
        }
        // 目的: 统一接口处理事件( 判断层级 -> 保存所需参数 -> 向相应的接口发起请求 )
        ,interfaceRequest() {
            // 保存所有需要的状态
            let cityCode                = this.$store.state.map.searchParameter.cityCode
                ,regionCode             = this.$store.state.map.searchParameter.regionCode
                ,businessCircleCode     = this.$store.state.map.searchParameter.businessCircleCode
                ,bType                  = this.$store.state.map.searchParameter.bType
                ,priceDayMin            = this.$store.state.map.searchParameter.priceDayMin
                ,priceDayMax            = this.$store.state.map.searchParameter.priceDayMax
                ,priceMonthMin          = this.$store.state.map.searchParameter.priceMonthMin
                ,priceMonthMax          = this.$store.state.map.searchParameter.priceMonthMax
                ,decoration             = this.$store.state.map.searchParameter.decoration
                // 地图状态
                ,zoomState              = this.$store.state.map.mapState.zoomNum
                ,indexLevelState        = this.$store.state.map.mapState.indexLevel
            // 接口方法( 参数使用上面保存的变量 )
            let getAdministrativeResult = () => {
                this.$store.dispatch({
                    type                : 'getAdministrativeResult'
                    ,cityCode           : this.$store.state.city.cityCode
                    ,bType              : bType
                    ,priceDayMin        : priceDayMin
                    ,priceDayMax        : priceDayMax
                    ,priceMonthMin      : priceMonthMin
                    ,priceMonthMax      : priceMonthMax
                    ,decoration         : decoration
                })
            }
            let getBusinessResult = () => {
                this.$store.dispatch({
                    type                : 'getBusinessResult'
                    ,cityCode           : this.$store.state.city.cityCode
                    ,regionCode         : regionCode
                    ,bType              : bType
                    ,priceDayMin        : priceDayMin
                    ,priceDayMax        : priceDayMax
                    ,priceMonthMin      : priceMonthMin
                    ,priceMonthMax      : priceMonthMax
                    ,decoration         : decoration
                })
            }
            let getBuildingResult = () => {
                this.$store.dispatch({
                    type                : 'getBuildingResult'
                    ,cityCode           : this.$store.state.city.cityCode
                    ,businessCircleCode : businessCircleCode
                    ,bType              : bType
                    ,priceDayMin        : priceDayMin
                    ,priceDayMax        : priceDayMax
                    ,priceMonthMin      : priceMonthMin
                    ,priceMonthMax      : priceMonthMax
                    ,decoration         : decoration
                })
            }
            // 判断层级( 包括初始化 ) -> 整理参数
            switch( indexLevelState ) {
                case 'administrative':
                    getAdministrativeResult()   // 行政区接口
                    break
                case 'business':
                    getBusinessResult()         // 商圈接口
                    break
                default:
                    getBuildingResult()         // 具体接口
                    break
            }
        }
        // 目的: 重置 检索参数 + openMapNum次数
        ,resetState() {
            this.$store.dispatch({
                type: 'resetState'
            })
        }
        // 目的: 返回结果成功 - 渲染返回数据
        ,resetOverlay() {
            // 使用getters方法, 将返回结果保存到$data中
            this.$data.resultArr    = this.getResultArr
            // 保存 返回结果 + 当前层级数值 + 当前层级区间名 + baiduMap方法
            let resultArr           = this.$data.resultArr
                ,zoomState          = this.$store.state.map.mapState.zoomNum
                ,indexLevelState    = this.$store.state.map.mapState.indexLevel
                ,baiduMap           = this.$data.baiduMap
            // 覆盖物描述方法 - ( '行政区' + '商圈' )
            let addRangeOverlay = ( ObjGroup, setZoom ) => {
                // 方法声明
                let rangeOverlay = function( point, text, code, zoom ) {
                    this._point = point
                    this._text  = text
                    this._code  = code
                    this._zoom  = zoom
                }
                rangeOverlay.prototype = new BMap.Overlay()
                rangeOverlay.prototype.initialize = function( map ) {
                    this._map = map
                    let div = this._div = document.createElement("div")
                    div.setAttribute("id",this._code)
                    div.setAttribute("class","range-overlay--big")
                    div.style.zIndex = BMap.Overlay.getZIndex( this._point.lat )
                    // 保存code
                    let code    = this._code                //　区域代码
                        ,point  = this._point
                        ,zoom   = this._zoom
                    div.onclick = function businessCirclePoint() {
                        // Ajax上传code，并改变中心点
                        map.setZoom(zoom)                   // 根据坐标点进行跳转,改变层级
                        // console.log("跳转链接" + url)
                    }
                    let span = this._span = document.createElement("span")
                    div.appendChild(span)
                    div.getElementsByTagName("span")[0].innerHTML =  this._text
                    div.onmouseover = function() {
                        this.style.zIndex = "9"
                    }
                    div.onmouseout = function() {
                        this.style.zIndex = "1"
                    }
                    map.getPanes().labelPane.appendChild(div)
                    return div
                }
                rangeOverlay.prototype.draw = function() {
                    let map = this._map
                    let pointA = {}
                        pointA.lat = this._point.lng
                        pointA.lng = this._point.lat
                    // 我也不知道为什么 需要兑换一下数值才可以输出( 如果不换,坐标会统一到西非那里.. )
                    let pixel = map.pointToOverlayPixel(pointA)
                    this._div.style.left = pixel.x - 40 + "px"
                    this._div.style.top  = pixel.y - 40 + "px"
                }

                // 渲染覆盖物( 调用 )
                for( let i = 0; i < ObjGroup.length; i++ ) {
                    let arr  = new Object()
                        arr  = ObjGroup[i]
                    let code    = arr.code
                        ,text   = arr.name + "<br />" + arr.resourceAmount + "套"                   // 拼接字符串
                        ,zoom   = setZoom
                    let RangeOverlay = new rangeOverlay(
                        new BMap.Point( arr.latitude, arr.longitude ), text, code, zoom
                    )
                    baiduMap.addOverlay( RangeOverlay )
                }
            }
            // 覆盖物描述方法 - ( '具体' )
            let addBuilding = ( ObjGroup, setZoom ) => {

            }
            // 当层级小于12时 -> 修正样式( 缩小覆盖物面积 )
            let zoomOutOverlay = () => {
                for( let i = 0; i < resultArr.length; i++ ){
                    let rangeOverlay_Obj = document.getElementById( resultArr[i].code )
                    rangeOverlay_Obj.setAttribute('class','range-overlay')
                }
            }
            // 清楚当前地图上的覆盖物
            baiduMap.clearOverlays()
            // 判断当前层级 -> 渲染渲染覆盖物方法
            if( zoomState < 12 ) {                                  // 1.2覆盖物 -> 缩小覆盖物
                addRangeOverlay( resultArr, zoomState )
                zoomOutOverlay()
            } else if ( zoomState >= 12 && zoomState < 15 ) {       // 1.2覆盖物
                addRangeOverlay( resultArr, zoomState )
            } else {                                                // 3覆盖物
                addBuilding( resultArr, zoomState )
            }
        }
    }

    ,computed: mapGetters({
        getRequestNum   : 'getRequestNum'
        ,getResultNum   : 'getResultNum'
        ,getOpenMapNum  : 'getOpenMapNum'
        ,getResultArr   : 'getResultArr'
    })
    ,watch: {
        // 监听: 请求次数( 下拉菜单 + 地图点击触发事件 ) —— 整理参数 发起请求
        getRequestNum: function() {
            // 发起检索请求
            this.interfaceRequest()
        }
        // 监听: 接口返回结果次数 - 修改View页面数据
        ,getResultNum: function() {
            // 返回结果成功 -> 渲染地图( 重置覆盖物 )
            this.resetOverlay()   // 重置覆盖物( 描述覆盖物方法 )
            // console.log(' 返回结果 ')
        }
        // 监听: 页面打开次数 - 初始化地图
        ,getOpenMapNum: function() {
            this.initMap()
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

</style>
