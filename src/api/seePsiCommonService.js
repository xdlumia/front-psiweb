/*
 * @Author: web.王晓冬
 * @Date: 2019-11-04 16:01:39
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-11-04 17:59:18
 * @Description: file content
 */
const MOCK_ADDRESS = '/mock/5db9778bbc54fc3da273f010/'
const IS_MOCK = false
export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============附件表start=========== */
  // 删除
  commonaccessoryrecordDelete: {
    'url': '/commonaccessoryrecord/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonaccessoryrecordInfo: {
    'url': '/commonaccessoryrecord/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonaccessoryrecordList: {
    'url': '/commonaccessoryrecord/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonaccessoryrecordLogicDelete: {
    'url': '/commonaccessoryrecord/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonaccessoryrecordSave: {
    'url': '/commonaccessoryrecord/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonaccessoryrecordUpdate: {
    'url': '/commonaccessoryrecord/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============附件表end=========== */

  /* =============销售和采购调价单start=========== */
  // 删除
  commonadjustpriceDelete: {
    'url': '/commonadjustprice/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonadjustpriceInfo: {
    'url': '/commonadjustprice/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonadjustpriceList: {
    'url': '/commonadjustprice/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonadjustpriceLogicDelete: {
    'url': '/commonadjustprice/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonadjustpriceSave: {
    'url': '/commonadjustprice/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonadjustpriceUpdate: {
    'url': '/commonadjustprice/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============销售和采购调价单end=========== */

  /* =============商品调价明细表start=========== */
  // 删除
  commonadjustpricedetailedDelete: {
    'url': '/commonadjustpricedetailed/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonadjustpricedetailedInfo: {
    'url': '/commonadjustpricedetailed/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonadjustpricedetailedList: {
    'url': '/commonadjustpricedetailed/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonadjustpricedetailedLogicDelete: {
    'url': '/commonadjustpricedetailed/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonadjustpricedetailedSave: {
    'url': '/commonadjustpricedetailed/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonadjustpricedetailedUpdate: {
    'url': '/commonadjustpricedetailed/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============商品调价明细表end=========== */

  /* =============客户start=========== */
  // 删除
  commonclientinfoDelete: {
    'url': '/commonclientinfo/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看客户详细信息
  commonclientinfoInfo: {
    'url': '/commonclientinfo/info/{id}',
    'mock': IS_MOCK
  },
  /* =============客户end=========== */

  /* =============客户信息表start=========== */
  // 获取列表
  commonclientinfoList: {
    'url': '/commonclientinfo/list',
    'mock': IS_MOCK
  },
  /* =============客户信息表end=========== */

  /* =============客户start=========== */
  // 逻辑删除
  commonclientinfoLogicDelete: {
    'url': '/commonclientinfo/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 获取客户列表
  commonclientinfoPagelist: {
    'url': '/commonclientinfo/pagelist',
    'mock': IS_MOCK
  },

  // 普通查询
  commonclientinfoQueryList: {
    'url': '/commonclientinfo/queryList',
    'mock': IS_MOCK
  },

  // 保存客户
  commonclientinfoSave: {
    'url': '/commonclientinfo/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改客户
  commonclientinfoUpdate: {
    'url': '/commonclientinfo/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============客户end=========== */

  /* =============商品信息表start=========== */
  // 查看详细信息
  commoncommodityinfoInfo: {
    'url': '/commoncommodityinfo/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commoncommodityinfoList: {
    'url': '/commoncommodityinfo/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commoncommodityinfoLogicDelete: {
    'url': '/commoncommodityinfo/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commoncommodityinfoSave: {
    'url': '/commoncommodityinfo/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commoncommodityinfoUpdate: {
    'url': '/commoncommodityinfo/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============商品信息表end=========== */

  /* =============商品分类表start=========== */
  // 删除
  commoncommoditysortDelete: {
    'url': '/commoncommoditysort/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncommoditysortInfo: {
    'url': '/commoncommoditysort/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commoncommoditysortList: {
    'url': '/commoncommoditysort/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commoncommoditysortLogicDelete: {
    'url': '/commoncommoditysort/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commoncommoditysortSave: {
    'url': '/commoncommoditysort/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 置顶
  commoncommoditysortStick: {
    'url': '/commoncommoditysort/stick',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commoncommoditysortUpdate: {
    'url': '/commoncommoditysort/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============商品分类表end=========== */

  /* =============公司设置表start=========== */
  // 删除
  commoncorporationDelete: {
    'url': '/commoncorporation/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncorporationInfo: {
    'url': '/commoncorporation/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commoncorporationList: {
    'url': '/commoncorporation/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commoncorporationLogicDelete: {
    'url': '/commoncorporation/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commoncorporationSave: {
    'url': '/commoncorporation/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commoncorporationUpdate: {
    'url': '/commoncorporation/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============公司设置表end=========== */

  /* =============公司账户设置表start=========== */
  // 删除
  commoncorporationaccountDelete: {
    'url': '/commoncorporationaccount/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncorporationaccountInfo: {
    'url': '/commoncorporationaccount/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commoncorporationaccountList: {
    'url': '/commoncorporationaccount/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commoncorporationaccountLogicDelete: {
    'url': '/commoncorporationaccount/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commoncorporationaccountSave: {
    'url': '/commoncorporationaccount/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commoncorporationaccountUpdate: {
    'url': '/commoncorporationaccount/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============公司账户设置表end=========== */

  /* =============促销管理表start=========== */
  // 删除
  commonpromotionDelete: {
    'url': '/commonpromotion/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotionInfo: {
    'url': '/commonpromotion/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonpromotionList: {
    'url': '/commonpromotion/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonpromotionLogicDelete: {
    'url': '/commonpromotion/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonpromotionSave: {
    'url': '/commonpromotion/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonpromotionUpdate: {
    'url': '/commonpromotion/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============促销管理表end=========== */

  /* =============促销管理参与商品详细表start=========== */
  // 删除
  commonpromotioncommoditydetailsDelete: {
    'url': '/commonpromotioncommoditydetails/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotioncommoditydetailsInfo: {
    'url': '/commonpromotioncommoditydetails/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonpromotioncommoditydetailsList: {
    'url': '/commonpromotioncommoditydetails/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonpromotioncommoditydetailsLogicDelete: {
    'url': '/commonpromotioncommoditydetails/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonpromotioncommoditydetailsSave: {
    'url': '/commonpromotioncommoditydetails/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonpromotioncommoditydetailsUpdate: {
    'url': '/commonpromotioncommoditydetails/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============促销管理参与商品详细表end=========== */

  /* =============目标管理start=========== */
  // 删除
  commonpromotiongoalDelete: {
    'url': '/commonpromotiongoal/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotiongoalInfo: {
    'url': '/commonpromotiongoal/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonpromotiongoalList: {
    'url': '/commonpromotiongoal/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonpromotiongoalLogicDelete: {
    'url': '/commonpromotiongoal/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonpromotiongoalSave: {
    'url': '/commonpromotiongoal/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonpromotiongoalUpdate: {
    'url': '/commonpromotiongoal/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============目标管理end=========== */

  /* =============目标管理参与人详细表start=========== */
  // 删除
  commonpromotiongoalpersonnelDelete: {
    'url': '/commonpromotiongoalpersonnel/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotiongoalpersonnelInfo: {
    'url': '/commonpromotiongoalpersonnel/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonpromotiongoalpersonnelList: {
    'url': '/commonpromotiongoalpersonnel/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonpromotiongoalpersonnelLogicDelete: {
    'url': '/commonpromotiongoalpersonnel/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonpromotiongoalpersonnelSave: {
    'url': '/commonpromotiongoalpersonnel/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonpromotiongoalpersonnelUpdate: {
    'url': '/commonpromotiongoalpersonnel/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============目标管理参与人详细表end=========== */

  /* =============促销管理参与人详细表start=========== */
  // 删除
  commonpromotionpersonnelDelete: {
    'url': '/commonpromotionpersonnel/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotionpersonnelInfo: {
    'url': '/commonpromotionpersonnel/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonpromotionpersonnelList: {
    'url': '/commonpromotionpersonnel/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonpromotionpersonnelLogicDelete: {
    'url': '/commonpromotionpersonnel/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonpromotionpersonnelSave: {
    'url': '/commonpromotionpersonnel/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonpromotionpersonnelUpdate: {
    'url': '/commonpromotionpersonnel/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============促销管理参与人详细表end=========== */

  /* =============报价配置单start=========== */
  // 删除
  commonquotationconfigDelete: {
    'url': '/commonquotationconfig/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonquotationconfigInfo: {
    'url': '/commonquotationconfig/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonquotationconfigList: {
    'url': '/commonquotationconfig/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonquotationconfigLogicDelete: {
    'url': '/commonquotationconfig/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonquotationconfigSave: {
    'url': '/commonquotationconfig/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonquotationconfigUpdate: {
    'url': '/commonquotationconfig/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============报价配置单end=========== */

  /* =============报价配置单详情表start=========== */
  // 删除
  commonquotationconfigdetailsDelete: {
    'url': '/commonquotationconfigdetails/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonquotationconfigdetailsInfo: {
    'url': '/commonquotationconfigdetails/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonquotationconfigdetailsList: {
    'url': '/commonquotationconfigdetails/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonquotationconfigdetailsLogicDelete: {
    'url': '/commonquotationconfigdetails/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonquotationconfigdetailsSave: {
    'url': '/commonquotationconfigdetails/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonquotationconfigdetailsUpdate: {
    'url': '/commonquotationconfigdetails/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============报价配置单详情表end=========== */

  /* =============服务商start=========== */
  // 删除
  commonserviceproviderDelete: {
    'url': '/commonserviceprovider/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonserviceproviderInfo: {
    'url': '/commonserviceprovider/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonserviceproviderList: {
    'url': '/commonserviceprovider/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonserviceproviderLogicDelete: {
    'url': '/commonserviceprovider/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonserviceproviderSave: {
    'url': '/commonserviceprovider/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonserviceproviderUpdate: {
    'url': '/commonserviceprovider/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============服务商end=========== */

  /* =============供应商供应商品表start=========== */
  // 删除
  commonsuppliercommodityDelete: {
    'url': '/commonsuppliercommodity/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonsuppliercommodityInfo: {
    'url': '/commonsuppliercommodity/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonsuppliercommodityList: {
    'url': '/commonsuppliercommodity/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonsuppliercommodityLogicDelete: {
    'url': '/commonsuppliercommodity/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonsuppliercommoditySave: {
    'url': '/commonsuppliercommodity/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonsuppliercommodityUpdate: {
    'url': '/commonsuppliercommodity/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============供应商供应商品表end=========== */

  /* =============供应商信息表start=========== */
  // 删除
  commonsupplierinfoDelete: {
    'url': '/commonsupplierinfo/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonsupplierinfoInfo: {
    'url': '/commonsupplierinfo/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonsupplierinfoList: {
    'url': '/commonsupplierinfo/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonsupplierinfoLogicDelete: {
    'url': '/commonsupplierinfo/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 分页获取列表
  commonsupplierinfoPagelist: {
    'url': '/commonsupplierinfo/pagelist',
    'mock': IS_MOCK
  },

  // 商品供应分类查询
  commonsupplierinfoQueryList: {
    'url': '/commonsupplierinfo/queryList',
    'mock': IS_MOCK
  },

  // 保存
  commonsupplierinfoSave: {
    'url': '/commonsupplierinfo/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonsupplierinfoUpdate: {
    'url': '/commonsupplierinfo/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============供应商信息表end=========== */

  /* =============业务设置配置表start=========== */
  // 根据类型查看配置信息(1-销售,2-库房,3-财务)
  commonsystemconfigInfo: {
    'url': '/commonsystemconfig/info/{configType}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonsystemconfigList: {
    'url': '/commonsystemconfig/list',
    'mock': IS_MOCK
  },

  // 保存
  commonsystemconfigSave: {
    'url': '/commonsystemconfig/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============业务设置配置表end=========== */

  /* =============业务设置报表配置表start=========== */
  // 删除
  commonsystemreportDelete: {
    'url': '/commonsystemreport/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  commonsystemreportInfo: {
    'url': '/commonsystemreport/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表
  commonsystemreportList: {
    'url': '/commonsystemreport/list',
    'mock': IS_MOCK
  },

  // 逻辑删除
  commonsystemreportLogicDelete: {
    'url': '/commonsystemreport/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存
  commonsystemreportSave: {
    'url': '/commonsystemreport/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  commonsystemreportUpdate: {
    'url': '/commonsystemreport/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============业务设置报表配置表end=========== */

  /* =============自定义列表start=========== */
  // 删除
  customcolumnDelete: {
    'url': '/customcolumn/delete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 获取列表--不分页
  customcolumnGetListAll: {
    'url': '/customcolumn/getListAll',
    'mock': IS_MOCK
  },

  // 查看详细信息
  customcolumnInfo: {
    'url': '/customcolumn/info/{id}',
    'mock': IS_MOCK
  },

  // 获取列表--分页
  customcolumnList: {
    'url': '/customcolumn/list',
    'mock': IS_MOCK
  },

  // 保存
  customcolumnSave: {
    'url': '/customcolumn/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改
  customcolumnUpdate: {
    'url': '/customcolumn/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============自定义列表end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': IS_MOCK,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============服务健康检查start=========== */
  // 检查服务健康状况
  healthCheck: {
    'url': '/ws/health/check',
    'mock': IS_MOCK
  },
  /* =============服务健康检查end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': IS_MOCK
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}
