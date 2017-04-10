import * as types from './types'

export default {
    [types.TEST_ACTIONS]: ({ commit }) => {
        commit( types.TEST_MUTATIONS )
    }
}