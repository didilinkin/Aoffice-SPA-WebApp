<!-- 委托找房 -->
<template>
    <div id="findProperties">
        <!-- 上部分表单 -->
        <div class="findProperties--top">
            <mu-text-field hintText="姓名" icon="person" />
            <br />
            <mu-text-field hintText="手机号码" type="number" icon="phone" :errorText="inputErrorText" @textOverflow="handleInputOverflow" :maxLength="11" class="phoneClass" />
            <br />
            <mu-text-field hintText="请输入验证码" icon="vpn_key" />
            <br />
            <mu-raised-button class="demo-raised-button" label="发送验证码" icon="send" primary/>
        </div>
        <!-- 下部分表单 -->
        <div class="findProperties--bottom">
            <mu-text-field hintText="请告诉我您的详细需求，如CBD附近，200m²写字楼，租金9元/m²/天等" multiLine :rows="3" :rowsMax="6"/><br/>
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

#findProperties
    min-height: 90vh
    .findProperties--top
        +auto--contentBox($autoMargin,$title-color-light,$title-size,$badgeFont-color,$text-size)
        +bC($F)
    .findProperties--bottom
        @extend .findProperties--top
        .mu-text-field
            width: 100%
// 手机号码 - 下的提示 设置隐藏
.mu-text-field-help
    display: none
</style>
