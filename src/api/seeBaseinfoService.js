/**
 * @author 王晓冬
 * @description seeBaseinfoService的url
 * @date 2019/5/31
 * @host 8301
 */


export default {
    /**
     * @description  企业设置
     */
    // 保存logo
    saveCompanyLogo: {
      url: '/logo/editCompanyLogo',
      methods: 'post'
    },
    // 获取用户权限
    getCompanyLogo: {
      url: '/logo/getCompanyLogo/{sysCode}',
    },
  }
//   import {Api} from 'see-web-basic'
// let baseURL = window.g.ApiUrl

// export default {
//   /**
//    * @description 数据记录
//    */

//   getLogList(params){
//     return Api.get(baseURL.seeBaseinfoService + '/logo/editCompanyLogo', params)
//   },
//   getLogList(params){
//     return Api.get(baseURL.saveCompanyLogo + '/logo/editCompanyLogo', params)
//   }

// }
