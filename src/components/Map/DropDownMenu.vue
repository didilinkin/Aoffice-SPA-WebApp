 <!-- Map 下拉选项组件 -->
<template>
    <div id="map_dropDownMenu">
        <mu-dropDown-menu :value="buildingType" @change="buildingTypeChange">
            <mu-menu-item value="1" title="写字楼"/>
            <mu-menu-item value="2" title="联合办公"/>
        </mu-dropDown-menu>
        <mu-dropDown-menu id="dayPrice" :value="dayPrice" @change="dayPriceChange">
            <mu-menu-item value="1" title="按天价格" />
            <mu-menu-item value="2" title="价格不限" />
            <mu-menu-item value="3" title="小于3元" />
            <mu-menu-item value="4" title="3~5元" />
            <mu-menu-item value="5" title="5~8元" />
            <mu-menu-item value="6" title="8~10元" />
            <mu-menu-item value="7" title="大于10元" />
        </mu-dropDown-menu>
        <mu-dropDown-menu id="monthPrice" :value="monthPrice" @change="monthPriceChange">
            <mu-menu-item value="1" title="按月价格" />
            <mu-menu-item value="2" title="价格不限" />
            <mu-menu-item value="3" title="0.5万元以下" />
            <mu-menu-item value="4" title="0.5~1.5万元" />
            <mu-menu-item value="5" title="1.5~3万元" />
            <mu-menu-item value="6" title="3~5万元" />
            <mu-menu-item value="7" title="5万元以上" />
        </mu-dropDown-menu>
        <mu-dropDown-menu :value="decoration" @change="decorationChange">
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
            buildingType:   '1'
            ,dayPrice:      '1'
            ,monthPrice:    '1'
            ,decoration:    '1'
        }
    }
    ,mounted: function() {
        this.setRegionPointList()   // 首先 获取行政区数据( 可能无效了 )
        // this.firstLoadingMap()      // 初次渲染地图页面( 直接使用默认检索条件, 不需要参数 )
        this.setPriceStyle()        // 改变价格菜单价格 事件
        this.firstLoading()         // 删除'日价格'元素
    }
    ,methods: {
        // 目的: 初次渲染地图页面( 直接使用默认检索条件, 不需要参数 )
        /*  此功能挪到 view组件执行
            firstLoadingMap() {
                this.$store.dispatch({
                    type: 'firstLoadingMap',
                    cityCode: this.$store.state.city.cityCode                                   // 查询当前城市 —— 行政区数据
                })
            }
        */
        // 根据btype类型, 修改下拉菜单价格类型
        setPriceStyle(day,month){
            let dayPricePrice_Obj   = document.getElementById('dayPrice')
                dayPricePrice_Obj.setAttribute('style', 'display:'+ day )
            let monthPrice_Obj      = document.getElementById('monthPrice')
                monthPrice_Obj.setAttribute('style', 'display:' + month )
        }
        // 首次进入, 根据'写字楼'状态 需要先隐藏一下'按月价格'
        ,firstLoading() {
            this.setPriceStyle('block', 'none')
        }
        ,buildingTypeChange (value) {
            this.buildingType = value
            // 更改行政区类型 ( 参数: 城市代码, 类型 ) => 提交actions的事件
            let setSearchMapValue_btypeValue = ( typeValue ) => {
                this.$store.dispatch({
                    type: 'setSearchMapValue_btypeValue'
                    ,btype: typeValue
                })
            }
            // 判断 类型值, 然后根据类型值进行检索 获取数据
            if( value == 1 ){
                setSearchMapValue_btypeValue('A')
                this.setPriceStyle('block', 'none')
            }else{
                setSearchMapValue_btypeValue('B')
                this.setPriceStyle('none', 'block')
            }
        }
        ,dayPriceChange (value) {
            this.dayPrice = value
            let setSearchMapValue_dayPriceValue = ( minPriceDay, maxPriceDay ) => {         // 更改价格检索区间( 日价格 )
                this.$store.dispatch({
                    type: 'setSearchMapValue_dayPriceValue'
                    ,priceDayMin: minPriceDay
                    ,priceDayMax: maxPriceDay
                })
            }
            if( value < 3 ){                                                                // 更改检索值
                setSearchMapValue_dayPriceValue( '0', '' )
            }else if( value == 3 ) {
                setSearchMapValue_dayPriceValue( '0', '3' )
            }else if( value == 4 ) {
                setSearchMapValue_dayPriceValue( '3', '5' )
            }else if( value == 5 ) {
                setSearchMapValue_dayPriceValue( '5', '8' )
            }else if( value == 6 ) {
                setSearchMapValue_dayPriceValue( '8', '10' )
            }else{
                setSearchMapValue_dayPriceValue( '10', '' )
            }
        }
        ,monthPriceChange (value) {
            this.monthPrice = value
            let setSearchMapValue_monthPriceValue = ( minPriceMonth, maxPriceMonth ) => {   // 更改价格检索区间( 月价格 )
                this.$store.dispatch({
                    type: 'setSearchMapValue_monthPriceValue'
                    ,priceMonthMin: minPriceMonth
                    ,priceMonthMax: maxPriceMonth
                })
            }
            if( value < 3 ){                                                                // 更改检索值
                setSearchMapValue_monthPriceValue( '0', '' )
            }else if( value == 3 ) {
                setSearchMapValue_monthPriceValue( '0', '5000' )
            }else if( value == 4 ) {
                setSearchMapValue_monthPriceValue( '5000', '15000' )
            }else if( value == 5 ) {
                setSearchMapValue_monthPriceValue( '15000', '30000' )
            }else if( value == 6 ) {
                setSearchMapValue_monthPriceValue( '30000', '50000' )
            }else{
                setSearchMapValue_monthPriceValue( '50000', '' )
            }
        }
        ,decorationChange (value) {
            this.decoration = value
            let setSearchMapValue_decorationValue = ( decorationValue ) => {                // 更改装修级别
                this.$store.dispatch({
                    type: 'setSearchMapValue_decorationValue'
                    ,decoration: decorationValue
                })
            }
            if( value < 3 ){                                                                // 更改检索值
                setSearchMapValue_decorationValue( '' )
            }else if( value == 3 ) {
                setSearchMapValue_decorationValue( '豪装' )
            }else if( value == 4 ) {
                setSearchMapValue_decorationValue( '精装' )
            }else if( value == 5 ) {
                setSearchMapValue_decorationValue( '简装' )
            }else{
                setSearchMapValue_decorationValue( '毛坯' )
            }
        }
        // 目的: 获取行政区数据
        ,setRegionPointList() {
            this.$store.dispatch({
                type: 'setRegionPointList',
                cityCode: this.$store.state.city.cityCode                                   // 查询当前城市 —— 行政区数据
            })
        }
    }
    ,computed: mapGetters({
        getSearchRequest: 'getSearchRequest'
    })
    ,watch: {
        // 如果 question 发生改变，这个函数就会运行
        getSearchRequest: function () {
            // 还要保留层级级别状态 用于请求( 已层级等级为先, 然后判断类型 )
            let indexLevel = this.$store.state.searchValue.indexLevel
                ,btypeState = this.$store.state.searchValue.btype
            if ( btypeState == 'A' ) {
                console.log(' 检索写字楼全部条件 ')
                // console.log(indexLevel)     // 测试当前层级
            }else{
                console.log(' 检索联合办公全部条件 ')
                // console.log(indexLevel)     // 测试当前层级
            }
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
