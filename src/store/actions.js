import Vue from 'vue'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
import * as types from './mutations'

export const addState = ({commit}) => {
    axios.post('./static/data.json', {
        // code: ''
    })
    .then(function (response) {
        let get_data = response.data
        commit('addState',get_data)
    })
    .catch(function (error) {
        console.log(error);
    });
}

// 后期将modules 分出
export const getFurnitureInfo = ({commit}) => {
    // axios.post('./static/furnitureInfo_1.json', {
    axios.post('http://192.168.1.30:8282/aoffice_app/api/es/getInvestigate?icode=ig0001' , {
        icode: 'ig0001'
    })
    .then(function (response) {
        let get_data = response.data.resultData
        commit('addFurnitureInfo',get_data)
    })
    .catch(function (error) {
        console.log(error);
    });
}

//获得 "外出详情" - 数据
export const getResearchInfo = ({commit}) => {
    axios.post( './static/researchInfo_1.json', {                                                       // 静态json测试
        // code: 'ig0001'
    })
    .then(function (response) {
        let get_ResearchInfoData = response.data
        console.log( 'res属性:' + response.data.resultData )
        console.dir( response.data.resultData )
        // commit('addResearchInfo',get_ResearchInfoData)
    })
    .catch(function (error) {
        console.log(error);
    });
}

