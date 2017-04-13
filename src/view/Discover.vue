// '发现'页 
<template lang="pug">
#Discover
    SwiperModule( v-bind:swiperArr="bannerArr" )
</template> 

<script>
import SwiperModule from '../components/common/SwiperModule'
const components = { SwiperModule }

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