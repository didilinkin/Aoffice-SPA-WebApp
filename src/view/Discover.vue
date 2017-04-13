// '发现'页 
<template lang="pug">
#Discover
    AppBar
    SwiperModule( v-bind:swiperArr="bannerArr" )
</template> 

<script>
import AppBar           from '../components/Discover/AppBar'
import SwiperModule     from '../components/common/SwiperModule'
const components = { AppBar, SwiperModule }

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