/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 16:59:17
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
import seePsiSaleService from './seePsiSaleService' //

// const indexFiles = require.context(`./`, false, /.js$/)
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
  seePsiWmsService,
  seePsiPurchaseService,
  seePsiSaleService,
})
