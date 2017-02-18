 <!-- Map 下拉选项组件 -->
<template>
    <div id="map_dropDownMenu">
        <mu-dropDown-menu :value="bType" @change="changeBType">
            <mu-menu-item value="1" title="写字楼"/>
            <mu-menu-item value="2" title="联合办公"/>
        </mu-dropDown-menu>
        <mu-dropDown-menu :value="dayPrice" @change="changeDayPrice" v-show="showDayPrice" >
            <mu-menu-item value="1" title="按天价格" />
            <mu-menu-item value="2" title="价格不限" />
            <mu-menu-item value="3" title="小于3元" />
            <mu-menu-item value="4" title="3~5元" />
            <mu-menu-item value="5" title="5~8元" />
            <mu-menu-item value="6" title="8~10元" />
            <mu-menu-item value="7" title="大于10元" />
        </mu-dropDown-menu>
        <mu-dropDown-menu :value="monthPrice" @change="changeMonthPrice" v-show="!showDayPrice">
            <mu-menu-item value="1" title="按月价格" />
            <mu-menu-item value="2" title="价格不限" />
            <mu-menu-item value="3" title="0.5万元以下" />
            <mu-menu-item value="4" title="0.5~1.5万元" />
            <mu-menu-item value="5" title="1.5~3万元" />
            <mu-menu-item value="6" title="3~5万元" />
            <mu-menu-item value="7" title="5万元以上" />
        </mu-dropDown-menu>
        <mu-dropDown-menu :value="decoration" @change="changeDecoration">
            <mu-menu-item value="1" title="装修"/>
            <mu-menu-item value="2" title="不限"/>
            <mu-menu-item value="3" title="豪装"/>
            <mu-menu-item value="4" title="精装"/>
            <mu-menu-item value="5" title="简装"/>
            <mu-menu-item value="6" title="毛坯"/>
        </mu-dropDown-menu>
    </div>
</template>

<script>
import  { mapActions, mapGetters }  from    'vuex'

export default {
    data () {
        return {
            bType           : '1'
            ,dayPrice       : '1'
            ,monthPrice     : '1'
            ,decoration     : '1'
            ,showDayPrice   : true
        }
    }
    ,methods: {
        changeBType( value ) {                                                              // 目的: 改变检索类型
            switch( value ) {                                                               // 判断选择值是否与 $data保存的值相同( 如果相同, 不执行操作 )
                case this.bType:
                    break                                                                   // 值相同, 不执行操作
                default:
                    this.showDayPrice = !this.showDayPrice                                  // 值不相同, 执行操作
                    this.bType = value
                    if( value == 1 ){
                        let parameterObj = new Object
                        parameterObj.bType = 'A'
                        this.saveParameter( parameterObj )
                    }else{
                        let parameterObj = new Object
                        parameterObj.bType = 'B'
                        this.saveParameter( parameterObj )
                    }
                    break
            }
        }
        ,changeDayPrice( value ) {                                                          // 目的: 改变日价格区间
            this.dayPrice = value
            let parameterObj = new Object
            if( value < 3 ){
                parameterObj.priceDayMin = '0'
                parameterObj.priceDayMax = ''
                this.saveParameter( parameterObj )
            }else if( value == 3 ) {
                parameterObj.priceDayMin = '0'
                parameterObj.priceDayMax = '3'
                this.saveParameter( parameterObj )
            }else if( value == 4 ) {
                parameterObj.priceDayMin = '3'
                parameterObj.priceDayMax = '5'
                this.saveParameter( parameterObj )
            }else if( value == 5 ) {
                parameterObj.priceDayMin = '5'
                parameterObj.priceDayMax = '8'
                this.saveParameter( parameterObj )
            }else if( value == 6 ) {
                parameterObj.priceDayMin = '8'
                parameterObj.priceDayMax = '10'
                this.saveParameter( parameterObj )
            }else{
                parameterObj.priceDayMin = '10'
                parameterObj.priceDayMax = ''
                this.saveParameter( parameterObj )
            }
        }
        ,changeMonthPrice( value ) {                                                        // 目的: 改变月价格区间
            this.monthPrice = value
            let parameterObj = new Object
            if( value < 3 ){
                parameterObj.priceMonthMin = '0'
                parameterObj.priceMonthMax = ''
                this.saveParameter( parameterObj )
            }else if( value == 3 ) {
                parameterObj.priceMonthMin = '0'
                parameterObj.priceMonthMax = '5000'
                this.saveParameter( parameterObj )
            }else if( value == 4 ) {
                parameterObj.priceMonthMin = '5000'
                parameterObj.priceMonthMax = '15000'
                this.saveParameter( parameterObj )
            }else if( value == 5 ) {
                parameterObj.priceMonthMin = '15000'
                parameterObj.priceMonthMax = '30000'
                this.saveParameter( parameterObj )
            }else if( value == 6 ) {
                parameterObj.priceMonthMin = '30000'
                parameterObj.priceMonthMax = '50000'
                this.saveParameter( parameterObj )
            }else{
                parameterObj.priceMonthMin = '50000'
                parameterObj.priceMonthMax = ''
                this.saveParameter( parameterObj )
            }
        }
        ,changeDecoration( value ) {                                                        // 目的: 改变装修类型
            this.decoration = value
            let parameterObj = new Object
            if( value < 3 ){
                parameterObj.decoration = ''
                this.saveParameter( parameterObj )
            }else if( value == 3 ) {
                parameterObj.decoration = 'A'
                this.saveParameter( parameterObj )
            }else if( value == 4 ) {
                parameterObj.decoration = 'B'
                this.saveParameter( parameterObj )
            }else if( value == 5 ) {
                parameterObj.decoration = 'C'
                this.saveParameter( parameterObj )
            }else{
                parameterObj.decoration = 'D'
                this.saveParameter( parameterObj )
            }
        }
        ,saveParameter( parameterObj ) {                                                    // 目的: 接收改变参数, 发起actions改变$store内检索参数
            this.$store.dispatch({
                type: 'saveParameter'
                ,attrObj: parameterObj
            })
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../sass/main'

#map_dropDownMenu
    position: fixed
    z-index: 2
    @extend %flexWrap
    width: 100%
    border-bottom: 1px solid rgba($badgeFont-color,.3)
    >.mu-dropDown-menu
        flex: 1
        +bC($F)
        border-right: 1px solid rgba($badgeFont-color,.3)
        &:last-child
            border-right: none
</style>
