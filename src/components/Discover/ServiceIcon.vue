<!-- "发现"页面 - "企业服务"组件 - 2 - 产品新原型 -->
<template>
    <div id="serviceIcon">
        <Title :title_info=title_info />
        <div class="serviceIcon__box">
            <div class="serviceIcon__item">
                <mu-float-button icon="event_seat" class="demo-float-button"/>
                <p> 办公家具 </p>
            </div>

            <div class="serviceIcon__item">
                <mu-float-button icon="format_paint" class="demo-float-button"/>
                <p> 办公装修 </p>
            </div>

            <div class="serviceIcon__item">
                <mu-float-button icon="edit" class="demo-float-button"/>
                <p> 外出考察 </p>
            </div>

            <div class="serviceIcon__item">
                <mu-float-button icon="assignment_ind" class="demo-float-button"/>
                <p> 员工培训 </p>
            </div>

            <div class="serviceIcon__item">
                <mu-float-button icon="desktop_windows" class="demo-float-button"/>
                <p> 办公电脑 </p>
            </div>
        </div>

        <div class="serviceFormBtn--box">
            <!-- 委托找房 -->
            <div class="serviceFormBtn">
                <mu-raised-button class="demo-raised-button" icon="android" backgroundColor="#a4c639" />
            </div>
            <!-- 投放房源 -->
            <div class="serviceFormBtn">
                <mu-raised-button class="demo-raised-button" icon="android" backgroundColor="#a4c639" />
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
        }
    },
    components: components
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
        +bC($theme-color)
    // 服务页链接 原型按钮 —— 盒子容器( 包5个 )
    .serviceIcon__box
        @extend %flexCenter
        .serviceIcon__item
            flex: 1
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
</style>
