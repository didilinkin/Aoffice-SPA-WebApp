import Vue                  from 'vue'
import Router               from 'vue-router'

// 路由 + 通用模块
import BottomNav            from '@/components/common/BottomNav'

// 版块
import Discover             from '@/view/Discover'              // '发现'
import BuildingResource     from '@/view/BuildingResource'      // '热门房源'
import Map                  from '@/view/Map'                   // '地图'
import Service              from '@/view/Service'               // '服务'

Vue.use( Router )

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Discover',
            components: {
                AppContent: Discover,
                AppBottomNav: BottomNav
            }
        }, {
            path: '/buildingResource',
            name: 'BuildingResource',
            components: {
                AppContent: BuildingResource,
                AppBottomNav: BottomNav
            }
        }, {
            path: '/map',
            name: 'Map',
            components: {
                AppContent: Map,
                AppBottomNav: BottomNav 
            }
        }, {
            path: '/service',
            name: 'Service',
            components: {
                AppContent: Service,
                AppBottomNav: BottomNav 
            }
        }
    ]
})
