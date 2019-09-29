/**
 * @author 王晓冬
 * @description companyInitService
 * @date 2018/11/26
 * @host
 */

import {Api} from 'see-web-basic'
let baseURL = window.g.ApiUrl

export default {
  initCompany (params) {
    return Api.post(baseURL.companyInitService + '/company/init', params)
  }
}
