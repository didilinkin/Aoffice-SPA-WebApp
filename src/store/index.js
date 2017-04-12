import Vue              from 'vue'
import Vuex             from 'vuex'

// 导入各个模块状态
import globalState      from './modules/GLOBAL/globalState'     // 全局 - 状态
import discover         from './modules/DISCOVER/discover'      // '发现' - 状态


Vue.use( Vuex )

const store = new Vuex.Store({
    modules: {
        globalState,
        discover
    }
})

export default store