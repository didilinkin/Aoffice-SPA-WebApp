<!-- "发现"页面 - "企业服务"组件 - 2 - 产品新原型 -->
<template>
    <div id="serviceIcon">
        <Title :title_info=title_info />
        <!-- '服务页' 图标按钮 -->
        <div class="serviceIcon__box">
            <div v-for = "item in serviceIcon__Arr" class="serviceIcon__item" @click = 'toSearchDetails( item.urlId )'>
                <!-- Material 图标 -->
                <!--<mu-float-button :icon="item.iconClass" class="demo-float-button"/>-->
                <!-- 设计UI 图标 -->
                <div>
                    <img :src=" item.imgIcon " />
                </div>
                <p> {{ item.title_info }} </p>
            </div>
        </div>
        <!-- '服务页'表单 - 按钮 -->
        <div class="serviceFormBtn--box">
            <!-- 委托找房 / 投放房源 -->
            <div v-for = " item in serviceFormBtn_imgUrl " class="serviceFormBtn" @click = 'toSearchDetails( item.urlId )'>
                <img :src=" item.imgUrl " />
                <h4> {{ item.title_info }} </h4>
                <p> {{ item.subTitle }} </p>
            </div>
        </div>
    </div>
</template>

<script>
import  Title                   from   '../Auto/Title.vue'
const   components = { Title }

export default {
    data() {
        return {
            title_info: {
                title: '企业服务',
                backgroundColor: '#FFF'
            }
            // '服务页' - 链接按钮
            ,serviceIcon__Arr: [
                {
                    iconClass   : 'event_seat'
                    ,title_info : '办公家具'
                    ,imgIcon    : require('../../assets/images/furniture.png')
                    ,urlId      : 'furniture'
                }
                ,{
                    iconClass   : 'format_paint'
                    ,title_info : '办公装修'
                    ,imgIcon    : require('../../assets/images/brush.png')
                    ,urlId      : 'decoration'
                }
                ,{
                    iconClass   : 'edit'
                    ,title_info : '外出考察'
                    ,imgIcon    : require('../../assets/images/pen.png')
                    ,urlId      : 'research'
                }
                ,{
                    iconClass   : 'assignment_ind'
                    ,title_info : '员工培训'
                    ,imgIcon    : require('../../assets/images/people.png')
                    ,urlId      : 'training'
                }
                ,{
                    iconClass   : 'desktop_windows'
                    ,title_info : '办公电脑'
                    ,imgIcon    : require('../../assets/images/computer.png')
                    ,urlId      : 'computer'
                }
            ]
            // '服务表单' 按钮图片链接
            ,serviceFormBtn_imgUrl: [
                {
                    imgUrl      : require('../../assets/images/ico_entrust.png')
                    ,title_info : '委托找房'
                    ,subTitle   : '快速找到心仪办公室'
                    ,urlId      : 'findProperties'
                }
                ,{
                    imgUrl: require('../../assets/images/ico_put_in.png')
                    ,title_info : '投放房源'
                    ,subTitle   : '为您快速出租闲置房源'
                    ,urlId      : 'putInProperties'
                }
            ]
        }
    }
    ,methods: {
        toSearchDetails: function( toPageId ) {
            location.href = '#/service/' + toPageId
        }
    }
    ,components: components
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

#serviceIcon
    +REM(margin-top,16px)
    +bC($F)
    padding-left: 0
    padding-right: 0
    text-align: center
    // 原型按钮样式
    .demo-float-button
        +REM(margin-right,$autoMargin/3)
        +REM(margin-left,$autoMargin/3)
    // 原型按钮去阴影
    .mu-float-button
        +REM(width, 50px)
        +REM(height, 50px)
        box-shadow: none
        +bC(rgba($title-color-light,.2))
    // 服务页链接 原型按钮 —— 盒子容器( 包5个 )
    .serviceIcon__box
        @extend %flexCenter
        .serviceIcon__item
            flex: 1
            // 服务页链接 - 圆形图标div
            >div
                margin: 0 auto
                +REM(width, 60px)
                +REM(height, 60px)
                +radiusSize( 50% )
                +bC( rgba( $badgeFont-color, .2 ) )
                >img
                    width: 100%
            >p
                color: $title-color
                font-weight: 400
    // 服务页链接
    .serviceFormBtn--box
        @extend %flexCenter
        margin: 0
        +REM(margin-top, $autoMargin)
        +REM(margin-bottom, $autoMargin)
        padding: 0
        +REM(padding-top, $autoMargin)
        +REM(padding-bottom, $autoMargin)
        +bC($base-color)
        // 服务表单 - 按钮
        .serviceFormBtn
            flex: 1
            padding: 0
            +REM(padding-top, $autoMargin)
            +REM(padding-bottom, $autoMargin)
            margin: 0
            +REM(margin-left, $autoMargin/2)
            +REM(margin-right, $autoMargin/2)
            +bC($F)
            // 服务表单 —— 按钮样式
            button.mu-raised-button
                width: 85%
                +bC($F !important)
                box-shadow: none
                .mu-icon
                    color: $theme-color !important
            // 服务表单 —— 按钮图片 样式
            >img
                +imgCover(40px)
            >h4
                +REM(font-size, $title-size*1.2)
                +REM(line-height, $bigTitle-size*1.5)
                color: $EnterpriseService-color
            >p
                +REM(font-size, $badge-size/2)
                color: $badgeFont-color
</style>
