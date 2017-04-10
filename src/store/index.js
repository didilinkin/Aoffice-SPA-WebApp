/* global module require:true */
import Vue              from 'vue'
import Vuex             from 'vuex'
import * as getters     from './getters'

// 导入各个模块状态
import globalState      from './modules/GLOBAL/globalState'     // 全局 - 状态
import discover         from './modules/DISCOVER/discover'      // '发现' - 状态


Vue.use( Vuex )

const store = new Vuex.Store({
    getters,
    modules: {
        globalState,
        discover
    }
})

if( module.hot ) {
    module.hot.accept([
        './getters'
    ]), () => {
        store.hotUpdate({
            getters: require( './getters' )
        })
    }
}

export default store