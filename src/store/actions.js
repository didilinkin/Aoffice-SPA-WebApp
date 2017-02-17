import  Vue      from    'vue'
import  axios    from    'axios'
const   qs = require('qs')
import  * as types from './mutations'
// 设置ContentType
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const addState = ({commit}) => {
    // 使用QS获取数据
    axios.post('http://app.aplusoffice.cn/api/index',qs.stringify({ 'cityCode':3702, 'page': 1 }))
    .then(function (response) {
        let get_data = response.data.resultData
        commit('addState',get_data)
    })
    .catch(function (error) {
        console.log(error)
    });
}

export const saveDeviceInfo = ({commit},Obj) => {
    let deviceInfo_Obj = {
        attrName:   Obj.attrName                        // 保存的属性名称
        ,saveValue:  Obj.device_height                  // 保存的属性值
    }
    commit('addDeviceInfo', deviceInfo_Obj)
}

/* 后期将modules 分出 */
// 家居信息
export const getFurnitureInfo = ({commit}) => {
    // 本地数据
    axios.post('./static/furnitureInfo_1.json', {
    })
    .then(function (response) {
        let get_data = response.data.resultData
        commit('addFurnitureInfo',get_data)
    })
    .catch(function (error) {
        console.log(error);
    });
}

//获得 "外出详情" - 数据
export const getResearchInfo = ({commit}) => {
    // 使用QS获取数据
    axios.post('http://app.aplusoffice.cn/api/es/getInvestigate',qs.stringify({ 'code': 'ig0003' }))
    .then(function (response) {
        let get_ResearchInfoData = response.data.resultData
        commit('addResearchInfo',get_ResearchInfoData)
    })
    .catch(function (error) {
        console.log(error)
    });
}

//获得 "联合办公" - 数据
export const setCoWorkingInfo = ({commit},Obj) => {
    // 使用QS获取数据
    axios.post('http://app.aplusoffice.cn/api/building/getH5BuildingByCode',qs.stringify({ 'code': Obj.codeId }))
    .then(function (response) {
        let set_CoWorkingInfo = response.data.resultData
        commit('addCoWorkingInfo',set_CoWorkingInfo)
    })
    .catch(function (error) {
        console.log(error)
    });
}
//获得 "办公楼详情" - 数据
export const setOfficeBuildingInfo = ({commit},Obj) => {
    // qs方法传参数
    axios.post('http://app.aplusoffice.cn/api/building/getH5BuildingByCode', qs.stringify({
        'code': Obj.codeId
    }))
    .then(function (response) {
        let set_OfficeBuildingInfo = response.data.resultData
        // console.log('set_OfficeBuildingInfo值' + set_OfficeBuildingInfo)
        // console.dir(set_OfficeBuildingInfo)
        commit('addOfficeBuildingInfo',set_OfficeBuildingInfo)
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 地图初始数据( 获取行政区数据 )
export const setRegionPointList = ({commit},Obj) => {
    // qs方法传参数
    axios.post('http://app.aplusoffice.cn/api/map/getRegionPointList', qs.stringify({ 'cityCode': Obj.cityCode }))
    .then(function (response) {
        let set_RegionPointList = response.data.resultData
        // console.dir('set_RegionPointList值' + set_RegionPointList)
        commit('addRegionPointList',set_RegionPointList)
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 获取商圈数据
export const setBCPointList = ({commit},Obj) => {
    // qs方法传参数
    axios.post('http://app.aplusoffice.cn/api/map/getBCPointList', qs.stringify({ 'cityCode': Obj.cityCode }))
    .then(function (response) {
        let set_BCPointList = response.data.resultData
        // console.dir('set_BCPointList值' + set_BCPointList)
        commit('addBCPointList',set_BCPointList)
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 获取写字楼数据
export const setBuildingPointList = ({commit},Obj) => {
    // qs方法传参数
    axios.post('http://app.aplusoffice.cn/api/map/getBuildingPointList', qs.stringify({ 'cityCode': Obj.cityCode }))
    .then(function (response) {
        let set_BuildingPointList = response.data.resultData
        commit('addBuildingPointList',set_BuildingPointList)
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 获取行政区数据 ( 参数: 城市代码, 类型 )
export const getTypeRegionPointList = ({commit},Obj) => {
    // qs方法传参数
    axios.post('http://app.aplusoffice.cn/api/map/getRegionPointList', qs.stringify({
        'cityCode': Obj.cityCode
        ,'bType': Obj.btype
    }))
    .then(function (response) {
        let set_typeRegionPointList = response.data.resultData
        // console.log(set_BuildingPointList)
        commit('addTypeRegionPointList',set_typeRegionPointList)
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 地图检索参数( 类型检索值 )
export const setSearchMapValue_btypeValue = ({commit},Obj) => {
    // 保存要改变的值 到 统一数组对象 searchValue_Arr
    let searchValue_Arr = [
        {
            attrName:   'btype'                         // 要改变的属性名称
            ,setValue:  Obj.btype                       // 要改变的类型值
        }
    ]
    commit('addSearchMapValue', searchValue_Arr)        // 交给统一处理任务
}

// 地图检索参数( 日价格区间 )
export const setSearchMapValue_dayPriceValue = ({commit},Obj) => {
    // 保存要改变的值 到 统一数组对象 searchValue_Arr
    let searchValue_Arr = [
        {
            attrName:   'priceDayMin'                   // 要改变的属性名称
            ,setValue:  Obj.priceDayMin                 // 要改变的类型值
        }
        ,{
            attrName:   'priceDayMax'                   // 要改变的属性名称
            ,setValue:  Obj.priceDayMax                 // 要改变的类型值
        }
    ]
    commit('addSearchMapValue', searchValue_Arr)        // 交给统一处理任务
}

// 地图检索参数( 月价格区间 )
export const setSearchMapValue_monthPriceValue = ({commit},Obj) => {
    // 保存要改变的值 到 统一数组对象 searchValue_Arr
    let searchValue_Arr = [
        {
            attrName:   'priceMonthMin'                 // 要改变的属性名称
            ,setValue:  Obj.priceMonthMin               // 要改变的类型值
        }
        ,{
            attrName:   'priceMonthMax'                 // 要改变的属性名称
            ,setValue:  Obj.priceMonthMax               // 要改变的类型值
        }
    ]
    commit('addSearchMapValue', searchValue_Arr)        // 交给统一处理任务
}

// 地图检索参数( 装修级别 )
export const setSearchMapValue_decorationValue = ({commit},Obj) => {
    // 保存要改变的值 到 统一数组对象 searchValue_Arr
    let searchValue_Arr = [
        {
            attrName:   'indexLevel'                    // 要改变的属性名称
            ,setValue:  Obj.indexLevel                  // 要改变的类型值
        }
    ]
    commit('addSearchMapValue', searchValue_Arr)        // 交给统一处理任务
}

// 改变地图层级( 参数: 当前层级 )
export const setMapIndexLevel = ({commit},Obj) => {
    // 保存要改变的值 到 统一数组对象 searchValue_Arr
    let searchValue_Arr = [
        {
            attrName:   'indexLevel'                    // 要改变的属性名称
            ,setValue:  Obj.indexLevel                  // 要改变的类型值
        }
    ]
    commit('addSearchMapValue', searchValue_Arr)        // 交给统一处理任务
}

// 初次渲染地图页面( 直接使用默认检索条件, 不需要参数 )
export const firstLoadingMap = ({commit}, Obj) => {
    // qs方法传参数
    axios.post('http://app.aplusoffice.cn/api/map/getRegionPointList', qs.stringify({ 'cityCode': Obj.cityCode }))
    .then(function (response) {
        let set_administrative = response.data.resultData
        // console.dir('set_RegionPointList值' + set_RegionPointList)
        // commit('addRegionPointList',set_RegionPointList)
        commit('addFirstLoadingMap',set_administrative)                        // 初次渲染地图页面
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 清空请求次数的事件( 当页面再次整体渲染时, 将请求次数清空 )
export const clearRequestLength = ({commit}) => {
    commit('clearRequestLength')
}

// 当层级改变时, 保存改变的次数值
export const setIndexLevelNum = ({commit}) => {
    commit('addIndexLevelNum')
}

// 记录当前层级检索次数( 比较是否是在当前层级进行检索 )
export const saveIndexLevelNum = ({commit}, Obj) => {
    let saveObj = {
        saveNum: Obj.saveNum
    }
    commit('addSaveIndexLevelNum', saveObj)
}

// 地图行政区 - 统一交互接口( 两种类型 )
export const getMapAdministrative = ({commit},Obj) => {
    axios.post('http://app.aplusoffice.cn/api/map/getRegionPointList', qs.stringify({
        'cityCode': Obj.cityCode
        ,'bType': Obj.bType
        ,'priceMonthMin': Obj.priceMonthMin
        ,'priceMonthMax': Obj.priceMonthMax
        ,'priceDayMin': Obj.priceDayMin
        ,'priceDayMax': Obj.priceDayMin
        ,'decoration': Obj.decoration
    }))
    .then(function (response) {
        let set_mapAdministrative = response.data.resultData
        // console.log( set_mapAdministrative )
        commit('addMapAdministrative', set_mapAdministrative)
    })
    .catch(function (error) {
        console.log(error)
    });
}


// 获取 '房源' 类型数据 ( 写字楼 / 联合办公 )
export const setHouseListBType = ({commit},Obj) => {
    axios.post('http://app.aplusoffice.cn/api/building/houses', qs.stringify({
        'cityCode': Obj.cityCode
        ,'page' : Obj.page
        ,'bType': Obj.bType
    }))
    .then(function (response) {
        let set_HouseListBType = response.data.resultData
        commit('addHouseListBType', set_HouseListBType)
    })
    .catch(function (error) {
        console.log(error)
    });
}

// 改变数组时, 修改计数值
export const setBuildingNum = ({commit}) => {
    commit('addBuildingNum')
}

// 改变全局 '锁'状态管理中 - '房源'页 - 右侧抽屉 - 状态
export const setHouseResourceDrawer = ({commit}, Obj ) => {
    // console.log( Obj.openState )
    // console.log( Obj.dockedState )
    // console.log( Obj )
    commit('addHouseResourceDrawer', Obj)
}

// 保存地图检索条件( 地图 - 下拉选项触发 )
export const saveParameter = ( {commit}, Obj ) => {
    commit('addParameter', Obj)
}

// 向 $store 的 openMapNum次数 加一( 地图 - View初始时执行 )
export const initOpenMapNum = ( { commit } ) => {
    commit('addOpenMapNum')
}

// 重置 检索参数 + openMapNum次数( 当加载地图数超20次时, 将检索参数 与 页面打开次数重置, 重载初始数据 )
export const resetState = ( { commit } ) => {
    commit('resetMapState')
}
