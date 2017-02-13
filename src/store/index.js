import  Vue                 from 'vue'
import  Vuex                from 'vuex'
import  * as getters        from './getters'
import  * as actions        from './actions'
import  * as mutations      from './mutations'

Vue.use(Vuex)
// 状态树
const state = {
    deviceInfo: {}                                       // 设备信息
    ,city: {                                             // 查询城市
        cityCode: '3702'
        ,cityLongitude: '120.292284'                    // 当前城市 - 经度
        ,cityLatitude:  '36.126949'                     // 当前城市 - 纬度
    }
    ,loadingState: {
        judgeShow: true
    }                                                   // 加载动画状态
    ,bannerImg_Arr: []                                  // "发现" - banner图片数组
    ,hotBuildingList_Arr: []                            // "发现" - "热门房源"内容
    ,hotBuildingArr: []                                 // 去掉[0]
    ,buildingNum: []                                    // 用于记录类型改变次数
    ,furnitureInfo: {
        appPic: '',
        code: '',
        description: '',
        furnitureSizeList: [],
        imgUrl: [],
        name: '',
        price: 0,
        type: '',
        judgeShow: true
    }
    ,researchInfo: {                                    // "考察" -详情页数据
        IPList: [],
        address: '',
        appPic: '',
        description: '',
        name: '',
        judgeShow: true
    }
    ,officeBuilding: {                                  // "办公楼" -详情
        judgeShow: true,
        buildingRelationList_judgeShow: true
    }
    ,coWorking: {                                       // "联合办公" - 详情
        judgeShow: true,
        buildingRelationList_judgeShow: true,
        nameInfo: '0'
    }
    ,regionPointList: []                                        // '地图' 初始数据( 获取行政区数据 )
    ,BCPointList: []                                            // '地图' 商圈数据
    ,buildingPointList: []                                      // '地图' 写字楼数据
    ,mapView: {
         typeRegionPointList: []                                // 经过检索后的行政区数据( 类型判断 )
    }
    // 检索状态集( 下拉菜单 / 层级改变 都可以修改这个检索集合 )
    ,searchValue: {
        // 地图层级检索条件
        cityCode:               ''                                      // 检索城市code
        ,indexLevel:            'administrative'                        // 行政区: administrative; 商圈: business; 具体: building
        ,regionCode:            ''                                      // 行政区编号
        ,businessCircleCode:    ''                                      // 商圈编号
        // 下拉菜单检索条件
        ,btype:                 'A'                                     // 检索类型( 只有A / B 选项 )
        ,priceDayMin:           '0'                                     // 价格( 天 )最小值
        ,priceDayMax:           ''                                      // 价格( 天 )最大值
        ,priceMonthMin:         '0'                                     // 价格( 月 )最小值
        ,priceMonthMax:         ''                                      // 价格( 月 )最大值
        ,decoration:            ''                                      // 装修( A:豪装; B:精装; C:简装; D:毛坯 )
        // 经过检索后的渲染对象
        ,administrative_Arr:    []                                      // 行政区数组
        ,business_Arr:          []                                      // 商圈数组
        ,building_Arr:          []                                      // 办公楼数组
        ,openMapViewNum_Arr:    []                                      // 当从别的页面切入Map页面时,向内推入一个空对象( 触发watch观察事件 )
        ,setIndexLevelNum_Arr:  []                                      // 当层级改变的时候, 向内推一个空对象( 判断事件是否不改变层级 )
        ,saveIndexLevelNum_Arr: []                                      // 记录当前层级检索次数( 比较是否是在当前层级进行检索 )
    }
    ,searchMapRequest_Arr: []                                           // 当发生地图检索请求时,向内推入一个空对象( 触发watch观察事件 )
}
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
if (module.hot) {
    module.hot.accept([
        './getters',
        './actions',
        './mutations',
    ], () => {
        store.hotUpdate({
            getters: require('./getters'),
            actions: require('./actions'),
            mutations: require('./mutations'),
        })
    })
}

export default store
