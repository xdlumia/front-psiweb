/**
 * @author 吴森
 * @description  see-extern-service 的url
 * @date 2018/7/10
 * @host 9024
 */

import { Api } from 'see-web-basic'
let baseURL = window.g.ApiUrl

export default {
  /**
     * @description  获取oss凭证信息
     */

  getOssTicket () {
    return Api.get(baseURL.seeExternService + '/oss/getOssTicket')
  }

}
