import * as types from './types'

export default {
    [types.SET_DISCOVER_INFO]( state, res ) {
        // 拼接 顶部Banner轮播图
        for( let i = 0; i < res.appTopImg.length; i++ ) {
            class AppTopImg {
                constructor( imgUrl ) {
                    this.imgUrl = 'http://images.aplusoffice.cn/' + imgUrl
                }
            }
            const appTopImgObj = new AppTopImg( res.appTopImg[i])
            state.bannerImgArr.push( appTopImgObj )  
        }
        // '热门房源' - 列表
        let buildingListArr = []            // 临时数组 - 存储 '热门房源'列表
        buildingListArr = res.building

        // 拼接 房源图片地址 + 判断房源类型
        for( let i = 0; i < buildingListArr.length; i++ ) {
            buildingListArr[i].appListUrl = 'http://images.aplusoffice.cn/' + buildingListArr[i].appListUrl
            // 判断 房源类型 
            if( buildingListArr[i].type === 'A' ) {
                buildingListArr[i]['badge'] = '写字楼'
                buildingListArr[i]['judgeShow'] = true
            } else {
                buildingListArr[i]['badge'] = '联合办公'
                buildingListArr[i]['judgeShow'] = false
            }
        }
        // 将临时 房源列表 存入 state中( 此时: 图片拼接完成 + 类型判断完成 )
        state.hotBuildingArr = buildingListArr

        // 计时器 - 加载状态更新 -> 加载成功
        setTimeout( function() {
            state.requestState = true
        }, 3000 )
    }
}