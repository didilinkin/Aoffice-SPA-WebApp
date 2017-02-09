import  Vue      from    'vue'
import  axios    from    'axios'
const   qs = require('qs')
import * as types from './mutations'
// 设置ContentType
// axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 设置token
// axios.defaults.headers.common['x-auth-token'] = 'x-auth-token';
// axios.defaults.headers.common['x-requested-from'] = 'apiHttpRequest';

// 免费测试接口 GET方式 :
// https://jsonplaceholder.typicode.com/users
// http://www.punesubji.com/store/rest/products

export const addState = ({commit}) => {
    // 本地JSON
    // axios.post('./static/data.json')

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
    // axios.post('http://192.168.1.30:8282/aoffice_app/api/es/getInvestigate?icode=ig0001' , {
        // icode: 'ig0001'
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
    //  // 静态json
    // axios.post( './static/researchInfo_1.json', {
    //     // code: 'ig0001'
    // })
    // .then(function (response) {
    //     let get_ResearchInfoData = response.data.resultData
    //     // console.log(response)
    //     commit('addResearchInfo',get_ResearchInfoData)
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })

    // axios跨域解决方案( 原生方法 )
    // var params = new URLSearchParams();
    // params.append('code', 'ig0003');
    // axios.post('http://app.aplusoffice.cn/api/es/getInvestigate', params)
    // .then(function (response) {
    //     let get_ResearchInfoData = response.data.resultData
    //     // console.log(response)
    //     commit('addResearchInfo',get_ResearchInfoData)
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })

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
     // 静态json
    // axios.post( './static/buildingDetails_CoWorking_1.json', {
    //     // code: 'ig0001'
    // })
    // .then(function (response) {
    //     let set_CoWorkingInfo = response.data.resultData
    //     commit('addCoWorkingInfo',set_CoWorkingInfo)
    // })
    // .catch(function (error) {
    //     console.log(error);
    // })

    // Axios原生方法传参( 不支持ios )
    // var params = new URLSearchParams();
    // params.append('code',Obj.codeId);
    // axios.post('http://app.aplusoffice.cn/api/building/getH5BuildingByCode', params)
    // .then(function (response) {
    //     let set_CoWorkingInfo = response.data.resultData
    //     commit('addCoWorkingInfo',set_CoWorkingInfo)
    // })
    // .catch(function (error) {
    //     console.log(error)
    // })

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
    // 静态json
    // axios.post( './static/buildingDetails_OfficeBuilding_1.json', {
    //     // code: 'ig0001'
    // })

    // Axios原生方法传参( 不支持ios )
    // var params = new URLSearchParams();
    // params.append('code',Obj.codeId);
    // axios.post('http://app.aplusoffice.cn/api/building/getH5BuildingByCode', params)
    // .then(function (response) {
    //     let set_OfficeBuildingInfo = response.data.resultData
    //     // console.dir(set_OfficeBuildingInfo)
    //     commit('addOfficeBuildingInfo',set_OfficeBuildingInfo)
    // })
    // .catch(function (error) {
    //     console.log(error)
    // })

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
    // Axios原生方法传参( 不支持ios )
    // var params = new URLSearchParams();
    // params.append('cityCode',Obj.cityCode);
    // axios.post('http://app.aplusoffice.cn/api/map/getRegionPointList', params)
    // .then(function (response) {
    //     let set_RegionPointList = response.data.resultData
    //     // console.dir(set_RegionPointList)
    //     commit('addRegionPointList',set_RegionPointList)
    // })
    // .catch(function (error) {
    //     console.log(error)
    // })

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


