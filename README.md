# A+office-SPA-WebApp

> 本页面需要在服务器环境下访问( 可使用 `yarn run dev` 预览 ), 勿直接浏览静态页面

### 使用技术:
| 技术名称                                                      | 作用           |  版本  |
| --------                                                      | -----:         | :----:  |
| [Vuejs](http://cn.vuejs.org/)                                 | 框架            |   2.2.6     |
| Vuex                                                          | 状态管理        |   2.2.1   |
| Vue-router                                                    | 路由管理        |  2.3.1  |
| Axios                                                         | 交互处理        |  0.16.0  |
| Sass                                                          | 样式预处理器     |  4.5.2  |
| Webpack                                                       | 模块打包         |  2.2.1  |
| Gulp                                                          | 自动构建工具     |  3.9.1  |
| Babel                                                         | ES6转译ES5      |  6.22.1  |
| Yarn                                                          | 模块依赖安装     |  0.20.3  |
| [Muse UI](https://museui.github.io/#/index)                   | UI框架          |  2.0.1  |
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

# 打包生产模式,缩小压缩包 -- 查看包分析报告
npm run build --report
```
## API docs / 接口文档

### [Map地图接口](./docs/API.md)

## **ToDoList**
- [ ]  `Mockjs` 测试模拟数据
- [ ]  `hotcss` 替换 手淘方案
- [ ]  测试`Nuxt` - `SSR`方案