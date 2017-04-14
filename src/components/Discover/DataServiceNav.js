/* global require: true */
const dataServiceNav = {
    'title': {
        title: '企业服务',
        backgroundColor: '#FFF'
    },
    'iconBtn': [
        {
            iconImg: require( '../../assets/images/furniture.png' ),
            title: '办公家具',
            serviceUrl: 'furniture'
        }, {
            iconImg: require( '../../assets/images/brush.png' ),
            title: '办公装修',
            serviceUrl: 'decoration'
        }, {
            iconImg: require( '../../assets/images/pen.png' ),
            title: '外出考察',
            serviceUrl: 'research'
        }, {
            iconImg: require( '../../assets/images/people.png' ),
            title: '员工培训',
            serviceUrl: 'training'
        }, {
            iconImg: require( '../../assets/images/computer.png' ),
            title: '办公电脑',
            serviceUrl: 'computer'
        }
    ],
    'toFormBtn': [
        {
            iconImg: require( '../../assets/images/ico_entrust.png' ),
            title: '委托找房',
            subTitle: '快速找到心仪办公室',
            serviceUrl: 'findProperties'
        }, {
            iconImg: require( '../../assets/images/ico_put_in.png' ),
            title: '投放房源',
            subTitle: '为您快速出租闲置房源',
            serviceUrl: 'putInProperties'
        }
    ]
}

export { dataServiceNav }