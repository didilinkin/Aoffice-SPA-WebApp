import Vue      from 'vue'
import store    from './store'
import router   from './router/config.js'
import Animate  from 'animate.css'
import MuseUI   from 'muse-ui'
import 'animate.css/animate.min.css'
import 'muse-ui/dist/muse-ui.css'
require('./assets/iconfont/material-icons.css')

Vue.config.devtools = true
Vue.config.debug = true

// 挂载全局方法
Vue.prototype.$baiduMap = function(city_Longitude, city_Latitude, zoom  ) {
    const miniMap       = new BMap.Map("mapView", {enableMapClick:false})           // 创建Map实例(关闭底图可点功能)
    const miniMapPoint  = new BMap.Point( city_Longitude, city_Latitude)            // 标点位置( 青岛中心 )
    miniMap.centerAndZoom(miniMapPoint, zoom)                                       // 创建地图中心点,层级15级（并不显示标记）
    miniMap.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT
        ,type: BMAP_NAVIGATION_CONTROL_SMALL
    }))
    return miniMap
}



Vue.use(
    MuseUI
)

new Vue({
    el: '#app',
    store,
    router: router.router
}).$mount('#app')

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    document.body.style.fontFamily="PingFang SC Regular";
} else if (/(Android)/i.test(navigator.userAgent)) {
    document.body.style.fontFamily="NoteSansCJKsc-Regular";
} else {
    document.body.style.fontFamily="Microsoft Yahei";
};



