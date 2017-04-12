import * as discoverAPI     from './api'
import * as types           from './types'

export default {
    [types.REQUEST_DISCOVER_INFO]: ({ commit }, paramsObj ) => {
        const asyncDiscoverInfo = async function() {
            try {
                let result = await discoverAPI.apiDiscoverInfo( paramsObj.cityCode )
                commit( types.SET_DISCOVER_INFO, result )
            } catch( err ) {
                console.log( err )
            }
        }
        asyncDiscoverInfo()
    }
}
