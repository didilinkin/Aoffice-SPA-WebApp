<!-- "地图"页面 - 百度地图视图组件( 接收经过筛选后的表现数据 ) -->
<template>
    <div id="mapView"></div>
</template>

<script>
import  { mapActions, mapGetters }  from    'vuex'
export default {
    data() {
        return {
            indexLevelConst       : ''  // 一个层级常量: 第一次将默认状态保存进来; 然后用于比较当前层级是否发生变化( 发生变化: 将最新的值存入 / 未发生变化: 无处理 )
            ,openMapViewNum_const : ''  // 一个页面请求次数值常量
            ,indexLevelNum_const  : ''  // 一个层级改变次数值常量
            ,tempIndexLevel       : ''  // 临时值
        }
    }
    ,mounted: function() {
        // 未来要将切换进来时的 状态清空
        this.firstSaveIndexLevel()
    }
    ,methods: {
        // 目的: 第一次将默认状态保存进来
        firstSaveIndexLevel: function() {
            // 目的: 初次渲染地图页面( 直接使用默认检索条件, 不需要参数 )
            this.$store.dispatch({
                type: 'firstLoadingMap',
                cityCode: this.$store.state.city.cityCode                                     // 查询当前城市 —— 行政区数据
            })
            // 先保存数值, 然后再请求
            this.$data.openMapViewNum_const = this.$store.state.searchValue.openMapViewNum_Arr.length    // 保存渲染页面次数
            // 保存层级
            this.$data.indexLevelConst      = this.$store.state.searchValue.indexLevel
        }
        // 目的: 加载百度地图事件( 后期不再二次加载 )
        ,loadingBaiduMap: function() {
            let city_Longitude = this.$store.state.city.cityLongitude                        // 经度
                ,city_Latitude  = this.$store.state.city.cityLatitude                        // 纬度
            const miniMap = new BMap.Map("mapView", {enableMapClick:false})                  // 创建Map实例(关闭底图可点功能)
            const miniMapPoint = new BMap.Point( city_Longitude, city_Latitude)              // 标点位置( 青岛中心 )
            miniMap.centerAndZoom(miniMapPoint,11)                                           // 创建地图中心点,层级15级（并不显示标记）
            miniMap.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT
                ,type: BMAP_NAVIGATION_CONTROL_SMALL
            }))
            /* 地图覆盖物判断添加事件 —— 调用 */
            // 保存接口返回值
            let administrative_Arr    = []
                administrative_Arr    = this.$store.state.searchValue.administrative_Arr    // 行政区
            let business_Arr          = []
                business_Arr          = this.$store.state.searchValue.business_Arr          // 商圈
            let building_Arr          = []
                building_Arr          = this.$store.state.searchValue.building_Arr          // 办公楼
            // 地图缩放监听
            let lastLevel;
            miniMap.addEventListener("zoomstart",function(){
                lastLevel = this.getZoom()
            })
            miniMap.addEventListener("zoomend", function(){
                let zoomLevel = this.getZoom();                                                 //　当前地图级别
                if (zoomLevel >= 15){                                                           // 输出3级地图内容:详细覆盖
                    console.log("输出3级地图内容:详细覆盖")
                    // addBuilding(buildingPoint_Arr,17);
                    saveIndexLevel('building')                                                  // 保存地图层级: 改为具体
                    setIndexLevelNum()                                                          // 当层级改变, 记录层级改变次数( 用于比较非层级改变的事件 )
                }else if (zoomLevel >= 14){
                    console.log("输出2级地图内容:商圈")                                          // 商圈自定义覆盖物
                    addRangeOverlay(business_Arr,16)
                    saveIndexLevel('business')                                                  // 保存地图层级: 改为商圈
                    setIndexLevelNum()                                                          // 当层级改变, 记录层级改变次数( 用于比较非层级改变的事件 )
                }else if (zoomLevel >= 12){
                    console.log("输出1级地图内容:行政区( 覆盖物放大 )")                            // 商圈自定义覆盖物
                    addRangeOverlay(administrative_Arr,14)
                    saveIndexLevel('administrative')                                            // 保存地图层级: 改为行政区
                    setIndexLevelNum()                                                          // 当层级改变, 记录层级改变次数( 用于比较非层级改变的事件 )
                }else{
                    if (!lastLevel < 12) {
                        console.log("输出1级地图内容:行政区( 覆盖物缩小 )");
                        addRangeOverlay(administrative_Arr,14);                                 // 输出行政区自定义覆盖物
                        setRangeOverlayStyle()                                                  // 改变范围覆盖物尺寸( 只有初始级别要缩小 )
                        saveIndexLevel('administrative')                                        // 保存地图层级: 改为行政区
                    }
                }
            })

            // 保存当前store的层级, 然后将发送修改地图层级的任务
            const saveIndexLevel = ( indexLevel ) => {
                // 先清空$data中的状态, 然后将当前地图层级存入$data, 然后方便后面判断层级更改
                this.$data.indexLevelConst = {}                                                                 // 清空
                this.$data.indexLevelConst = this.$store.state.searchValue.indexLevel                           // 保存上一级层级
                this.$data.indexLevelNum_const = this.$store.state.searchValue.setIndexLevelNum_Arr.length      // 保存上一级层级
                this.$store.dispatch({                                                                          // 目的: 改变地图层级
                    type: 'setMapIndexLevel'
                    ,indexLevel: indexLevel
                })
            }
            // 当层级改变时, 保存改变的次数值
            const setIndexLevelNum = () => {
                this.$store.dispatch({                                                          // 目的: 改变地图层级
                    type: 'setIndexLevelNum'
                })
            }
            // 地图覆盖物判断添加事件 —— 声明常量 ( 行政区 + 商圈 + 具体覆盖物 )
            const buildingOverlayArr = []                                                         // 声明常量
            const addRangeOverlay = ( ObjGroup,setZoom ) => {                                     // 1级 + 2级 通用添加覆盖物事件
                miniMap.clearOverlays()                                                           // 清理地图上面所有点
                for(let i=0; i<ObjGroup.length; i++) {
                    let arr  = new Object();
                        arr  = ObjGroup[i];
                    let code    = arr.code
                        ,text   = arr.name + "<br />" + arr.resourceAmount + "套"                   // 拼接字符串
                        ,zoom   = setZoom;
                    let RangeOverlay = new rangeOverlay(
                        new BMap.Point(arr.latitude,arr.longitude),text,code,zoom
                    );
                    // console.log('次数'+ i);
                    miniMap.addOverlay(RangeOverlay);
                }
            };
            // 行政区＋商圈范围覆盖物—— 1,2级通用
            function rangeOverlay(point,text,code,zoom){
                this._point = point;
                this._text  = text;
                this._code  = code;
                this._zoom  = zoom;
            }
            rangeOverlay.prototype = new BMap.Overlay();
            rangeOverlay.prototype.initialize = function(map){
                this._map = map;
                var div = this._div = document.createElement("div");
                div.setAttribute("id",this._code);
                div.setAttribute("class","range-overlay--big");
                div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                // 保存code
                var code = this._code,   //　区域代码
                    point = this._point,
                    zoom = this._zoom;
                div.onclick = function businessCirclePoint(){
                    // Ajax上传code，并改变中心点
                    map.setZoom(zoom);      // 根据坐标点进行跳转,改变层级
                    // console.log("跳转链接" + url);
                }
                var span = this._span = document.createElement("span");
                div.appendChild(span);
                div.getElementsByTagName("span")[0].innerHTML =  this._text;
                div.onmouseover = function(){ this.style.zIndex = "9"; }
                div.onmouseout = function(){ this.style.zIndex = "1"; }
                map.getPanes().labelPane.appendChild(div);
                return div;
            }
            rangeOverlay.prototype.draw = function(){
                var map = this._map;
                // 我也不知道为什么 需要兑换一下数值才可以输出( 如果不换,坐标会统一到西非那里.. )
                var pointA = {}
                pointA.lat = this._point.lng
                pointA.lng = this._point.lat
                var pixel = map.pointToOverlayPixel(pointA)
                this._div.style.left = pixel.x - 40 + "px"
                this._div.style.top  = pixel.y - 40 + "px"
            }
            // 改变1级范围覆盖物的样式( 当层级小于12级时 执行这个事件 )
            const setRangeOverlayStyle = () => {
                for(let i = 0; i < administrative_Arr.length; i++){
                    let rangeOverlay_Obj = document.getElementById(administrative_Arr[i].code)
                    rangeOverlay_Obj.setAttribute('class','range-overlay')
                }
            }
            // 以下为初次加载时, 更改样式
            addRangeOverlay(administrative_Arr,14)                                           // 先执行一次覆盖物添加( 运行小覆盖物 , 层级默认为11级 )
            setRangeOverlayStyle()                                                           // 改变范围覆盖物尺寸( 只有初始级别要缩小 )

        }
        // 目的: 更新 地图层级状态
        ,updateIndexLevel: function() {

        }
        // 目的: 用于判断, 执行相应的加载
        ,judgeState: function() {
            // 保存state值
            let indexLevel              = this.$store.state.searchValue.indexLevel                          // 层级
                ,btypeState             = this.$store.state.searchValue.btype                               // 类型
                ,requestLength          = this.$store.state.searchMapRequest_Arr.length                     // 判断是否是第一次加载
                ,openMapViewNumLength   = this.$store.state.searchValue.openMapViewNum_Arr.length           // 页面加载次数
                ,indexLevelNumLength    = this.$store.state.searchValue.setIndexLevelNum_Arr.length         // 层级改变次数值
                ,saveIndexLevelNum    = this.$store.state.searchValue.saveIndexLevelNum_Arr                 // 记录当前层级检索次数( 比较是否是在当前层级进行检索 )
            // 保存data值
            let indexLevelConst         = this.$data.indexLevelConst                                        // data: 层级
                ,openMapViewNum_const   = this.$data.openMapViewNum_const                                   // data: 打开页面的次数
                ,indexLevelNum_const    = this.$data.indexLevelNum_const                                    // data: 层级改变次数值


            // 1. 判断是否初次加载此页面
            // 1.1   判断请求次数是否为1( 1: 初次进入, 直接渲染; 不为1: 在首次进入地图页面后, 开始触发检索条件, 开始判断层级 )

            if( openMapViewNumLength == 1 ) {
                if( requestLength == 1 ) {
                    console.log('初次地图页 - 无操作')
                    this.loadingBaiduMap()
                } else {
                    // 开始判断层级是否改变
                    if ( indexLevelConst == indexLevel ) {
                        // 不改变请求接口
                        console.log('初次地图页 - 有操作 - 层级未发生改变')
                    } else {
                        // 目的: 记录当前层级检索次数( 比较是否是在当前层级进行检索 )
                        this.$store.dispatch({
                            type: 'saveIndexLevelNum',
                            saveNum: indexLevelNum_const
                        })
                        // 初次地图页 - 有操作 - 层级发生改变 - 又触发的事件( 指数大于2 )
                        if( saveIndexLevelNum.length != 1 ) {
                            let saveIndexLevelNum_lengthNum = saveIndexLevelNum.length
                                ,minNum = this.$store.state.searchValue.saveIndexLevelNum_Arr[saveIndexLevelNum_lengthNum-2].saveNum            // 2 -> 0
                                ,maxNum = this.$store.state.searchValue.saveIndexLevelNum_Arr[saveIndexLevelNum_lengthNum-1].saveNum            // 1 -> 1
                            if( minNum == maxNum ) {
                                console.log('初次地图页 - 有操作 - 层级未发生改变 - 层级未改变, 在同级接口进行检索')
                            } else {
                                console.log('初次地图页 - 有操作 - 层级未发生改变 - 层级发生改变, 更换级别检索')
                            }
                        }
                    }
                }
            } else {
                // 非初次进入此页面( 还是检索状态内的数据 ) 进行操作
                console.log('非初次进入地图页')
                this.loadingBaiduMap()
            }
        }
    }
    ,computed: mapGetters({
        getSearchRequest: 'getSearchRequest'
    })
    ,watch: {
        // 当 '请求记录' 数组发生改变时, 执行刷新页面
        getSearchRequest: function () {
            this.updateIndexLevel()             // 更新层级状态
            this.judgeState()                   // 判断状态
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

</style>
