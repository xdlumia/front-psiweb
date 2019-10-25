/*
 * @Author: web.王晓冬
 * @Date: 2019-10-18 09:36:32
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-24 19:04:51
 * @Description: file content
 */
import axios from 'axios'
import { apiConfig } from 'see-web-basic'
// import seeHouseConfigService from './seeHouseConfigService'
import seePumaidongService from './seePumaidongService'

axios.defaults.timeout = 200000

apiConfig.registry({
  // systemService,
//   seeHouseConfigService
})

// 新的api使用方法
apiConfig.registryConfig({
  seePumaidongService
})
