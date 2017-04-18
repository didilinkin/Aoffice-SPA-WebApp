// '发现'页 
<template lang="pug">
#Discover
    AppBar
    Swiper( v-bind:swiperArr="bannerArr" )
    ServiceNav
    Resource
    ScrollTo
</template> 

<script>
import AppBar           from '../components/Discover/AppBar'
import Swiper           from '../components/common/Swiper'
import ServiceNav       from '../components/Discover/ServiceNav'
import Resource         from '../components/Discover/Resource'
import ScrollTo         from '../components/common/ScrollTo'
const components = { AppBar, Swiper, ServiceNav, Resource, ScrollTo }

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