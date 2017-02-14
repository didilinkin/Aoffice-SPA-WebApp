<!-- "企业服务"组件 - 内容盒子(标题内容为活动数据) -->
<template>
    <div class="enterpriseService_box">
        <h3 class="box--title"> {{ box_info.title }} </h3>
        <div class="box--string" />
        <img class="box--img" :src="box_info.imgUrl" />
    </div>
</template>

<script>
export default {
    props: ['box_info']
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

.enterpriseService_box
    position: relative
    width: 33.333%
    padding: 1%
    .box--title
        position: absolute
        top: 12%
        left: 12%
        color: $EnterpriseService-color
    .box--string
        position: absolute
        top: 30%
        left: 12%
        width: 15%
        overflow: hidden
        border-top: 1px solid $EnterpriseService-color
    >img
        width: 100%
        object-fit: cover
</style>
