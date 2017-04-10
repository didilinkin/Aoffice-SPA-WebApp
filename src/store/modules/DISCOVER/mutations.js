import * as types from './types'

export default {
    [types.SET_DISCOVER_INFO]( state, res ) {
        console.log( '到达mutations!' )
        console.log( state )
        console.log( res.cityCode ) 
        // 此时: mutations接收到actions传递过来的事件, 并且将res接收到; 倒是没有将api接口事件插入
    }
}