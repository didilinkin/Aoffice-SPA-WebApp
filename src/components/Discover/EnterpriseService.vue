<!-- "发现"页面 - "企业服务"组件 -->
<template>
    <div id="enterpriseService">
        <Title :title_info=title_info />
        <div class="enterpriseService_container">
            <!-- 将info对象数据传递给box组件 -->
            <EnterpriseService_box v-for="item in box_info" :box_info=item />
        </div>
    </div>
</template>

<script>
import  Title                   from   '../Auto/Title.vue'
import  EnterpriseService_box   from   './EnterpriseService_box.vue'
const   components = { Title,EnterpriseService_box }

export default {
    data() {
        return {
            title_info: {
                title: '企业服务',
                backgroundColor: '#FFF'
            },
            box_info: [
                {
                    title: '办公家具',
                    imgUrl: require('../../assets/images/picFurniture@2x.png')
                },
                {
                    title: '办公装修',
                    imgUrl: require('../../assets/images/picDecoration@2x.png')
                },
                {
                    title: '员工培训',
                    imgUrl: require('../../assets/images/picTraining@2x.png')
                },
                {
                    title: '办公电脑',
                    imgUrl: require('../../assets/images/picComputer@2x.png')
                },
                {
                    title: '外出考察',
                    imgUrl: require('../../assets/images/picReview@2x.png')
                },
                {
                    title: '员工福利',
                    imgUrl: require('../../assets/images/picWelfare@2x.png')
                }
            ]
        }
    },
    components: components
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

#enterpriseService
    +REM(margin-top,16px)
    +bC($F)
    +REM(padding-left,16px)
    +REM(padding-right,16px)
    +REM(padding-bottom,16px)
    text-align: center
    /* 内容容器( 内部保存6个box ) */
    .enterpriseService_container
        @extend %flexWrap
        justify-content: center
        width: 100%
</style>
