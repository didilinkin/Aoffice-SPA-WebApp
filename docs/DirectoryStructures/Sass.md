# Sass Directory Structures / Sass 目录结构

```bash
Sass/
  |
  |- Components/                        # 小组件模块
      |
      |- _Button.sass                       # 按钮样式
      |
      |- _Distance.sass                     # 全局 - 间距距离
  |
  |- Helpers/                           # Sass的工具
      |
      |- _Color.sass                        # 颜色
      |
      |- _Font.sass                         # 字体
      |
      |- _Extend.sass                       # 继承
      |
      |- _Mixins.sass                       # 混合
      |
      |- _REM.sass                          # px -> REM 转换
      |
      |- _Var.sass                          # 变量( 考虑废弃 )
  |
  |- Modules/                           # 项目模块( 有样式输出! )
      |
      |- _ModulesMixins.sass                # 模块 - 混合
  |
  |- Vendors/                           # 框架样式( 有样式输出! )
      |
      |- _MuseUi.sass                       # Muse-ui 样式
      |
      |- _Swiper.min.scss                   # Swiper轮播组件 样式
  |
  |- main.sass                          # 主Sass文件
```


# 注意事项

1. `main.sass` 引入的 全部`Sass`模块文件: 不得输出任何样式!

2. `Helpers`目录( 除`Color`, `Font`, `Var` ): 保持独立性 + 可移植性; 方便其他项目使用

3. `Helpers`目录( `Color`, `Font`, `Var` ): 属性名称 尽量保持独立性, 只需修改属性值

4. `Modules`目录: 项目样式目录( 不可移植, 项目独占样式 )

5. `Modules`内的`_ModulesMixins`: 项目样式混合; 引入到`main.sass`文件中, 全局使用; 与`Helpers`目录`Mixins`区别: 不可移植

6. `Modules`内其他模块: 有样式输出; 用于组件样式复用; 组件内最后引入权重最高;

7. `Vendors`目录: 外部库和框架的样式文件

8. `Vendors`内的`MuseUi`模块: 只在顶级组件引用( 未测试 )

# 书写约定

1. `Sass`目录内: **统一使用缩进语法**

2. 常用属性缩写风格: **驼峰**, **禁止超过3个单词**, **易记**
