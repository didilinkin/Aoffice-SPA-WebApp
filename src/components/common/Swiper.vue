// 公用组件 - 轮播
<template lang="pug">
swiper( v-bind:options="swiperOption" )
    swiper-slide Slide1
    swiper-slide Slide2
    swiper-slide Slide3
    swiper-slide Slide4
    // swiper-slide( v-for="item in swiperArr" )

    .swiper-pagination( slot="pagination" )
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
const components = { swiper, swiperSlide }

export default {
    name: 'swiper',
    props: {
        type: Array,                                    // 验证 - 接口类型
        default: function() {                           // 默认值
            return [ 1, 2, 3, 4 ]                          // 可设为预设图 - '图片等待' 
        }
    },
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',       // 页码元素绑定
                paginationClickable: true,              // 页码点击可实现
                centeredSlides: true,                   // 幻灯片居中
                autoplay: 3000,                         // 自动运行 时间间隔
                autoplayDisableOnInteraction: false,    // 自动运行 失去活动功能
                effect: 'fade'                          // 渐变效果
            }
        }
    },
    components: components
}
</script>