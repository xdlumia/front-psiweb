/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 17:34:18
 * @Description: file content
 */
import axios from 'axios'
import { apiConfig } from 'see-web-basic'
// import seeHouseConfigService from './seeHouseConfigService'
// import seePumaidongService from './seePumaidongService'
// import seeContractService from './seeContractService.js' //
// import seePsiCommonService from './seePsiCommonService.js' //
// import seeBaseinfoService from './seeBaseInfoService.js' //
// import seeGoodsService from './seeGoodsService.js' //
// import seePsiContractService from './seePsiContractService' //
// import seePsiPurchaseService from './seePsiPurchaseService' //
// import seePsiWmsService from './seePsiWmsService' //
// import seePsiSaleService from './seePsiSaleService' //
axios.defaults.timeout = 200000

const apiFiles = require.context(`./`, false, /.js$/)

let oldRegistry = {}
let newRegistry = {}
apiFiles.keys().forEach(item => {
  if (item !== './index.js') {
    let key = item.split(/[.\/.]/).slice(-2)[0]
    if (item.match(/^\.\/(seeContractService|seeGoodsService|seeExternService)/)) {
      oldRegistry[key] = apiFiles(item).default

    } else {
      newRegistry[key] = apiFiles(item).default
    }
  }

})
// 旧的api使用方法
apiConfig.registry(oldRegistry)
// 新的api使用方法
apiConfig.registryConfig(newRegistry)
