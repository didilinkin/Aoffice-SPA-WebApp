<!-- 投放房源 -->
<template>
    <div id="putInProperties">
        <mu-text-field hintText="姓名" icon="person" />
        <br />
        <mu-text-field hintText="手机号码" type="number" icon="phone" :errorText="inputErrorText" @textOverflow="handleInputOverflow" :maxLength="11" class="phoneClass" />
        <br />
        <mu-text-field hintText="请输入验证码" icon="vpn_key" />
        <br />
        <mu-raised-button class="demo-raised-button" label="发送验证码" icon="send" primary/>

        <div class="putInProperties--bottom">
            <mu-text-field hintText="区域" />
            <mu-text-field hintText="面积" />
            <mu-text-field hintText="楼盘名称" fullWidth />
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            input: '',
            inputErrorText: '',
            multiLineInput: '',
            multiLineInputErrorText: ''
        }
    },
    methods: {
        handleInputOverflow (isOverflow) {
            this.inputErrorText = isOverflow ? '超过！' : ''
        },
        handleMultiLineOverflow (isOverflow) {
            this.multiLineInputErrorText = isOverflow ? '超过！' : ''
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../../sass/main'

#putInProperties
    min-height: 90vh
    +auto--contentBox($autoMargin,$title-color-light,$title-size,$badgeFont-color,$text-size)
    +bC($F)
    +pR($autoMargin*2)
    .mu-text-field
        width: 100%
    // 下部分
    .putInProperties--bottom
        +REM(padding, $autoMargin)
        padding:
            left: 0
            right: 0
        // 下半部分 输入框默认设置为半个宽度
        .mu-text-field
            width: 45% !important
            padding: 0 2.5%
        .full-width
            width: 98% !important
            padding: 0
            padding-left: 2.5%

// 手机号码 - 下的提示 设置隐藏
.mu-text-field-help
    display: none
</style>
