import * as discoverAPI     from './api'
import * as types           from './types'

export default {
    // 获取 '发现'页 - 信息
    [types.GET_DISCOVER_INFO]: ({ commit }, paramsObj ) => {
        const asyncDiscoverInfo = async function() {
            try {
                let result = await discoverAPI.apiDiscoverInfo( paramsObj.cityCode )
                // console.log( result )
                commit( types.SET_DISCOVER_INFO, result )
            } catch( err ) {
                console.log( err )  // 捕捉到错误
            }
        }
        asyncDiscoverInfo()
    }
}