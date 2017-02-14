<!-- "发现"页面 - 顶部AppBar -->
<template>
    <mu-appbar id="discoverAppBar" >
        <mu-icon-button icon='list' slot="left" @click="toggle(true)" />
        <!-- 搜索按钮 -->
        <div class="discoverAppBar__search" @click="toSearch()">
            <mu-icon-button icon='search' />
        </div>
        <mu-icon-button icon='chat' slot="right" />
        <!-- 隐藏左侧 -->
        <mu-drawer :open="open" :docked="docked" class="left--box" @close="toggle()">
            <mu-list @itemClick="docked ? '' : toggle()">
                <mu-list-item title="新功能介绍" @click="toAboutInfo( 'newFeatures' )" />                             <!-- NewFeatures -->
                <mu-list-item title="常见问题"   @click="toAboutInfo( 'FAQ' )" />                                     <!-- FAQ -->
                <mu-list-item title="关于我们"   @click="toAboutInfo( 'aboutUs' )" />                                 <!-- AboutUs -->
                <mu-list-item title="商务合作"   @click="toAboutInfo( 'cooperation' )" />                             <!-- Cooperation -->
                <mu-list-item title="隐私政策"   @click="toAboutInfo( 'privacyPolicy' )" />                           <!-- PrivacyPolicy -->
                <mu-list-item title="版权信息"   @click="toAboutInfo( 'copyrightInfo' )" />                           <!-- CopyrightInfo -->
            </mu-list>
        </mu-drawer>
    </mu-appbar>
</template>
<script>
export default {
    data () {
        return {
            open: false,
            docked: true
        }
    },
    methods: {
        toggle (flag) {
            this.open   = !this.open
            this.docked = !flag
        }
        ,toSearch: function() {
            location.href = '#/search/'
        }
        ,toAboutInfo: function(pageName) {
            location.href = '#/aboutAPlus/' + pageName
        }
    }
}
</script>
<style lang="sass">
@import '../../sass/main'

.appbar-search-field
    color: #FFF
    margin-bottom: 0
    &.focus-state
        color: #FFF
    .mu-text-field-hint
        color: fade(#FFF,54%)
    .mu-text-field-input
        color: #FFF
    .mu-text-field-focus-line
        background-color: #FFF
// '发现' - 顶部AppBar栏
#discoverAppBar
    position: fixed
    +bC(rgba($F,.1))
    opacity: 1
    .mu-icon                                                                        // 两侧按钮样式
        color: $F !important
    .mu-appbar-title
        width: 72% !important
    // 搜索class( 使用文本框无法触发@click事件 )
    .discoverAppBar__search
        @extend %flexCenter                                                         // 控制居中
        // '首页' - 顶部appBar - 搜索栏按钮样式
        .mu-icon-button
            +REM(width, 40px)
            +REM(height, 40px)
    .left
        left: 0
        width: 14%
    .right
        right: 0
        width: 14%
        .mu-text-field                                                              // 相对定位( 中间输入框 )
            position: absolute
            left: 15%
            padding-left: 38%!important
            margin-bottom: 0 !important
            >.mu-text-field-icon                                                    // 控制放大镜的位置定位
                left: 44.5% !important
                top: 25% !important
            >div>div
                .mu-text-field-line,.mu-text-field-focus-line
                    left: 0 !important
        .mu-icon-button                                                             // 相对定位( 右侧按钮 )
            position: absolute
            right: 0
        .mu-text-field.has-icon
            padding-left: 34.5% !important                                          // 修正输入框的位置
        .focus-state
            >i.mu-icon
                display: none !important
</style>
