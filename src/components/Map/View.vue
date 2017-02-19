<!-- "地图"页面 - 百度地图视图组件( 接收经过筛选后的表现数据 ) -->
<template lang="pug">
    #mapView
</template>

<script>
import  { mapActions, mapGetters }  from    'vuex'
export default {
    data() {
        return {
            baiduMap        : {}                                                                                                // 存储: 'miniMap'对象
            ,resultArr      : []                                                                                                // 存储: 返回结果的数组
            ,indexLevelNum  : ''                                                                                                // 存储: '地图'级别( 用于比较放大缩小事件 )
            ,overlayArr     : []                                                                                                // 存储: 描绘覆盖物时, 将覆盖物对象保存到此数组
        }
    }
    ,mounted: function() {
        this.firstLoading()
    }
    ,methods: {
        // 目的: 状态清空
        firstLoading() {
            this.initOpenMapNum()                                                                                               // 给 $store的 openMapNum : + 1
            // 开始判断 '打开次数'
            let openMapNum = this.$store.state.map.mapState.openMapNum.length
            switch( true ) {
                case openMapNum < 2:
                    this.interfaceRequest()                                                                                     // 初次加载
                    break
                case openMapNum > 1 && openMapNum < 20:                                                                         // 页面打开加载次数未超过限制( 直接检索 )
                    this.interfaceRequest()
                    break
                default:                                                                                                        // 当切换次数大于20次, 重置状态 和 参数 -> 然后发起请求
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
            const miniMap       = new BMap.Map("mapView", {enableMapClick:false})                                               //关闭底图可点功能
            const miniMapPoint  = new BMap.Point( city_Longitude, city_Latitude)
            miniMap.centerAndZoom(miniMapPoint, zoomNum)                                                                        // 层级
            miniMap.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT
                ,type: BMAP_NAVIGATION_CONTROL_SMALL
            }))
            // 添加监听地图层级事件
            miniMap.addEventListener("zoomend", function() {
                // 先保存到变量, 然后赋值到 $data中
                let indexLevelNum
                indexLevelNum = miniMap.getZoom()                                                                               // 保存当前层级到一个变量中
                // 开始判断
                if ( indexLevelNum >= 15 ) {
                    // 输出3级地图内容:详细覆盖
                    changeThisScope( indexLevelNum, 'building' )
                } else if ( indexLevelNum >= 14 ) {
                    // 输出2级地图内容:商圈
                    changeThisScope( indexLevelNum, 'business' )
                } else if ( indexLevelNum >= 12 ) {
                    // 输出1级地图内容:行政区( 覆盖物放大
                    changeThisScope( indexLevelNum, 'administrative' )
                } else {
                    // 输出1级地图内容:行政区( 覆盖物缩小
                    changeThisScope( indexLevelNum, 'administrative' )
                }
                // 将内部变量存储到 $data中
                this.indexLevelNum = indexLevelNum                                                                              // 成功
            })
            let changeThisScope = ( indexLevelNum, indexLevel ) => {                                                            // 改变作用域( this == baiduMap ), 触发组件内的事件
                this.changeIndexLevel( indexLevelNum, indexLevel )
            }
            this.$data.baiduMap = miniMap                                                                                       // 将miniMap保存到 $data中, 让其他事件使用这个方法
        }
        // 目的: 当地图层级改变之后, 更改 $store状态( 触发改变层级计数 )
        ,changeIndexLevel( indexLevelNum, indexLevel ) {
            this.$store.dispatch({
                type            : 'changeIndexLevel'
                ,zoomNum        : indexLevelNum
                ,indexLevel     : indexLevel
            })
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
                    getAdministrativeResult()                                                                                   // 行政区接口
                    break
                case 'business':
                    getBusinessResult()                                                                                         // 商圈接口
                    break
                default:
                    getBuildingResult()                                                                                         // 具体接口
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
                // 将每一个覆盖物保存到 $data中( rangeOverlay覆盖物对象丢出保存对象 )
                let saveOverlayObj = ( params ) => {
                    this.$data.overlayArr.push(params)
                    // 先不保存 直接加入监听事件
                    // params.addEventListener('click', alert() )
                }
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
                    div.setAttribute( "id", this._code )
                    div.setAttribute( "class", "range-overlay--big" )
                    // div.setAttribute( "onclick", "alert(1)" )
                    div.style.zIndex = BMap.Overlay.getZIndex( this._point.lat )
                    // 保存code
                    let code    = this._code                                                                                    //　区域代码
                        ,point  = this._point
                        ,zoom   = this._zoom

                    // addRangeOverlay.addEventListener()
                    // this.addEventListener()
                    // div.addEventListener( 'click', console.log('1111') )
                    div.onclick = function(){
                        alert( '点击事件' )
                    }

                    // console.log( this )
                    let overlayObj = div
                    saveOverlayObj( overlayObj )


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
                    let arr     = new Object()
                        arr     = ObjGroup[i]
                    let code    = arr.code
                        ,text   = arr.name + "<br />" + arr.resourceAmount + "套"                                                // 拼接字符串
                        ,zoom   = setZoom
                    let RangeOverlay = new rangeOverlay(
                        new BMap.Point( arr.latitude, arr.longitude ), text, code, zoom
                    )
                    baiduMap.addOverlay( RangeOverlay )
                }
            }
            // 覆盖物描述方法 - ( '具体' )
            let addBuilding = ( ObjGroup, setZoom ) => {
                // 写字楼覆盖物方法 —— 3级使用
                let addBuildingOverlay = ( longitude, latitude, code, zoom ) => {
                    // 信息自定义标识
                    let pointImg_Obj    = require('../../assets/images/map_select_postion_copy.png')                            // 通过webpack引入图片对象
                    let building_Icon   = new BMap.Icon( pointImg_Obj, new BMap.Size( 40, 40 ) )                                // 自定义标注样式( 加入前面图片对象 )
                    let building_Marker = new BMap.Marker( new BMap.Point(longitude,latitude), { icon: building_Icon} )         // 创建信息自定义标识(将样式加入)
                    baiduMap.addOverlay( building_Marker )                                                                      // 添加建筑物 坐标覆盖物
                }
                // 遍历返回的具体写字楼结果 数组
                for( let i = 0; i < ObjGroup.length; i++ ) {
                    let buildingArr  = new Object()
                        buildingArr  = ObjGroup[i]
                    // 办公楼 详细数据 保存变量
                    let code    = buildingArr.code                                                                              // 保存code, 用于跳转页面
                        ,imgUrl = buildingArr.imgUrl                                                                            // 保存图片地址, 点击自定义覆盖物 弹出框内图片
                        ,zoom   = setZoom
                    addBuildingOverlay( buildingArr.longitude, buildingArr.latitude, code, zoom )                               // 执行添加坐标覆盖物事件
                }
            }
            // 当层级小于12时 -> 修正样式( 缩小覆盖物面积 )
            let zoomOutOverlay = () => {
                for( let i = 0; i < resultArr.length; i++ ){
                    let rangeOverlay_Obj = document.getElementById( resultArr[i].code )
                    rangeOverlay_Obj.setAttribute('class','range-overlay')
                }
            }
            // 清楚当前地图上的覆盖物( 先行执行, 覆盖物描绘方法在其后面执行 )
            baiduMap.clearOverlays()
            // 判断当前层级 -> 渲染渲染覆盖物方法
            if( zoomState < 13 ) {                                                                                              // 1.2覆盖物 -> 缩小覆盖物
                addRangeOverlay( resultArr, zoomState )
                zoomOutOverlay()
                // console.dir( this.$data.overlayArr )            // 将创造的覆盖物对象保存到一个数组当中
            } else if ( zoomState >= 13 && zoomState < 15 ) {                                                                   // 1.2覆盖物
                addRangeOverlay( resultArr, zoomState )
                // console.dir( this.$data.overlayArr )            // 将创造的覆盖物对象保存到一个数组当中
            } else {                                                                                                            // 3覆盖物
                addBuilding( resultArr, zoomState )
                // console.dir( this.$data.overlayArr )            // 将创造的覆盖物对象保存到一个数组当中
            }
            // 当覆盖物描述成功后, 向 $data内的overlayReadyArr数组加一
            this.$store.dispatch({
                type: 'overlayReady'
            })
        }
        // 目的: 点击覆盖物触发的改变层级事件( 未使用 )
        ,setZoom() {
            console.log( '触发层级改变事件' )
        }
        // 目的: 当覆盖物完成渲染 -> 给覆盖物添加点击事件
        ,addOverlayClickEvents() {
            // console.dir( this.overlayArr ) // 将 $data 中的覆盖物数组遍历, 添加监听点击事件
            let overlayArr = this.overlayArr
            for( let i = 0; i < overlayArr.length; i++ ) {
                let overlayObj = overlayArr[i]
                // console.log( overlayObj )
                // overlayObj.addEventListener('click',function(){
                //     console.log( 'dianji' )
                // })

                // console.log( overlayObj )
                // overlayObj.addEventListener('click',function(){
                //     console.log( 'dianji' )
                // })
                // 2.
                // overlayObj.click = function(){
                //     console.log('1')
                // }
                // console.dir( overlayObj )
            }
        }
    }

    ,computed: mapGetters({
        getRequestNum           : 'getRequestNum'
        ,getResultNum           : 'getResultNum'
        ,getOpenMapNum          : 'getOpenMapNum'
        ,getResultArr           : 'getResultArr'
        ,getChangeZoomNumArr    : 'getChangeZoomNumArr'
        ,getOverlayReadyNum     : 'getOverlayReadyNum'
    })
    ,watch: {
        // 监听: 请求次数( 下拉菜单 + 地图点击触发事件 ) —— 整理参数 发起请求
        getRequestNum: function() {
            this.interfaceRequest()                                                                                             // 发起检索请求
        }
        // 监听: 接口返回结果次数 - 修改View页面数据
        ,getResultNum: function() {
            this.resetOverlay()                                                                                                 // 返回结果成功 -> 重置覆盖物( 描述覆盖物方法 )
        }
        // 监听: 页面打开次数 -> 初始化地图
        ,getOpenMapNum: function() {
            this.initMap()
        }
        // 监听: 当层级改变时 -> 统一接口处理事件处理参数 -> 发起请求( 不需判断层级值, 因为是层级区间触发的改变层级事件 )
        ,getChangeZoomNumArr: function() {
            this.interfaceRequest()
        }
        // 监听: 当覆盖物渲染完成 -> 给覆盖物添加点击事件
        ,getOverlayReadyNum: function() {
            // console.log( '覆盖物描绘完成' )
            this.addOverlayClickEvents()
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

</style>
