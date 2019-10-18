import axios from 'axios'
import { apiConfig } from 'see-web-basic'
import seeExternService from './seeExternService.js' // 维护管理
import seeHouseConfigService from './seeHouseConfigService'
import seePumaidongService from './seePumaidongService'

axios.defaults.timeout = 200000

apiConfig.registry({
  // systemService,
  seeExternService,
  seeHouseConfigService
})

// 新的api使用方法
apiConfig.registryConfig({
  seePumaidongService
})
