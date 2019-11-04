/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-02 11:41:40
 * @Description: file content
 */
import axios from 'axios'
import { apiConfig } from 'see-web-basic'
// import seeHouseConfigService from './seeHouseConfigService'
import seePumaidongService from './seePumaidongService'
import seeContractService from './seeContractService.js' //
import seePsiCommonService from './seePsiCommonService.js' //
import seeBaseinfoService from './seeBaseInfoService.js' //
import seeGoodsService from './seeGoodsService.js' //
import seePsiContractService from './seePsiContractService' //
import seePsiPurchaseService from './seePsiPurchaseService' //
import seePsiWmsService from './seePsiWmsService' //

axios.defaults.timeout = 200000

apiConfig.registry({
  // systemService,
//   seeHouseConfigService
  seeContractService,
  seeGoodsService
})

// 新的api使用方法
apiConfig.registryConfig({
  seeBaseinfoService,
  seePumaidongService,
  seePsiCommonService,
  seePsiContractService,
  seePsiPurchaseService,
  seePsiWmsService
})
