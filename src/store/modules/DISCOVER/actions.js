import * as discoverAPI     from './api'
import * as types           from './types'

export default {
    // 测试从APP.vue获取参数数据
    // [types.GET_DISCOVER_INFO]: ({ commit }, paramsObj ) => {
    //     try {
    //         let asyncApi = async function( cityCode ) {
    //             // 传入cityCode参数, 异步API: apiDiscoverInfo()
    //             let result = await discoverAPI.apiDiscoverInfo( cityCode ) 
    //             // 如果返回成功, 打印 result返回值
    //             console.log( result ) 
    //             console.log( commit )
    //         }
    //         // 异步API交互事件 - 传入cityCode参数
    //         asyncApi( paramsObj.cityCode )
    //     } catch( err ) {
    //         // 捕捉错误信息
    //         console.log( err )
    //     }
    // }

    // 测试API - async事件
    [types.GET_DISCOVER_INFO]: ({ commit }, paramsObj ) => {
        // 测试案例 成功( 成功调用到API事件 ) 
        // let start = async function() {
        //     try {
        //         let result = await discoverAPI.testApiAsync( 2000 )
        //         console.log( result )
        //     } catch( err ) {
        //         console.log( err )  // 捕捉到错误
        //     }
        // }

        // start()

        // // 打印参数
        // console.log( commit )
        // console.log( paramsObj )

        // 正式
        const asyncDiscoverInfo = async function() {
            try {
                console.log( '成功!' )
                let result = await discoverAPI.apiDiscoverInfoA( paramsObj.cityCode )
                console.log( result )
            } catch( err ) {
                console.log( '失败' )
                console.log( err )  // 捕捉到错误
            }
        }

        asyncDiscoverInfo()

        // 打印参数
        console.log( commit )  
    }
}