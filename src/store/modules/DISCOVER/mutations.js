import * as types from './types'

export default {
    [types.SET_DISCOVER_INFO]( state, res ) {
        for( let i = 0; i < res.appTopImg.length; i++ ) {
            class AppTopImg {
                constructor( imgUrl ) {
                    this.imgUrl = 'http://images.aplusoffice.cn/' + imgUrl
                }
            }
            const appTopImgObj = new AppTopImg( res.appTopImg[i])
            state.bannerImgArr.push( appTopImgObj )
        }

        let buildingListArr = []
        buildingListArr = res.building
        for( let i = 0; i < buildingListArr.length; i++ ) {
            buildingListArr[i].appListUrl = 'http://images.aplusoffice.cn/' + buildingListArr[i].appListUrl
            if( buildingListArr[i].type === 'A' ) {
                buildingListArr[i]['badge'] = '写字楼'
                buildingListArr[i]['judgeShow'] = true
            } else {
                buildingListArr[i]['badge'] = '联合办公'
                buildingListArr[i]['judgeShow'] = false
            }
        }
        state.hotBuildingArr = buildingListArr
        setTimeout( function() {
            state.requestState = true
        }, 3000 )
    }
}
