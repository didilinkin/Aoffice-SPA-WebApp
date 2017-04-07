import * as types from './types'

export default {
    [types.TEST_MUTATIONS]( state ) {
        console.log( '到达modules-mutations!' )
        state.deviceInfo['info'] = '设备信息改变!'
    }
}