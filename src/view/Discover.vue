// '发现'页 
<template lang="pug">
#Discover
    AppBar
    Swiper( v-bind:swiperArr="bannerArr" )
    ServiceNav
</template> 

<script>
import AppBar           from '../components/Discover/AppBar'
import Swiper           from '../components/common/Swiper'
import ServiceNav       from '../components/Discover/ServiceNav'
const components = { AppBar, Swiper, ServiceNav }

export default {
    name: 'Discover',
    data() {
        return {
            bannerArr: this.$store.state.discover.bannerImgArr
        }
    },
    components: components
}
</script>