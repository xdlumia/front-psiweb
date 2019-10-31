/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-31 15:09:53
 * @Description: file content
 */
import axios from 'axios'
import { apiConfig } from 'see-web-basic'
// import seeHouseConfigService from './seeHouseConfigService'
import seePumaidongService from './seePumaidongService'
import seeContractService from './seeContractService.js' //
import seePsiCommonService from './seePsiCommonService.js' //
import seeGoodsService from './seeGoodsService.js' //

axios.defaults.timeout = 200000

apiConfig.registry({
  // systemService,
//   seeHouseConfigService
  seeContractService,
  seeGoodsService
})

// 新的api使用方法
apiConfig.registryConfig({
  seePumaidongService,
  seePsiCommonService
})
