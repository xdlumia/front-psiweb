const MOCK_ADDRESS = '/mock/5db9778bbc54fc3da273f010/common'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============附件表start=========== */
  // 删除
  commonaccessoryrecordDelete: {
    'url': '/commonaccessoryrecord/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonaccessoryrecordInfo: {
    'url': '/commonaccessoryrecord/info/{id}',
    'mock': false
  },

  // 获取列表
  commonaccessoryrecordList: {
    'url': '/commonaccessoryrecord/list',
    'mock': false
  },

  // 逻辑删除
  commonaccessoryrecordLogicDelete: {
    'url': '/commonaccessoryrecord/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonaccessoryrecordSave: {
    'url': '/commonaccessoryrecord/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonaccessoryrecordUpdate: {
    'url': '/commonaccessoryrecord/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============附件表end=========== */

  /* =============销售和采购调价单start=========== */
  // 审核
  commonadjustpriceApproval: {
    'url': '/commonadjustprice/approval',
    'mock': false,
    'methods': 'post'
  },

  // 撤销
  commonadjustpriceCancel: {
    'url': '/commonadjustprice/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  commonadjustpriceDelete: {
    'url': '/commonadjustprice/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonadjustpriceExport: {
    'url': '/commonadjustprice/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  commonadjustpriceInfo: {
    'url': '/commonadjustprice/info/{id}',
    'mock': false
  },

  // 查看详细信息
  commonadjustpriceInfoByCode: {
    'url': '/commonadjustprice/infoByCode/{code}',
    'mock': false
  },

  // 获取列表
  commonadjustpriceList: {
    'url': '/commonadjustprice/list',
    'mock': false
  },

  // 逻辑删除
  commonadjustpriceLogicDelete: {
    'url': '/commonadjustprice/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  commonadjustpricePassApproval: {
    'url': '/commonadjustprice/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  commonadjustpriceReject: {
    'url': '/commonadjustprice/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  commonadjustpriceSave: {
    'url': '/commonadjustprice/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  commonadjustpriceSubmitApproval: {
    'url': '/commonadjustprice/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonadjustpriceUpdate: {
    'url': '/commonadjustprice/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售和采购调价单end=========== */

  /* =============商品调价明细表start=========== */
  // 删除
  commonadjustpricedetailedDelete: {
    'url': '/commonadjustpricedetailed/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonadjustpricedetailedInfo: {
    'url': '/commonadjustpricedetailed/info/{id}',
    'mock': false
  },

  // 获取列表
  commonadjustpricedetailedList: {
    'url': '/commonadjustpricedetailed/list',
    'mock': false
  },

  // 逻辑删除
  commonadjustpricedetailedLogicDelete: {
    'url': '/commonadjustpricedetailed/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonadjustpricedetailedSave: {
    'url': '/commonadjustpricedetailed/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonadjustpricedetailedUpdate: {
    'url': '/commonadjustpricedetailed/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============商品调价明细表end=========== */

  /* =============客户start=========== */
  // 删除
  commonclientinfoDelete: {
    'url': '/commonclientinfo/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonclientinfoExport: {
    'url': '/commonclientinfo/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看客户详细信息
  commonclientinfoInfo: {
    'url': '/commonclientinfo/info/{id}',
    'mock': false
  },

  // 根据编码查看客户详细信息
  commonclientinfoInfoBycode: {
    'url': '/commonclientinfo/infoBycode/{code}',
    'mock': false
  },
  /* =============客户end=========== */

  /* =============客户信息表start=========== */
  // 获取列表
  commonclientinfoList: {
    'url': '/commonclientinfo/list',
    'mock': false
  },
  /* =============客户信息表end=========== */

  /* =============客户start=========== */
  // 逻辑删除
  commonclientinfoLogicDelete: {
    'url': '/commonclientinfo/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 获取客户列表
  commonclientinfoPagelist: {
    'url': '/commonclientinfo/pagelist',
    'mock': false
  },

  // 普通查询
  commonclientinfoQueryList: {
    'url': '/commonclientinfo/queryList',
    'mock': false
  },

  // 保存客户
  commonclientinfoSave: {
    'url': '/commonclientinfo/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改客户
  commonclientinfoUpdate: {
    'url': '/commonclientinfo/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============客户end=========== */

  /* =============商品信息表start=========== */
  // 查看详细信息
  commoncommodityinfoInfo: {
    'url': '/commoncommodityinfo/info/{id}',
    'mock': false
  },

  // 获取列表
  commoncommodityinfoList: {
    'url': '/commoncommodityinfo/list',
    'mock': false
  },

  // 逻辑删除
  commoncommodityinfoLogicDelete: {
    'url': '/commoncommodityinfo/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commoncommodityinfoSave: {
    'url': '/commoncommodityinfo/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commoncommodityinfoUpdate: {
    'url': '/commoncommodityinfo/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============商品信息表end=========== */

  /* =============商品分类表start=========== */
  // 删除
  commoncommoditysortDelete: {
    'url': '/commoncommoditysort/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncommoditysortInfo: {
    'url': '/commoncommoditysort/info/{id}',
    'mock': false
  },

  // 获取列表
  commoncommoditysortList: {
    'url': '/commoncommoditysort/list',
    'mock': false
  },

  // 逻辑删除
  commoncommoditysortLogicDelete: {
    'url': '/commoncommoditysort/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commoncommoditysortSave: {
    'url': '/commoncommoditysort/save',
    'mock': false,
    'methods': 'post'
  },

  // 置顶
  commoncommoditysortStick: {
    'url': '/commoncommoditysort/stick',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commoncommoditysortUpdate: {
    'url': '/commoncommoditysort/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============商品分类表end=========== */

  /* =============公司设置表start=========== */
  // 删除
  commoncorporationDelete: {
    'url': '/commoncorporation/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncorporationInfo: {
    'url': '/commoncorporation/info/{id}',
    'mock': false
  },

  // 获取列表
  commoncorporationList: {
    'url': '/commoncorporation/list',
    'mock': false
  },

  // 逻辑删除
  commoncorporationLogicDelete: {
    'url': '/commoncorporation/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commoncorporationSave: {
    'url': '/commoncorporation/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commoncorporationUpdate: {
    'url': '/commoncorporation/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============公司设置表end=========== */

  /* =============公司账户设置表start=========== */
  // 删除
  commoncorporationaccountDelete: {
    'url': '/commoncorporationaccount/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commoncorporationaccountInfo: {
    'url': '/commoncorporationaccount/info/{id}',
    'mock': false
  },

  // 获取列表
  commoncorporationaccountList: {
    'url': '/commoncorporationaccount/list',
    'mock': false
  },

  // 逻辑删除
  commoncorporationaccountLogicDelete: {
    'url': '/commoncorporationaccount/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commoncorporationaccountSave: {
    'url': '/commoncorporationaccount/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commoncorporationaccountUpdate: {
    'url': '/commoncorporationaccount/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============公司账户设置表end=========== */

  /* =============促销管理表start=========== */
  // 删除
  commonpromotionDelete: {
    'url': '/commonpromotion/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonpromotionExport: {
    'url': '/commonpromotion/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  commonpromotionInfo: {
    'url': '/commonpromotion/info/{id}',
    'mock': false
  },

  // 根据code详细信息
  commonpromotionInfoBycode: {
    'url': '/commonpromotion/infoBycode/{code}',
    'mock': false
  },

  // 获取列表
  commonpromotionList: {
    'url': '/commonpromotion/list',
    'mock': false
  },

  // 逻辑删除
  commonpromotionLogicDelete: {
    'url': '/commonpromotion/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonpromotionSave: {
    'url': '/commonpromotion/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonpromotionUpdate: {
    'url': '/commonpromotion/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============促销管理表end=========== */

  /* =============促销管理参与商品详细表start=========== */
  // 删除
  commonpromotioncommoditydetailsDelete: {
    'url': '/commonpromotioncommoditydetails/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotioncommoditydetailsInfo: {
    'url': '/commonpromotioncommoditydetails/info/{id}',
    'mock': false
  },

  // 获取列表
  commonpromotioncommoditydetailsList: {
    'url': '/commonpromotioncommoditydetails/list',
    'mock': false
  },

  // 逻辑删除
  commonpromotioncommoditydetailsLogicDelete: {
    'url': '/commonpromotioncommoditydetails/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonpromotioncommoditydetailsSave: {
    'url': '/commonpromotioncommoditydetails/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonpromotioncommoditydetailsUpdate: {
    'url': '/commonpromotioncommoditydetails/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============促销管理参与商品详细表end=========== */

  /* =============目标管理start=========== */
  // 删除
  commonpromotiongoalDelete: {
    'url': '/commonpromotiongoal/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonpromotiongoalExport: {
    'url': '/commonpromotiongoal/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  commonpromotiongoalInfo: {
    'url': '/commonpromotiongoal/info/{id}',
    'mock': false
  },

  // 查看详细信息
  commonpromotiongoalInfoBycode: {
    'url': '/commonpromotiongoal/infoBycode/{code}',
    'mock': false
  },

  // 获取列表
  commonpromotiongoalList: {
    'url': '/commonpromotiongoal/list',
    'mock': false
  },

  // 逻辑删除
  commonpromotiongoalLogicDelete: {
    'url': '/commonpromotiongoal/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonpromotiongoalSave: {
    'url': '/commonpromotiongoal/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonpromotiongoalUpdate: {
    'url': '/commonpromotiongoal/update',
    'mock': false,
    'methods': 'post'
  },

  // 设置默认目标
  commonpromotiongoalUpdateDefault: {
    'url': '/commonpromotiongoal/updateDefault',
    'mock': false,
    'methods': 'post'
  },
  /* =============目标管理end=========== */

  /* =============目标管理参与人详细表start=========== */
  // 删除
  commonpromotiongoalpersonnelDelete: {
    'url': '/commonpromotiongoalpersonnel/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotiongoalpersonnelInfo: {
    'url': '/commonpromotiongoalpersonnel/info/{id}',
    'mock': false
  },

  // 获取列表
  commonpromotiongoalpersonnelList: {
    'url': '/commonpromotiongoalpersonnel/list',
    'mock': false
  },

  // 逻辑删除
  commonpromotiongoalpersonnelLogicDelete: {
    'url': '/commonpromotiongoalpersonnel/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonpromotiongoalpersonnelSave: {
    'url': '/commonpromotiongoalpersonnel/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonpromotiongoalpersonnelUpdate: {
    'url': '/commonpromotiongoalpersonnel/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============目标管理参与人详细表end=========== */

  /* =============促销管理参与人详细表start=========== */
  // 删除
  commonpromotionpersonnelDelete: {
    'url': '/commonpromotionpersonnel/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonpromotionpersonnelInfo: {
    'url': '/commonpromotionpersonnel/info/{id}',
    'mock': false
  },

  // 获取列表
  commonpromotionpersonnelList: {
    'url': '/commonpromotionpersonnel/list',
    'mock': false
  },

  // 逻辑删除
  commonpromotionpersonnelLogicDelete: {
    'url': '/commonpromotionpersonnel/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonpromotionpersonnelSave: {
    'url': '/commonpromotionpersonnel/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonpromotionpersonnelUpdate: {
    'url': '/commonpromotionpersonnel/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============促销管理参与人详细表end=========== */

  /* =============报价配置单start=========== */
  // 删除
  commonquotationconfigDelete: {
    'url': '/commonquotationconfig/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonquotationconfigExport: {
    'url': '/commonquotationconfig/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  commonquotationconfigInfo: {
    'url': '/commonquotationconfig/info/{id}',
    'mock': false
  },

  // 通过编号详细信息
  commonquotationconfigInfoBycode: {
    'url': '/commonquotationconfig/infoBycode/{code}',
    'mock': false
  },

  // 查询报价配置单对应的商品信息
  commonquotationconfigInfoGood: {
    'url': '/commonquotationconfig/infoGood',
    'mock': false
  },

  // 获取列表
  commonquotationconfigList: {
    'url': '/commonquotationconfig/list',
    'mock': false
  },

  // 逻辑删除
  commonquotationconfigLogicDelete: {
    'url': '/commonquotationconfig/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonquotationconfigSave: {
    'url': '/commonquotationconfig/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonquotationconfigUpdate: {
    'url': '/commonquotationconfig/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============报价配置单end=========== */

  /* =============报价配置单详情表start=========== */
  // 删除
  commonquotationconfigdetailsDelete: {
    'url': '/commonquotationconfigdetails/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonquotationconfigdetailsInfo: {
    'url': '/commonquotationconfigdetails/info/{id}',
    'mock': false
  },

  // 获取列表
  commonquotationconfigdetailsList: {
    'url': '/commonquotationconfigdetails/list',
    'mock': false
  },

  // 获取列表
  commonquotationconfigdetailsListConfigByGoodName: {
    'url': '/commonquotationconfigdetails/listConfigByGoodName',
    'mock': false
  },

  // 逻辑删除
  commonquotationconfigdetailsLogicDelete: {
    'url': '/commonquotationconfigdetails/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonquotationconfigdetailsSave: {
    'url': '/commonquotationconfigdetails/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonquotationconfigdetailsUpdate: {
    'url': '/commonquotationconfigdetails/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============报价配置单详情表end=========== */

  /* =============服务商start=========== */
  // 删除
  commonserviceproviderDelete: {
    'url': '/commonserviceprovider/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonserviceproviderExport: {
    'url': '/commonserviceprovider/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  commonserviceproviderInfo: {
    'url': '/commonserviceprovider/info/{id}',
    'mock': false
  },

  // 根据CODE查看详细信息
  commonserviceproviderInfoBycode: {
    'url': '/commonserviceprovider/infoBycode/{code}',
    'mock': false
  },

  // 获取列表
  commonserviceproviderList: {
    'url': '/commonserviceprovider/list',
    'mock': false
  },

  // 逻辑删除
  commonserviceproviderLogicDelete: {
    'url': '/commonserviceprovider/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonserviceproviderSave: {
    'url': '/commonserviceprovider/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonserviceproviderUpdate: {
    'url': '/commonserviceprovider/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============服务商end=========== */

  /* =============供应商供应商品表start=========== */
  // 删除
  commonsuppliercommodityDelete: {
    'url': '/commonsuppliercommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonsuppliercommodityInfo: {
    'url': '/commonsuppliercommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  commonsuppliercommodityList: {
    'url': '/commonsuppliercommodity/list',
    'mock': false
  },

  // 逻辑删除
  commonsuppliercommodityLogicDelete: {
    'url': '/commonsuppliercommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonsuppliercommoditySave: {
    'url': '/commonsuppliercommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonsuppliercommodityUpdate: {
    'url': '/commonsuppliercommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============供应商供应商品表end=========== */

  /* =============供应商信息表start=========== */
  // 删除
  commonsupplierinfoDelete: {
    'url': '/commonsupplierinfo/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  commonsupplierinfoExport: {
    'url': '/commonsupplierinfo/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  commonsupplierinfoInfo: {
    'url': '/commonsupplierinfo/info/{id}',
    'mock': false
  },

  // 根据编码查看详细信息
  commonsupplierinfoInfoBycode: {
    'url': '/commonsupplierinfo/infoBycode/{code}',
    'mock': false
  },

  // 获取列表
  commonsupplierinfoList: {
    'url': '/commonsupplierinfo/list',
    'mock': false
  },

  // 逻辑删除
  commonsupplierinfoLogicDelete: {
    'url': '/commonsupplierinfo/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 分页获取列表
  commonsupplierinfoPagelist: {
    'url': '/commonsupplierinfo/pagelist',
    'mock': false
  },

  // 商品供应分类查询
  commonsupplierinfoQueryList: {
    'url': '/commonsupplierinfo/queryList',
    'mock': false
  },

  // 商品供应分类查询
  commonsupplierinfoQueryListClassification: {
    'url': '/commonsupplierinfo/queryListClassification',
    'mock': false
  },

  // 保存
  commonsupplierinfoSave: {
    'url': '/commonsupplierinfo/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonsupplierinfoUpdate: {
    'url': '/commonsupplierinfo/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============供应商信息表end=========== */

  /* =============业务设置配置表start=========== */
  // 根据类型查看配置信息(1-销售,2-库房,3-财务)
  commonsystemconfigInfo: {
    'url': '/commonsystemconfig/info/{configType}',
    'mock': false
  },

  // 获取列表
  commonsystemconfigList: {
    'url': '/commonsystemconfig/list',
    'mock': false
  },

  // 保存
  commonsystemconfigSave: {
    'url': '/commonsystemconfig/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============业务设置配置表end=========== */

  /* =============业务设置报表配置表start=========== */
  // 删除
  commonsystemreportDelete: {
    'url': '/commonsystemreport/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  commonsystemreportInfo: {
    'url': '/commonsystemreport/info/{id}',
    'mock': false
  },

  // 获取列表
  commonsystemreportList: {
    'url': '/commonsystemreport/list',
    'mock': false
  },

  // 逻辑删除
  commonsystemreportLogicDelete: {
    'url': '/commonsystemreport/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  commonsystemreportSave: {
    'url': '/commonsystemreport/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  commonsystemreportUpdate: {
    'url': '/commonsystemreport/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============业务设置报表配置表end=========== */

  /* =============自定义列表start=========== */
  // 删除
  customcolumnDelete: {
    'url': '/customcolumn/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 获取列表--不分页
  customcolumnGetListAll: {
    'url': '/customcolumn/getListAll',
    'mock': false
  },

  // 查看详细信息
  customcolumnInfo: {
    'url': '/customcolumn/info/{id}',
    'mock': false
  },

  // 获取列表--分页
  customcolumnList: {
    'url': '/customcolumn/list',
    'mock': false
  },

  // 保存
  customcolumnSave: {
    'url': '/customcolumn/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  customcolumnUpdate: {
    'url': '/customcolumn/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============自定义列表end=========== */

  /* =============EXCEL 导入导出操作start=========== */
  // 导出
  excelExport: {
    'url': '/excel/export',
    'mock': false,
    'methods': 'post'
  },
  /* =============EXCEL 导入导出操作end=========== */

  /* =============首页start=========== */
  // 查询待办
  homePageQueryList: {
    'url': '/homePage/queryList',
    'mock': false
  },

  // 查看详细信息
  homePageQueryTab: {
    'url': '/homePage/queryTab',
    'mock': false
  },

  // 保存用户页签
  homePageSaveCommonUserTabEntity: {
    'url': '/homePage/saveCommonUserTabEntity',
    'mock': false,
    'methods': 'post'
  },
  /* =============首页end=========== */

  /* =============process-event-controllerstart=========== */
  // allListenerConfig
  processEventAllListenerConfig: {
    'url': '/processEvent/allListenerConfig/{processType}',
    'mock': false
  },

  // onProcessEvent
  processEventOnProcessEvent: {
    'url': '/processEvent/onProcessEvent/{processType}',
    'mock': false,
    'methods': 'post'
  },
  /* =============process-event-controllerend=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': false,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============服务健康检查start=========== */
  // 检查服务健康状况
  healthCheck: {
    'url': '/ws/health/check',
    'mock': false
  },
  /* =============服务健康检查end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': false
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}