const MOCK_ADDRESS = '/mock/5dbfdd1bbc54fc3da273f35d/see-psi-sale-service'

export default {
  __mockAddress: MOCK_ADDRESS,

  /**
   * @tag 报价单
   * @description 获取附加发票账期
   */
  salesquotationGetAdditionalInvoiceFbill: {
    url: '/salesquotation/getAdditionalInvoiceFbill',
    methods: 'get',
    mock: false
  },
  /**
   * @tag 单据业务商品表
   * @description 查询商品业务数据
   */
  businesscommodityQueryGoodsList: {
    url: '/businesscommodity/queryGoodsList',
    methods: 'get',
    mock: false
  },
  /* =============单据业务商品表start=========== */
  // 删除
  businesscommodityDelete: {
    'url': '/businesscommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 获取列表--不分页
  businesscommodityGetBusinessCommodityList: {
    'url': '/businesscommodity/getBusinessCommodityList',
    'mock': false
  },

  // 查看详细信息
  businesscommodityInfo: {
    'url': '/businesscommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  businesscommodityList: {
    'url': '/businesscommodity/list',
    'mock': false
  },

  // 保存
  businesscommoditySave: {
    'url': '/businesscommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 批量保存
  businessrelationSaveBatchBusinessRelation: {
    'url': '/businessrelation/saveBatchBusinessRelation',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  businessrelationSaveBusinessRelation: {
    'url': '/businessrelation/saveBusinessRelation',
    'mock': false,
    'methods': 'post'
  },
  /* =============单据业务商品表end=========== */

  /* =============业务单账期表start=========== */
  // 删除
  businessshipmentfinanceDelete: {
    'url': '/businessshipmentfinance/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 获取列表
  businessshipmentfinanceGetBusinessShipmentFinanceList: {
    'url': '/businessshipmentfinance/getBusinessShipmentFinanceList',
    'mock': false
  },

  // 查看详细信息
  businessshipmentfinanceInfo: {
    'url': '/businessshipmentfinance/info/{id}',
    'mock': false
  },

  // 获取列表
  businessshipmentfinanceList: {
    'url': '/businessshipmentfinance/list',
    'mock': false
  },

  // 保存
  businessshipmentfinanceSave: {
    'url': '/businessshipmentfinance/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============业务单账期表end=========== */

  /* =============job-controllerstart=========== */
  // execute
  jobExecute: {
    'url': '/job/execute',
    'mock': false,
    'methods': 'post'
  },
  /* =============job-controllerend=========== */

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

  /* =============销售退换货单start=========== */
  // 删除
  salesalterationsheetDelete: {
    'url': '/salesalterationsheet/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salesalterationsheetExport: {
    'url': '/salesalterationsheet/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  salesalterationsheetGetInfoByCode: {
    'url': '/salesalterationsheet/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  salesalterationsheetInfo: {
    'url': '/salesalterationsheet/info/{id}',
    'mock': false
  },

  // 获取列表
  salesalterationsheetList: {
    'url': '/salesalterationsheet/list',
    'mock': false
  },

  // 逻辑删除
  salesalterationsheetLogicDelete: {
    'url': '/salesalterationsheet/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  salesalterationsheetSave: {
    'url': '/salesalterationsheet/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salesalterationsheetUpdate: {
    'url': '/salesalterationsheet/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售退换货单end=========== */

  /* =============销售费用分摊单start=========== */
  // 撤销审核
  salescostapportionCancel: {
    'url': '/salescostapportion/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  salescostapportionDelete: {
    'url': '/salescostapportion/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salescostapportionExport: {
    'url': '/salescostapportion/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  salescostapportionGetInfoByCode: {
    'url': '/salescostapportion/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  salescostapportionInfo: {
    'url': '/salescostapportion/info/{id}',
    'mock': false
  },

  // 获取列表
  salescostapportionList: {
    'url': '/salescostapportion/list',
    'mock': false
  },

  // 逻辑删除
  salescostapportionLogicDelete: {
    'url': '/salescostapportion/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  salescostapportionPassApproval: {
    'url': '/salescostapportion/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  salescostapportionReject: {
    'url': '/salescostapportion/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  salescostapportionSave: {
    'url': '/salescostapportion/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  salescostapportionSubmitApproval: {
    'url': '/salescostapportion/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salescostapportionUpdate: {
    'url': '/salescostapportion/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售费用分摊单end=========== */

  /* =============销售换货单start=========== */
  // 撤销审核
  salesexchangeCancel: {
    'url': '/salesexchange/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  salesexchangeDelete: {
    'url': '/salesexchange/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salesexchangeExport: {
    'url': '/salesexchange/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  salesexchangeGetInfoByCode: {
    'url': '/salesexchange/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  salesexchangeInfo: {
    'url': '/salesexchange/info/{id}',
    'mock': false
  },

  // 获取列表
  salesexchangeList: {
    'url': '/salesexchange/list',
    'mock': false
  },

  // 逻辑删除
  salesexchangeLogicDelete: {
    'url': '/salesexchange/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  salesexchangePassApproval: {
    'url': '/salesexchange/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  salesexchangeReject: {
    'url': '/salesexchange/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  salesexchangeSave: {
    'url': '/salesexchange/save',
    'mock': false,
    'methods': 'post'
  },

  // 扫码换货
  salesexchangeScanExchange: {
    'url': '/salesexchange/scanExchange',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  salesexchangeSubmitApproval: {
    'url': '/salesexchange/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salesexchangeUpdate: {
    'url': '/salesexchange/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售换货单end=========== */

  /* =============报价单start=========== */
  // 审核
  salesquotationApproval: {
    'url': '/salesquotation/approval',
    'mock': false,
    'methods': 'post'
  },

  // 撤销审核
  salesquotationCancel: {
    'url': '/salesquotation/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  salesquotationDelete: {
    'url': '/salesquotation/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salesquotationExport: {
    'url': '/salesquotation/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  salesquotationGetinfoByCode: {
    'url': '/salesquotation/getinfoByCode',
    'mock': false
  },

  // 根据id查看详细信息
  salesquotationInfo: {
    'url': '/salesquotation/info/{id}',
    'mock': false
  },

  // 生成请购单
  salesquotationInsertPurchaseApplyOrder: {
    'url': '/salesquotation/insertPurchaseApplyOrder',
    'mock': false,
    'methods': 'post'
  },

  // 获取列表
  salesquotationList: {
    'url': '/salesquotation/list',
    'mock': false
  },

  // 逻辑删除
  salesquotationLogicDelete: {
    'url': '/salesquotation/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  salesquotationPassApproval: {
    'url': '/salesquotation/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 终止
  salesquotationPause: {
    'url': '/salesquotation/pause',
    'mock': false
  },

  // 查询报价单可退换货商品
  salesquotationQueryMayCommodity: {
    'url': '/salesquotation/queryMayCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 查询报价单可退换货商品
  salesquotationQueryMayCommodity: {
    'url': '/salesquotation/queryMayCommodity',
    'mock': false
  },

  // 驳回
  salesquotationReject: {
    'url': '/salesquotation/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  salesquotationSave: {
    'url': '/salesquotation/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  salesquotationSubmitApproval: {
    'url': '/salesquotation/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salesquotationUpdate: {
    'url': '/salesquotation/update',
    'mock': false,
    'methods': 'post'
  },

  // 更新采购预计到货时间
  salesquotationUpdatePurchaseArrivalTime: {
    'url': '/salesquotation/updatePurchaseArrivalTime',
    'mock': false,
    'methods': 'post'
  },
  /* =============报价单end=========== */

  /* =============销售退货单start=========== */
  // 撤销审核
  salesreturnedCancel: {
    'url': '/salesreturned/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  salesreturnedDelete: {
    'url': '/salesreturned/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salesreturnedExport: {
    'url': '/salesreturned/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  salesreturnedGetInfoByCode: {
    'url': '/salesreturned/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  salesreturnedInfo: {
    'url': '/salesreturned/info/{id}',
    'mock': false
  },

  // 获取列表
  salesreturnedList: {
    'url': '/salesreturned/list',
    'mock': false
  },

  // 逻辑删除
  salesreturnedLogicDelete: {
    'url': '/salesreturned/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  salesreturnedPassApproval: {
    'url': '/salesreturned/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  salesreturnedReject: {
    'url': '/salesreturned/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  salesreturnedSave: {
    'url': '/salesreturned/save',
    'mock': false,
    'methods': 'post'
  },

  // 扫码退货
  salesreturnedScanReturned: {
    'url': '/salesreturned/scanReturned',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  salesreturnedSubmitApproval: {
    'url': '/salesreturned/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salesreturnedUpdate: {
    'url': '/salesreturned/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售退货单end=========== */

  /* =============销售单start=========== */
  // 删除
  salessheetDelete: {
    'url': '/salessheet/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 发货
  salessheetDeliverGoods: {
    'url': '/salessheet/deliverGoods',
    'mock': false,
    'methods': 'post'
  },

  // 导出
  salessheetExport: {
    'url': '/salessheet/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  salessheetGetInfoByCode: {
    'url': '/salessheet/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  salessheetInfo: {
    'url': '/salessheet/info/{id}',
    'mock': false
  },

  // 获取列表
  salessheetList: {
    'url': '/salessheet/list',
    'mock': false
  },

  // 逻辑删除
  salessheetLogicDelete: {
    'url': '/salessheet/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  salessheetSave: {
    'url': '/salessheet/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salessheetUpdate: {
    'url': '/salessheet/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售单end=========== */

  /* =============销售出库单start=========== */
  // 审核
  salesshipmentApproval: {
    'url': '/salesshipment/approval',
    'mock': false,
    'methods': 'post'
  },

  // 撤销审核
  salesshipmentCancel: {
    'url': '/salesshipment/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 合并生成销售出库单规则校验
  salesshipmentCheckInsertSalesShipment: {
    'url': '/salesshipment/checkInsertSalesShipment',
    'mock': false
  },

  // 删除
  salesshipmentDelete: {
    'url': '/salesshipment/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salesshipmentExport: {
    'url': '/salesshipment/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据报价单id，计算获取销售出库单金额数据
  salesshipmentGetAddShipemtAmount: {
    'url': '/salesshipment/getAddShipemtAmount',
    'mock': false
  },

  // 根据code查看详细信息
  salesshipmentGetInfoByCode: {
    'url': '/salesshipment/getInfoByCode',
    'mock': false
  },

  // 根据code获取出库单商品
  salesshipmentGetShipmentCommodity: {
    'url': '/salesshipment/getShipmentCommodity',
    'mock': false
  },

  // 根据id查看详细信息
  salesshipmentInfo: {
    'url': '/salesshipment/info/{id}',
    'mock': false
  },

  // 生成合同
  salesshipmentInsertContract: {
    'url': '/salesshipment/insertContract',
    'mock': false,
    'methods': 'post'
  },

  // 获取列表
  salesshipmentList: {
    'url': '/salesshipment/list',
    'mock': false
  },

  // 根据code采购入库单列表
  salesshipmentListByShipmentCode: {
    'url': '/salesshipment/listByShipmentCode',
    'mock': false
  },

  // 逻辑删除
  salesshipmentLogicDelete: {
    'url': '/salesshipment/logicDelete',
    'mock': false,
    'methods': 'delete'
  },
  // 邮件担保
  salesshipmentMailEnsureApproval: {
    'url': '/salesshipment/mailEnsureApproval',
    'mock': false,
    'methods': 'post'
  },
  // 追加合同附件
  salesshipmentAdditionalcontractAttachs: {
    'url': '/salesshipment/additionalcontractAttachs',
    'mock': false,
    'methods': 'post'
  },

  // 审核通过
  salesshipmentPassApproval: {
    'url': '/salesshipment/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 合同完善
  salesshipmentPassContractApproval: {
    'url': '/salesshipment/passContractApproval',
    'mock': false,
    'methods': 'post'
  },

  // 终止
  salesshipmentPause: {
    'url': '/salesshipment/pause',
    'mock': false,
    'methods': 'get'
  },

  // 审核采购时间
  salesshipmentPurchaseTimeApproval: {
    'url': '/salesshipment/purchaseTimeApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  salesshipmentReject: {
    'url': '/salesshipment/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  salesshipmentSave: {
    'url': '/salesshipment/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  salesshipmentSubmitApproval: {
    'url': '/salesshipment/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salesshipmentUpdate: {
    'url': '/salesshipment/update',
    'mock': false,
    'methods': 'post'
  },

  // 追加合同附件
  salesshipmentUpdateContract: {
    'url': '/salesshipment/updateContract',
    'mock': false,
    'methods': 'post'
  },

  // 收回合同
  salesshipmentWithdrawApproval: {
    'url': '/salesshipment/withdrawApproval',
    'mock': false,
    'methods': 'post'
  },
  /* =============销售出库单end=========== */

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