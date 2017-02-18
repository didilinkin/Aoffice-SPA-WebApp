// Getters 接收 store 的 state 作为第一个参数
export const Loading                    =   state   => state.loadingState
export const bannerImg_Arr              =   state   => state.bannerImg_Arr
export const hotBuildingList_Arr        =   state   => state.hotBuildingList_Arr
// 全局 - '锁' 状态管理
export const getHouseResourceDrawer     =   state   => state.globalToggle.houseResourceRightDrawer  // '房源' 页 - 右侧 抽屉锁状态
// 后期将modules 分出
export const furnitureInfo              =   state   => state.furnitureInfo                          // 家具 详情页 信息内容
export const researchInfo               =   state   => state.researchInfo                           // 外出 详情页 信息内容
export const getCoWorkingInfo           =   state   => state.coWorking                              // 联合办公
export const getOfficeBuildingInfo      =   state   => state.officeBuilding                         // 联合办公
export const getHotBuildingArr          =   state   => state.hotBuildingArr                         // '热门房源'   - 改变数组时, 修改计数值
export const getRequestNum              =   state   => state.map.mapState.requestNum                // '地图' - 发起检索请求 - 次数
export const getResultNum               =   state   => state.map.mapState.resultNum                 // '地图' - 返回结果 - 次数
export const getOpenMapNum              =   state   => state.map.mapState.openMapNum                // '地图' - 打开View - 次数
export const getResultArr               =   state   => state.map.resultArr                          // '地图' - 返回的结果数组
export const getChangeZoomNumArr        =   state   => state.map.mapState.changeZoomNum             // '地图' - 改变层级状态数组
