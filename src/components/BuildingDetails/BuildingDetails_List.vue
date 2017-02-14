<!-- 房源详情页列表部分 - 列表页( 办公楼 + 联合办公 ) -->
<template>
    <ul class="buildingDetails_List">
        <li v-for = "item in buildingDetailsList_Arr">
            <img :src="item.imgUrl">
        </li>
    </ul>
</template>

<script>
export default { props: ['buildingDetailsList_Arr'] }
</script>

<style lang="sass" scoped >
@import '../../sass/main'

.buildingDetails_List

</style>
