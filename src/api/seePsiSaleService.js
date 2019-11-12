const MOCK_ADDRESS = '/mock/5dbfdd1bbc54fc3da273f35d/see-psi-sale-service'

export default {
  __mockAddress: MOCK_ADDRESS,
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
  // 审核
  salesalterationsheetApproval: {
    'url': '/salesalterationsheet/approval',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  salesalterationsheetDelete: {
    'url': '/salesalterationsheet/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salesalterationsheetExport: {
    'url': '/salesalterationsheet/export',
    'mock': false
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
  // 审核
  salescostapportionApproval: {
    'url': '/salescostapportion/approval',
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

  // 保存
  salescostapportionSave: {
    'url': '/salescostapportion/save',
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

  /* =============报价单start=========== */
  // 审核
  salesquotationApproval: {
    'url': '/salesquotation/approval',
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

  // 导出
  salesquotationExport: {
    'url': '/salesquotation/export',
    'mock': false
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

  // 终止
  salesquotationPause: {
    'url': '/salesquotation/pause',
    'mock': false
  },

  // 保存
  salesquotationSave: {
    'url': '/salesquotation/save',
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

  /* =============销售单start=========== */
  // 删除
  salessheetDelete: {
    'url': '/salessheet/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  salessheetExport: {
    'url': '/salessheet/export',
    'mock': false
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
    'mock': false
  },

  // 根据code查看详细信息
  salesshipmentGetInfoByCode: {
    'url': '/salesshipment/getInfoByCode',
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

  // 逻辑删除
  salesshipmentLogicDelete: {
    'url': '/salesshipment/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 终止
  salesshipmentPause: {
    'url': '/salesshipment/pause',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  salesshipmentSave: {
    'url': '/salesshipment/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  salesshipmentUpdate: {
    'url': '/salesshipment/update',
    'mock': false,
    'methods': 'post'
  },

  // 编辑合同
  salesshipmentUpdateContract: {
    'url': '/salesshipment/updateContract',
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