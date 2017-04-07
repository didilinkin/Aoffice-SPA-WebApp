import actions      from './actions'
import mutations    from './mutations'
import * as types   from './types'

const state = {
    // 设备信息
    deviceInfo: {},
    // 当前城市
    cityInfo: {
        cityCode: '3702',
        deviceInfo: '120.292284',       // 当前城市 - 经度
        cityLatitude: '36.126949'       // 当前城市 - 纬度
    },
    // 加载状态
    loadingState: {
        judgeShow: true
    },
    toggleState: {
        // 房源 - 抽屉状态
        buildingRightDrawer: {
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