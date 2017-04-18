// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global require: true */
import Vue              from 'vue'
import MuseUI           from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload      from 'vue-lazyload'
import layzr            from 'layzr.js'
import VueScrollTo      from 'vue-scrollto'

import App          from './App'
import store        from './store'
import router       from './router'

require( './assets/iconFont/font-awesome.min.css' )

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.debug = true

const lazyLoader = layzr({
    normal: 'data-normal',
    retina: 'data-retina',
    srcset: 'data-srcset',
    threshold: 35
})
 
Vue.use( MuseUI )
Vue.use( VueAwesomeSwiper )
Vue.use( lazyLoader )
Vue.use( VueLazyload )
Vue.use( VueScrollTo )

Vue.use( VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

// 不同平台下的文字效果不同
if ( /(iPhone|iPad|iPod|iOS )/i.test( navigator.userAgent ) ) {
    document.body.style.fontFamily = 'PingFang SC Regular'
} else if ( /(Android)/i.test( navigator.userAgent ) ) {
    document.body.style.fontFamily = 'NoteSansCJKsc-Regular'
} else {
    document.body.style.fontFamily = 'Microsoft Yahei'
}
