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
            ,testMsg: 'ttt'
        }
    }
    ,mounted: function() {
        // 未来要将切换进来时的 状态清空
        this.firstSaveIndexLevel()
    }
    ,methods: {
        // 目的: 第一次将默认状态保存进来
        firstSaveIndexLevel: function() {
            // 先保存数值, 然后再请求
            this.$data.openMapViewNum_const = this.$store.state.searchValue.openMapViewNum_Arr.length    // 保存渲染页面次数
            // 目的: 初次渲染地图页面( 直接使用默认检索条件, 不需要参数 )
            ,this.$store.dispatch({
                type: 'firstLoadingMap',
                cityCode: this.$store.state.city.cityCode                                     // 查询当前城市 —— 行政区数据
            })

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
                    // 保存地图层级
                    saveIndexLevel('building')       // 改为具体

                    //console.log(this.$data.indexLevel_const)
                    //this.$data.indexLevel_const     = '' // 清空
                    //this.$data.indexLevel_const     = this.$store.state.searchValue.indexLevel
                    // 目的: 改变地图层级
                    // ,this.$store.dispatch({
                    //     type: 'setMapIndexLevel'
                    //     ,indexLevel: 'building'  // 改为具体
                    // })
                }else if (zoomLevel >= 14){
                    console.log("输出2级地图内容:商圈")                                         // 商圈自定义覆盖物
                    addRangeOverlay(business_Arr,16)
                    // 保存地图层级
                    saveIndexLevel('business')       // 改为商圈

                    //console.log(this.$data.indexLevel_const)
                    //this.$data.indexLevel_const     = '' // 清空
                    //this.$data.indexLevel_const     = this.$store.state.searchValue.indexLevel
                    // 目的: 改变地图层级
                    //,this.$store.dispatch({
                    //    type: 'setMapIndexLevel'
                    //    ,indexLevel: 'business'  // 改为商圈
                    // })
                }else if (zoomLevel >= 12){
                    // let AAA = this.$data.indexLevelConst
                    // altMsg('2号行政区')
                    console.log("输出1级地图内容:行政区( 覆盖物放大 )")                          // 商圈自定义覆盖物
                    addRangeOverlay(administrative_Arr,14)
                    // 保存地图层级
                    saveIndexLevel('administrative')       // 改为行政区

                    //this.$data.indexLevel_const     = '' // 清空
                    //this.$data.indexLevel_const     = this.$store.state.searchValue.indexLevel
                    // 目的: 改变地图层级
                    //,this.$store.dispatch({
                    //    type: 'setMapIndexLevel'
                    //    ,indexLevel: 'administrative'  // 改为行政区
                    //})
                }else{
                    if (!lastLevel < 12) {
                        console.log("输出1级地图内容:行政区( 覆盖物缩小 )");
                        addRangeOverlay(administrative_Arr,14);                                 // 输出行政区自定义覆盖物
                        setRangeOverlayStyle()                                               // 改变范围覆盖物尺寸( 只有初始级别要缩小 )
                        // 保存地图层级
                        saveIndexLevel('administrative')       // 改为行政区
                        // altMsg('行政区')
                        // this.$data.indexLevel_const     = {} // 清空
                        // this.$data.indexLevel_const     = this.$store.state.searchValue.indexLevel
                        // 目的: 改变地图层级
                        // ,this.$store.dispatch({
                        //    type: 'setMapIndexLevel'
                        //    ,indexLevel: 'administrative'  // 改为行政区
                        //})
                    }
                }
            })

            // 测试层级 判断调用函数
            const altMsg = ( msg ) => {
                // console.log('跳出打印' + msg)
                this.$data.indexLevel_const     = {} // 清空
                this.$data.indexLevel_const     = this.$store.state.searchValue.indexLevel
                console.log(this.$data.indexLevel_const + msg)
            }

            // 保存当前store的层级, 然后将发送修改地图层级的任务
            const saveIndexLevel = ( indexLevel ) => {
                this.$data.indexLevel_const = {}                                        // 清空
                this.$data.indexLevel_const = this.$store.state.searchValue.indexLevel  // 保存上一级层级
                this.$store.dispatch({                                                  // 目的: 改变地图层级
                    type: 'setMapIndexLevel'
                    ,indexLevel: indexLevel
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
    }
    ,computed: mapGetters({
        getSearchRequest: 'getSearchRequest'
    })
    ,watch: {
        // 当 '请求记录' 数组发生改变时, 执行刷新页面
        getSearchRequest: function () {
            // 还要保留层级级别状态 用于请求( 已层级等级为先, 然后判断类型 )
            let indexLevel = this.$store.state.searchValue.indexLevel                      // 层级
                ,btypeState = this.$store.state.searchValue.btype                          // 类型
                ,requestLength = this.$store.state.searchMapRequest_Arr.length             // 判断是否是第一次加载
                ,openMapViewNumLength = this.$store.state.searchValue.openMapViewNum_Arr.length      // 页面加载次数

            // 首先判断 页面加载的次数; 是否等于第一次( 使用默认条件进行检索 )
            if( openMapViewNumLength == 1 ){
                // 第五次判断: 当前是第一次加载页面, 只是触发了请求. 现在要开始请求次数
                if( requestLength == 1  ){
                    console.log('这是第一次进入页面')
                    this.loadingBaiduMap()
                } else {
                    console.log('开始判断层级')
                    // 第六次判断: 现在开始判断层级是否改变
                    if( indexLevel != this.$data.indexLevel_const ) {
                        console.log('初始页改变层级,更改请求接口:' + '上一级别' + this.$data.indexLevel_const + '当前级别' + indexLevel )
                    } else {
                        console.log(' 初始页层级未发生改变, 在当前级别接口进行请求 ')
                    }
                }
            // 第二次判断 如果state次数 > data记录页面打开次数: 说明是从别的页面切回来的( 使用state数值进行检索 )
            } else if ( openMapViewNumLength != this.$data.openMapViewNum_const ){
                // console.log('新加入页面')
                console.log('state记录新开页面次数' + openMapViewNumLength)
                console.log('data记录次数' + this.$data.openMapViewNum_const)
                this.loadingBaiduMap()
                // 要防止此处溢出
                /*
                    // 将请求次数清空, 然后再判断次数是否为第一次加载
                    let clearNum = () => {
                        console.log('执行清空')
                        this.$store.dispatch({                                                  // 目的: 将请求次数清空
                            type: 'clearRequestLength'
                        })
                    }
                    clearNum()

                    // 再次保存 请求次数变量
                    let requestLength = this.$store.state.searchMapRequest_Arr.length             // 判断是否是第一次加载
                    if ( requestLength == 1 ){
                        // 重新渲染地图
                        this.loadingBaiduMap()
                    } else {
                        console.log('开始判断层级')
                        // 第七次判断: 现在开始判断层级是否改变
                        if( indexLevel != this.$data.indexLevel_const ) {
                            console.log('初始页改变层级,更改请求接口:' + '上一级别' + this.$data.indexLevel_const + '当前级别' + indexLevel )
                        } else {
                            console.log(' 初始页层级未发生改变, 在当前级别接口进行请求 ')
                        }
                    }
                */
            // 第三次判断: 此时页面没有重写切入( 页面加载次数没有改变 ), 只是检索状态改变( 现在开始判断层级是否改变 )
            // 通过层级监听来创建一个计算事件: 当层级发生改变的时候, 先保存state内当前层级的状态值, 然后出发actions改变state值. 最后通过比较两个值来判断
            // 结论: 如果两个值不相等, 说明层级发生改变, 触发不同级别的请求; 否则 触发相同级别的请求
            } else {
                // 第四次判断: 如果层级发生改变 改变 检索级别接口
                if( indexLevel != this.$data.indexLevel_const ) {
                    consolo.log('改变了层级,要更改请求接口:' + '上一级别' + this.$data.indexLevel_const + '当前级别' + indexLevel )
                } else {
                    console.log(' 层级未发生改变, 在当前级别接口进行请求 ')
                }
            }


            /*
            if( requestLength == 1 ) {                                                               // 在这里进行层级比较
                console.log('初次加载')
                // 在此处判断一下 如果层级改变 渲染页面; 如果层级未发生改变 不渲染页面;
                this.loadingBaiduMap()
            } else if( openMapViewNumLength != this.$data.openMapViewNum_const ) {
                console.log('新加入页面')
                this.loadingBaiduMap()
            } else if( indexLevel != this.$data.indexLevel_const ) {
                console.log('发生层级改变, 重新渲染地图')
                this.loadingBaiduMap()
            } else {
                console.log('层级未发生改变, 地图不进行渲染')
            }
            */


            /*

            indexLevel != this.$data.indexLevel_const

            requestLength != this.$data.requestNum_const

            else if( indexLevel != this.$data.indexLevel_const ) {
                console.log('发生层级改变, 重新渲染地图')
                this.loadingBaiduMap()
            } else {
                console.log('层级未发生改变, 地图不进行渲染')
            }
            */
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

</style>
