import actions      from './actions'
import mutations    from './mutations'
import * as types   from './types'

const state = {
    // '发现' - 请求状态
    requestState: false,
    // '发现' - 轮播图
    bannerImgArr: [],
    // '发现' - '热门房源'
    hotBuildingArr: []
}

export default {
    state,
    types,
    actions,
    mutations
}