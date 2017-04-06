// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global require: true */
import Vue      from 'vue'
import MuseUI   from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import App      from './App'
import store    from './store'
import router   from './router'

require( './assets/iconFont/material-icons.css' )

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.debug = true

Vue.use( MuseUI )
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
