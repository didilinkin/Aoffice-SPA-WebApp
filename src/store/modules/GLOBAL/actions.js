/* global console: true */
import * as types from './types'

export default {
    [types.TEST_ACTIONS]: ({ commit }) => {
        console.log( '到达modules-actions!' )
        commit( types.TEST_MUTATIONS )
    }
}