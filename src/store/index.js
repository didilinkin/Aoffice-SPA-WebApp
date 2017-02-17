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
    // 全局 '锁'的状态管理
    ,globalToggle: {
        houseResourceRightDrawer: {                     // '房源'页 - 右侧 - 抽屉锁
            open    : false
            ,docked : true
        }
    }
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
    // 管理 '地图' 全部状态 与 全部数据
    ,map: {
        // 检索参数
        searchParameter: {
            // cityCode                : '3702'             // 城市Code( 接口交互时, 采用当前城市cityCode )
            regionCode              : ''                    // 行政区Code
            ,businessCircleCode     : ''                    // 商圈Code
            ,bType                  : ''                    // 检索类型( 必选 )
            ,priceDayMin            : '0'                   // 日价 - 最小值
            ,priceDayMax            : ''                    // 日价 - 最大值
            ,priceMonthMin          : '0'                   // 月价 - 最小值
            ,priceMonthMax          : ''                    // 月价 - 最大值
            ,decoration             : ''                    // 装修( A:豪装; B:精装; C:简装; D:毛坯 )
        }
        // 地图状态
        ,mapState: {
            zoomNum                 : '11'                  // 地图当前层级( 具体数值 )
            ,indexLevel             : 'administrative'      // 行政区: administrative; 商圈: business; 具体: building
            ,openMapNum             : []                    // 记录 '地图' 页面打开次数 - 判断初始化
            ,changeIndexLevelNum    : []                    // 记录 '地图' 层级改变次数 - 判断事件是否改变层级
            ,requestNum             : []                    // 记录 '地图' 发起检索事件次数 - 回调判断检索事件内容( 需监听 )
            ,resultNum              : []                    // 记录返回结果 次数( 需监听 )
        }
        // 返回结果
        ,resultArr                  : []                    // 所有类型结果( 行政区 + 商圈 + 具体建筑物 )
    }
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
