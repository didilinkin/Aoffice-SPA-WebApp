# API接口文档

### Map / 地图( 行政区 )
> 接口URL: [http://app.aplusoffice.cn/api/map/getRegionPointList](http://app.aplusoffice.cn/api/map/getRegionPointList)

| 参数名            | 数据类型           |   描述                                 |  不可为空  |
| --------         | -----:             |   ----:                                | :----:  |
| cityCode         | String             |   城市编码(青岛:3702)                   | **true**  |
| bType            | String             |   类型(A:写字楼; B:联合办公)             |           |
| areaMin          | String             |   面积最小值, 最小为0                    |           |
| areaMax          | String             |   面积最大值, 可为空                     |           |
| priceMonthMin    | String             |   价位按月最小值, 最小为0                |           |
| priceMonthMax    | String             |   价位按月最大值, 可为空                 |           |
| priceDayMin      | String             |   价位按天最小值, 最小为0                |           |
| priceDayMax      | String             |   价位按天最大值, 可为空                 |           |
| decoration       | String             |   装修(A:豪装; B:精装; C:简装; D:毛坯)   |           |

### Map / 地图( 商圈 )
> 接口URL: [http://app.aplusoffice.cn/api/map/getBCPointList](http://app.aplusoffice.cn/api/map/getBCPointList)

| 参数名                 | 数据类型           |   描述                                 |  不可为空  |
| --------              | -----:             |   ----:                                | :----:  |
| cityCode              | String             |   城市编码(青岛:3702)                   | **true**  |
| regionCode            | String             |   行政区编码                          |           |
| bType                 | String             |   类型(A:写字楼; B:联合办公)             |           |
| areaMin               | String             |   面积最小值, 最小为0                    |           |
| areaMax               | String             |   面积最大值, 可为空                     |           |
| priceMonthMin         | String             |   价位按月最小值, 最小为0                |           |
| priceMonthMax         | String             |   价位按月最大值, 可为空                 |           |
| priceDayMin           | String             |   价位按天最小值, 最小为0                |           |
| priceDayMax           | String             |   价位按天最大值, 可为空                 |           |
| decoration            | String             |   装修(A:豪装; B:精装; C:简装; D:毛坯)   |           |

### Map / 地图( 行政区 )
> 接口URL: [http://app.aplusoffice.cn/api/map/getBuildingPointList](http://app.aplusoffice.cn/api/map/getBuildingPointList)

| 参数名                 | 数据类型           |   描述                                 |  不可为空  |
| --------              | -----:             |   ----:                                | :----:  |
| cityCode              | String             |   城市编码(青岛:3702)                   | **true**  |
| businessCircleCode    | String             |   商圈编码                             |           |
| bType                 | String             |   类型(A:写字楼; B:联合办公)             |           |
| areaMin               | String             |   面积最小值, 最小为0                    |           |
| areaMax               | String             |   面积最大值, 可为空                     |           |
| priceMonthMin         | String             |   价位按月最小值, 最小为0                |           |
| priceMonthMax         | String             |   价位按月最大值, 可为空                 |           |
| priceDayMin           | String             |   价位按天最小值, 最小为0                |           |
| priceDayMax           | String             |   价位按天最大值, 可为空                 |           |
| decoration            | String             |   装修(A:豪装; B:精装; C:简装; D:毛坯)   |           |
