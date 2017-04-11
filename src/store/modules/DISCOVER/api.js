/* global Promise require:true */
import axios        from 'axios'
const qs = require( 'qs' )

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const apiDiscoverInfo = ( cityCode ) => {
    return new Promise( function( resolve, reject ) {
        axios.post( 'http://app.aplusoffice.cn/api/index', qs.stringify({
            'cityCode': cityCode,
            'page': 1
        }) )
        .then( response => {
            let resultData = response.data.resultData
            resolve( resultData )
        })
        .catch( error => {
            reject( error )
        })
    })
}
