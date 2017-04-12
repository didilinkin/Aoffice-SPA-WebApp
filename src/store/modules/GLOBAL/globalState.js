import actions      from './actions'
import mutations    from './mutations'
import * as types   from './types'

const state = {
    deviceInfo: {},                     // 设备信息
    cityInfo: {                         // 当前城市
        cityCode: '3702',
        deviceInfo: '120.292284',       // 当前城市 - 经度
        cityLatitude: '36.126949'       // 当前城市 - 纬度
    },
    toggleState: {
        buildingRightDrawer: {          // 房源 - 抽屉状态
            open: false,
            docked: true
        }
    }
}

export default {
    state,
    types,
    actions,
    mutations
}