/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-30 19:53:17
 * @Description: file content
 */
import axios from 'axios'
import { apiConfig } from 'see-web-basic'
// import seeHouseConfigService from './seeHouseConfigService'
import seePumaidongService from './seePumaidongService'
import seeContractService from './seeContractService.js' //
import seePsiCommonService from './seePsiCommonService.js' //

axios.defaults.timeout = 200000

apiConfig.registry({
  // systemService,
//   seeHouseConfigService
  seeContractService
})

// 新的api使用方法
apiConfig.registryConfig({
  seePumaidongService,
  seePsiCommonService
})
