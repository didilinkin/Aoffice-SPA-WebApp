// '发现'页 
<template lang="pug">
#Discover
    h1 '发现'加载完成
    // 将 $store中的 轮播图状态 绑定到 swiper组件props上
</template> 

<script>
import { mapGetters } from 'vuex'

import Swiper from '../components/common/Swiper'
const components = { Swiper }

export default {
    name: 'Discover',
    computed: mapGetters({
        getterDiscoverBannerImgArr: 'getterDiscoverBannerImgArr'
    }),
    components: components
}
</script>