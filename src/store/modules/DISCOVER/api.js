/* global Promise response require:true */
import axios        from 'axios'
// import * as types   from './types'
const qs = require( 'qs' )

// 设置ContentType
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 获取'发现'页信息
// export const apiDiscoverInfo = ( cbFunction, cityCode ) => {
//     axios.post( 'http://app.aijiabangong.com/api/index', qs.stringify({
//         'cityCode': cityCode,
//         'page': 1
//     }) )
//     .then( function( response ) {
//         let discoverInfo = response.data.resultDate
//         cbFunction( discoverInfo )      // callBack
//     })
//     .catch( function( error ) {
//         console.log( error )
//     })
// }

// 首先尝试用箭头函数
export const apiDiscoverInfo = ( cityCode ) => {
    new Promise( function( resolve, reject ) {
        // Axios交互事件
        axios.post( 'http://app.aijiabangong.com/api/index', qs.stringify({
            'cityCode': cityCode,
            'page': 1
        }) )
        resolve( response )     // 返回 -> 返回值
        reject( 'error' )       // 出错 -> 返回error
    })
}

// 测试 获取首页数据 A
export const apiDiscoverInfoA = ( cityCode ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( 'http://app.aplusoffice.cn/api/index', qs.stringify({
            'cityCode': cityCode,
            'page': 1
        }) )
        .then( response => {
            let resultData = response.data.resultData
            // console.log( resultData )   // 打印返回值 成功
            resolve( resultData )       // 返回值
        })
        .catch( error => {
            reject( error )             // 出错 -> 返回error
        })
    })
}

// 测试async事件
export const testApiAsync = ( time ) => {
    return new Promise(
        function( resolve, reject ) {
            setTimeout( function() {
                resolve( 'ok' )         // 成功 -> 返回
                reject( 'error' )       // 出错 -> error
            }, time )
        }
    )
}