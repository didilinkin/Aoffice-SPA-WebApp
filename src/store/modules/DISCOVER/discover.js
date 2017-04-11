import actions      from './actions'
import mutations    from './mutations'
import * as types   from './types'

const state = {
    requestState: false,
    bannerImgArr: [],
    hotBuildingArr: []
}

export default {
    state,
    types,
    actions,
    mutations
}
