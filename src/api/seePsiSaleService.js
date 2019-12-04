const MOCK_ADDRESS = '/mock/5dbfdd1bbc54fc3da273f35d/see-psi-sale-service'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============单据业务商品表start=========== */
  // 删除
  businesscommodityDelete: {
    'url': '/businesscommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 获取列表--不分页
  businesscommodityGetBusinessCommodityList: {
    'url': '/businesscommodity/getBusinessCommodityList',
    'mock': true
  },

  // 查看详细信息
  businesscommodityInfo: {
    'url': '/businesscommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  businesscommodityList: {
    'url': '/businesscommodity/list',
    'mock': true
  },

  // 保存
  businesscommoditySave: {
    'url': '/businesscommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 批量保存
  businessrelationSaveBatchBusinessRelation: {
    'url': '/businessrelation/saveBatchBusinessRelation',
    'mock': true,
    'methods': 'post'
  },

  // 保存
  businessrelationSaveBusinessRelation: {
    'url': '/businessrelation/saveBusinessRelation',
    'mock': true,
    'methods': 'post'
  },
  /* =============单据业务商品表end=========== */

  /* =============业务单账期表start=========== */
  // 删除
  businessshipmentfinanceDelete: {
    'url': '/businessshipmentfinance/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 获取列表
  businessshipmentfinanceGetBusinessShipmentFinanceList: {
    'url': '/businessshipmentfinance/getBusinessShipmentFinanceList',
    'mock': true
  },

  // 查看详细信息
  businessshipmentfinanceInfo: {
    'url': '/businessshipmentfinance/info/{id}',
    'mock': true
  },

  // 获取列表
  businessshipmentfinanceList: {
    'url': '/businessshipmentfinance/list',
    'mock': true
  },

  // 保存
  businessshipmentfinanceSave: {
    'url': '/businessshipmentfinance/save',
    'mock': true,
    'methods': 'post'
  },
  /* =============业务单账期表end=========== */

  /* =============job-controllerstart=========== */
  // execute
  jobExecute: {
    'url': '/job/execute',
    'mock': true,
    'methods': 'post'
  },
  /* =============job-controllerend=========== */

  /* =============process-event-controllerstart=========== */
  // allListenerConfig
  processEventAllListenerConfig: {
    'url': '/processEvent/allListenerConfig/{processType}',
    'mock': true
  },

  // onProcessEvent
  processEventOnProcessEvent: {
    'url': '/processEvent/onProcessEvent/{processType}',
    'mock': true,
    'methods': 'post'
  },
  /* =============process-event-controllerend=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': true,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============销售退换货单start=========== */
  // 删除
  salesalterationsheetDelete: {
    'url': '/salesalterationsheet/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 导出
  salesalterationsheetExport: {
    'url': '/salesalterationsheet/export',
    'mock': true,
    'methods': 'post'
  },

  // 查看详细信息
  salesalterationsheetGetInfoByCode: {
    'url': '/salesalterationsheet/getInfoByCode',
    'mock': true
  },

  // 查看详细信息
  salesalterationsheetInfo: {
    'url': '/salesalterationsheet/info/{id}',
    'mock': true
  },

  // 获取列表
  salesalterationsheetList: {
    'url': '/salesalterationsheet/list',
    'mock': true
  },

  // 逻辑删除
  salesalterationsheetLogicDelete: {
    'url': '/salesalterationsheet/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  salesalterationsheetSave: {
    'url': '/salesalterationsheet/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salesalterationsheetUpdate: {
    'url': '/salesalterationsheet/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============销售退换货单end=========== */

  /* =============销售费用分摊单start=========== */
  // 撤销审核
  salescostapportionCancel: {
    'url': '/salescostapportion/cancel',
    'mock': true,
    'methods': 'post'
  },

  // 删除
  salescostapportionDelete: {
    'url': '/salescostapportion/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 导出
  salescostapportionExport: {
    'url': '/salescostapportion/export',
    'mock': true,
    'methods': 'post'
  },

  // 查看详细信息
  salescostapportionGetInfoByCode: {
    'url': '/salescostapportion/getInfoByCode',
    'mock': true
  },

  // 查看详细信息
  salescostapportionInfo: {
    'url': '/salescostapportion/info/{id}',
    'mock': true
  },

  // 获取列表
  salescostapportionList: {
    'url': '/salescostapportion/list',
    'mock': true
  },

  // 逻辑删除
  salescostapportionLogicDelete: {
    'url': '/salescostapportion/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 审核通过
  salescostapportionPassApproval: {
    'url': '/salescostapportion/passApproval',
    'mock': true,
    'methods': 'post'
  },

  // 驳回
  salescostapportionReject: {
    'url': '/salescostapportion/reject',
    'mock': true,
    'methods': 'post'
  },

  // 保存
  salescostapportionSave: {
    'url': '/salescostapportion/save',
    'mock': true,
    'methods': 'post'
  },

  // 提交审核
  salescostapportionSubmitApproval: {
    'url': '/salescostapportion/submitApproval',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salescostapportionUpdate: {
    'url': '/salescostapportion/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============销售费用分摊单end=========== */

  /* =============销售换货单start=========== */
  // 撤销审核
  salesexchangeCancel: {
    'url': '/salesexchange/cancel',
    'mock': true,
    'methods': 'post'
  },

  // 删除
  salesexchangeDelete: {
    'url': '/salesexchange/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 导出
  salesexchangeExport: {
    'url': '/salesexchange/export',
    'mock': true,
    'methods': 'post'
  },

  // 查看详细信息
  salesexchangeGetInfoByCode: {
    'url': '/salesexchange/getInfoByCode',
    'mock': true
  },

  // 查看详细信息
  salesexchangeInfo: {
    'url': '/salesexchange/info/{id}',
    'mock': true
  },

  // 获取列表
  salesexchangeList: {
    'url': '/salesexchange/list',
    'mock': true
  },

  // 逻辑删除
  salesexchangeLogicDelete: {
    'url': '/salesexchange/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 审核通过
  salesexchangePassApproval: {
    'url': '/salesexchange/passApproval',
    'mock': true,
    'methods': 'post'
  },

  // 驳回
  salesexchangeReject: {
    'url': '/salesexchange/reject',
    'mock': true,
    'methods': 'post'
  },

  // 保存
  salesexchangeSave: {
    'url': '/salesexchange/save',
    'mock': true,
    'methods': 'post'
  },

  // 扫码换货
  salesexchangeScanExchange: {
    'url': '/salesexchange/scanExchange',
    'mock': true,
    'methods': 'post'
  },

  // 提交审核
  salesexchangeSubmitApproval: {
    'url': '/salesexchange/submitApproval',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salesexchangeUpdate: {
    'url': '/salesexchange/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============销售换货单end=========== */

  /* =============报价单start=========== */
  // 审核
  salesquotationApproval: {
    'url': '/salesquotation/approval',
    'mock': true,
    'methods': 'post'
  },

  // 撤销审核
  salesquotationCancel: {
    'url': '/salesquotation/cancel',
    'mock': true,
    'methods': 'post'
  },

  // 删除
  salesquotationDelete: {
    'url': '/salesquotation/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 导出
  salesquotationExport: {
    'url': '/salesquotation/export',
    'mock': true,
    'methods': 'post'
  },

  // 根据code查看详细信息
  salesquotationGetinfoByCode: {
    'url': '/salesquotation/getinfoByCode',
    'mock': true
  },

  // 根据id查看详细信息
  salesquotationInfo: {
    'url': '/salesquotation/info/{id}',
    'mock': true
  },

  // 生成请购单
  salesquotationInsertPurchaseApplyOrder: {
    'url': '/salesquotation/insertPurchaseApplyOrder',
    'mock': true,
    'methods': 'post'
  },

  // 获取列表
  salesquotationList: {
    'url': '/salesquotation/list',
    'mock': true
  },

  // 逻辑删除
  salesquotationLogicDelete: {
    'url': '/salesquotation/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 审核通过
  salesquotationPassApproval: {
    'url': '/salesquotation/passApproval',
    'mock': true,
    'methods': 'post'
  },

  // 终止
  salesquotationPause: {
    'url': '/salesquotation/pause',
    'mock': true
  },

  // 查询报价单可退换货商品
  salesquotationQueryMayCommodity: {
    'url': '/salesquotation/queryMayCommodity',
    'mock': true,
    'methods': 'post'
  },

  // 驳回
  salesquotationReject: {
    'url': '/salesquotation/reject',
    'mock': true,
    'methods': 'post'
  },

  // 保存
  salesquotationSave: {
    'url': '/salesquotation/save',
    'mock': true,
    'methods': 'post'
  },

  // 提交审核
  salesquotationSubmitApproval: {
    'url': '/salesquotation/submitApproval',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salesquotationUpdate: {
    'url': '/salesquotation/update',
    'mock': true,
    'methods': 'post'
  },

  // 更新采购预计到货时间
  salesquotationUpdatePurchaseArrivalTime: {
    'url': '/salesquotation/updatePurchaseArrivalTime',
    'mock': true,
    'methods': 'post'
  },
  /* =============报价单end=========== */

  /* =============销售退货单start=========== */
  // 撤销审核
  salesreturnedCancel: {
    'url': '/salesreturned/cancel',
    'mock': true,
    'methods': 'post'
  },

  // 删除
  salesreturnedDelete: {
    'url': '/salesreturned/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 导出
  salesreturnedExport: {
    'url': '/salesreturned/export',
    'mock': true,
    'methods': 'post'
  },

  // 查看详细信息
  salesreturnedGetInfoByCode: {
    'url': '/salesreturned/getInfoByCode',
    'mock': true
  },

  // 查看详细信息
  salesreturnedInfo: {
    'url': '/salesreturned/info/{id}',
    'mock': true
  },

  // 获取列表
  salesreturnedList: {
    'url': '/salesreturned/list',
    'mock': true
  },

  // 逻辑删除
  salesreturnedLogicDelete: {
    'url': '/salesreturned/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 审核通过
  salesreturnedPassApproval: {
    'url': '/salesreturned/passApproval',
    'mock': true,
    'methods': 'post'
  },

  // 驳回
  salesreturnedReject: {
    'url': '/salesreturned/reject',
    'mock': true,
    'methods': 'post'
  },

  // 保存
  salesreturnedSave: {
    'url': '/salesreturned/save',
    'mock': true,
    'methods': 'post'
  },

  // 扫码退货
  salesreturnedScanReturned: {
    'url': '/salesreturned/scanReturned',
    'mock': true,
    'methods': 'post'
  },

  // 提交审核
  salesreturnedSubmitApproval: {
    'url': '/salesreturned/submitApproval',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salesreturnedUpdate: {
    'url': '/salesreturned/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============销售退货单end=========== */

  /* =============销售单start=========== */
  // 删除
  salessheetDelete: {
    'url': '/salessheet/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 发货
  salessheetDeliverGoods: {
    'url': '/salessheet/deliverGoods',
    'mock': true,
    'methods': 'post'
  },

  // 导出
  salessheetExport: {
    'url': '/salessheet/export',
    'mock': true,
    'methods': 'post'
  },

  // 查看详细信息
  salessheetGetInfoByCode: {
    'url': '/salessheet/getInfoByCode',
    'mock': true
  },

  // 查看详细信息
  salessheetInfo: {
    'url': '/salessheet/info/{id}',
    'mock': true
  },

  // 获取列表
  salessheetList: {
    'url': '/salessheet/list',
    'mock': true
  },

  // 逻辑删除
  salessheetLogicDelete: {
    'url': '/salessheet/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  salessheetSave: {
    'url': '/salessheet/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salessheetUpdate: {
    'url': '/salessheet/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============销售单end=========== */

  /* =============销售出库单start=========== */
  // 根据code获取出库单商品
  salesshipmentBusinessCommodityEntity: {
    'url': '/salesshipment/BusinessCommodityEntity',
    'mock': true
  },

  // 审核
  salesshipmentApproval: {
    'url': '/salesshipment/approval',
    'mock': true,
    'methods': 'post'
  },

  // 撤销审核
  salesshipmentCancel: {
    'url': '/salesshipment/cancel',
    'mock': true,
    'methods': 'post'
  },

  // 合并生成销售出库单规则校验
  salesshipmentCheckInsertSalesShipment: {
    'url': '/salesshipment/checkInsertSalesShipment',
    'mock': true
  },

  // 删除
  salesshipmentDelete: {
    'url': '/salesshipment/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 导出
  salesshipmentExport: {
    'url': '/salesshipment/export',
    'mock': true,
    'methods': 'post'
  },

  // 根据报价单id，计算获取销售出库单金额数据
  salesshipmentGetAddShipemtAmount: {
    'url': '/salesshipment/getAddShipemtAmount',
    'mock': true
  },

  // 根据code查看详细信息
  salesshipmentGetInfoByCode: {
    'url': '/salesshipment/getInfoByCode',
    'mock': true
  },

  // 根据code获取出库单商品
  salesshipmentGetShipmentCommodity: {
    'url': '/salesshipment/getShipmentCommodity',
    'mock': true
  },

  // 根据id查看详细信息
  salesshipmentInfo: {
    'url': '/salesshipment/info/{id}',
    'mock': true
  },

  // 生成合同
  salesshipmentInsertContract: {
    'url': '/salesshipment/insertContract',
    'mock': true,
    'methods': 'post'
  },

  // 获取列表
  salesshipmentList: {
    'url': '/salesshipment/list',
    'mock': true
  },

  // 逻辑删除
  salesshipmentLogicDelete: {
    'url': '/salesshipment/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 审核通过
  salesshipmentPassApproval: {
    'url': '/salesshipment/passApproval',
    'mock': true,
    'methods': 'post'
  },

  // 合同完善
  salesshipmentPassContractApproval: {
    'url': '/salesshipment/passContractApproval',
    'mock': true,
    'methods': 'post'
  },

  // 终止
  salesshipmentPause: {
    'url': '/salesshipment/pause',
    'mock': true,
    'methods': 'post'
  },

  // 审核采购时间
  salesshipmentPurchaseTimeApproval: {
    'url': '/salesshipment/purchaseTimeApproval',
    'mock': true,
    'methods': 'post'
  },

  // 驳回
  salesshipmentReject: {
    'url': '/salesshipment/reject',
    'mock': true,
    'methods': 'post'
  },

  // 保存
  salesshipmentSave: {
    'url': '/salesshipment/save',
    'mock': true,
    'methods': 'post'
  },

  // 提交审核
  salesshipmentSubmitApproval: {
    'url': '/salesshipment/submitApproval',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  salesshipmentUpdate: {
    'url': '/salesshipment/update',
    'mock': true,
    'methods': 'post'
  },

  // 追加合同附件
  salesshipmentUpdateContract: {
    'url': '/salesshipment/updateContract',
    'mock': true,
    'methods': 'post'
  },

  // 收回合同
  salesshipmentWithdrawApproval: {
    'url': '/salesshipment/withdrawApproval',
    'mock': true,
    'methods': 'post'
  },
  /* =============销售出库单end=========== */

  /* =============服务健康检查start=========== */
  // 检查服务健康状况
  healthCheck: {
    'url': '/ws/health/check',
    'mock': true
  },
  /* =============服务健康检查end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': true
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}