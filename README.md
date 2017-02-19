# A+office-SPA-WebApp

> 本页面需要在服务器环境下访问( 可使用 `yarn run dev` 预览 ), 勿直接浏览静态页面

### 使用技术:
| 技术名称                                                      | 作用           |  版本  |
| --------                                                      | -----:         | :----:  |
| [Vuejs](http://cn.vuejs.org/)                                 | 框架            |   2.1.10     |
| Vuex                                                          | 状态管理        |   2.1.1   |
| Vue-router                                                    | 路由管理        |  2.1.3  |
| Axios                                                         | 交互处理        |  0.15.3  |
| Sass                                                          | 样式预处理器     |  4.1.1  |
| Webpack                                                       | 模块打包         |  1.13.2  |
| Gulp                                                          | 自动构建工具     |  3.9.1  |
| Babel                                                         | ES6转译ES5      |  6.0.0  |
| Yarn                                                          | 模块依赖安装     |  0.17.6  |
| [Muse UI](https://museui.github.io/#/index)                   | UI框架          |  2.0.0-rc.5  |
| [Pug](https://pugjs.org/zh-cn/api/getting-started.html)       | Node模版语言    |  2.0.0-beta11  |

## Build Setup / 开发流程

``` bash
# install dependencies/拉取项目,在项目路径下执行
# 国内环境建议使用cnpm install
npm install
cnpm install

# *推荐Yarn
yarn install

# serve with hot reload at localhost:8080
# npm安装依赖后,运行node服务器,打开 localhost:80 预览 (已运行热更新功能)
yarn run dev
npm run dev

# build for production with minification
# 当修改代码后,需要手动打包发布时,运行npm run build命令进行打包
yarn run build
npm run build
```
## API docs / 接口文档

### [Map地图接口](./docs/API.md)

## Components Structure / 组件结构说明:

```bash
App.vue ( 根节点 )
    |
    |- Discover.vue                         ( "发现" )
        |
        |- DiscoverAppBar.vue               ( "发现" AppBar独有组件 )
        |
        |- Swiper.vue                       ( Banner轮播组件 )
        |
        |- EnterpriseService.vue            ( "企业服务"组件 )
            |
            |- Title.vue                    ( 通用标题组件 —— "企业服务" )
            |
            |- EnterpriseService_box        ( 通用 "企业服务"组件 —— 内容盒子 )
        |
        |- Title.vue                        ( 通用标题组件 —— "热门房源" )
        |
        |- BuildingList.vue                 ( 通用楼盘组件 —— "热门房源" )
            |
            |- BuildingList_details.vue     ( 通用楼盘组件 —— "细节展示" )
    |
    |- HouseResource.vue                    ( "房源" )
        |
        |- Auto_AppBar.vue                  ( 通用组件 —— AppBar )
        |
        |- Building_Tabs.vue                ( "房源" 切换Tabs )
        |
        |- BuildingList.vue                 ( 通用楼盘组件 —— "全部房源" )
            |
            |- BuildingList_details.vue     ( 通用楼盘组件 —— "细节展示" )
    |
    |- Map.vue                              ( "地图" )
    |
    |- Service.vue                          ( "服务" )
        |
        |- Service_router.vue               ( "服务" - 路由页面 )
            |
            |- FindProperties.vue           ( 条件渲染: "委托找房" )
            |
            |- PutInProperties.vue          ( 条件渲染："投放房源" )
            |
            |- Furniture.vue                ( 条件渲染："办公家具" )
            |
            |- Decoration.vue               ( 条件渲染："办公装修" )
            |
            |- Research.vue                 ( 条件渲染："外出考察" )
            |
            |- Training.vue                 ( 条件渲染："员工培训" —— 静态页 )
            |
            |- Computer.vue                 ( 条件渲染："办公电脑" —— 静态页 )
    |
    |- 404.vue                              ( "404" )
```

- [ ] **Aoffice-SPA-WebApp-Vue待完成内容**
    - [x] 家具详情 - 接口数据
    - [ ] 外出考察详情 - 接口数据
    - [ ] 关于艾迦办公 详情页面
    - [x] 办公电脑 - 内容图片修改( 静态页 )
    - [x] 员工培训( 静态页面 )
    - [ ] 委托找房( 表单提交 )
    - [ ] 后期将modules 分出
    - [ ] 根据静态View需求,将改好的内容 合并起来
    - [ ] 房源详情页的JSON数据需要增加List列表图片Url
    - [ ] 房源详情页 '查看更多'按钮功能 无限期延后 ( 没必要做... )
    - [ ] 房源详情页,待售房源的价格如果为空,样式怎么处理?( 能否避免删除这个数据节点? 否则会造成样式上下不对齐 )
    - [ ] 房源详情页, 列表图片如果为空: 不要返回null,而要返回 "" 空字符串; 否则无法判断
    - [ ] 房源详情页 地图禁止放大( 双击 )
    - [ ] 首页 state结构 和 绑定需要优化( 调整mutations.js )
    - [ ] HTML 房源详情页 特殊接口地址
    - [ ] 房源详情页 list列表如果为空,添加隐藏状态
    - [ ] 房源详情页 当交互完成时再执行高度修正事件( 不要使用计时器判断 )
    - [ ] 将地图的初次渲染事件合并到触发事件当中
- [ ] **Aoffice-SPA-WebApp-Vue性能优化**
    - [ ] 可复用组件改为`render`组件形式
    - [ ] 优化项目结构列表
    - [ ] 将当前城市的信息存放到store当中( 城市代码; 坐标点 )
    - [ ] 提出`content--box`盒子作为通用内容盒子,减少样式描述
    - [ ] 整理`Sass`样式表内容,删除多余代码
    - [ ] 减少HTML内容重复描述样式
    - [ ] 增加`Gulp`构建流,优化静态图片( 进行无损压缩,避免资源加载过慢问题 )
    - [ ] 测试Router动态加载组件方案,如果性能优于单一JS加载速度,那么全部拆为动态加载
    - [x] 增加Router切换动画,避免加载延迟空白
    - [x] 使用H5的history改善ajax列表请求体验
    - [ ] 使用全局混合Mixins减少代码量
    - [ ] 优化Vuex的state结构; 分模块存放状态数据
    - [ ] 后台返回当前城市的中心坐标点或者字符串城市名称,然后放置到state当中储存。 在'地图'页面内进行渲染中心点
    - [ ] 想办法将地图渲染事件设为全局事件, 避免每次更改检索条件都要重新刷新页面
    - [ ] '地图' 模块的状态管理必须在`$store`中管理( 跨组件操作 ), 但是需要优化`actions`模块
***

## 命名约定
> Vue文件

1. 组件名称开头需大写
2. 组件引用名称开头需大写
3. 路由页面首字母需小写

***

> Sass文件( 禁止使用CSS文件编写样式 )

1. 颜色值需大写 ( 例子'#FFF' )
2. 类名需严格遵循BEM命名法
3. 减少使用驼峰命名( 引用混合 / 继承方法除外 )

***

> JS文件

1. 变量名 / 方法名 开头需小写
2. 使用驼峰命名法( 避免使用 破折号 / 下划线 连接两个单词 )

