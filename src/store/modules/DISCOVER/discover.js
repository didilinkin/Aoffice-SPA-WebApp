import actions      from './actions'
import mutations    from './mutations'
import * as types   from './types'

const state = {
    // '发现' - 轮播图
    discoverBannerImg: [],
    // '发现' - '热门房源'
    discoverBuilding: []
}

export default {
    state,
    types,
    actions,
    mutations
}