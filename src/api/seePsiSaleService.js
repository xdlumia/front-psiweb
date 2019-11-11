const MOCK_ADDRESS = '/mock/5dbfdd1bbc54fc3da273f35d/see-psi-sale-service'
const isMock = false
export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============单据业务商品表start=========== */
  // 删除
  businesscommodityDelete: {
    'url': '/businesscommodity/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 获取列表--不分页
  businesscommodityGetBusinessCommodityList: {
    'url': '/businesscommodity/getBusinessCommodityList',
    'mock': isMock
  },

  // 查看详细信息
  businesscommodityInfo: {
    'url': '/businesscommodity/info/{id}',
    'mock': isMock
  },

  // 获取列表
  businesscommodityList: {
    'url': '/businesscommodity/list',
    'mock': isMock
  },

  // 保存
  businesscommoditySave: {
    'url': '/businesscommodity/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============单据业务商品表end=========== */

  /* =============业务单账期表start=========== */
  // 删除
  businessshipmentfinanceDelete: {
    'url': '/businessshipmentfinance/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 获取列表
  businessshipmentfinanceGetBusinessShipmentFinanceList: {
    'url': '/businessshipmentfinance/getBusinessShipmentFinanceList',
    'mock': isMock
  },

  // 查看详细信息
  businessshipmentfinanceInfo: {
    'url': '/businessshipmentfinance/info/{id}',
    'mock': isMock
  },

  // 获取列表
  businessshipmentfinanceList: {
    'url': '/businessshipmentfinance/list',
    'mock': isMock
  },

  // 保存
  businessshipmentfinanceSave: {
    'url': '/businessshipmentfinance/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============业务单账期表end=========== */

  /* =============process-event-controllerstart=========== */
  // allListenerConfig
  processEventAllListenerConfig: {
    'url': '/processEvent/allListenerConfig/{processType}',
    'mock': isMock
  },

  // onProcessEvent
  processEventOnProcessEvent: {
    'url': '/processEvent/onProcessEvent/{processType}',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============process-event-controllerend=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============销售退换货单start=========== */
  // 审核
  salesalterationsheetApproval: {
    'url': '/salesalterationsheet/approval',
    'mock': isMock,
    'methods': 'post'
  },

  // 删除
  salesalterationsheetDelete: {
    'url': '/salesalterationsheet/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 导出
  salesalterationsheetExport: {
    'url': '/salesalterationsheet/export',
    'mock': isMock
  },

  // 查看详细信息
  salesalterationsheetGetInfoByCode: {
    'url': '/salesalterationsheet/getInfoByCode',
    'mock': isMock
  },

  // 查看详细信息
  salesalterationsheetInfo: {
    'url': '/salesalterationsheet/info/{id}',
    'mock': isMock
  },

  // 获取列表
  salesalterationsheetList: {
    'url': '/salesalterationsheet/list',
    'mock': isMock
  },

  // 逻辑删除
  salesalterationsheetLogicDelete: {
    'url': '/salesalterationsheet/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  salesalterationsheetSave: {
    'url': '/salesalterationsheet/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  salesalterationsheetUpdate: {
    'url': '/salesalterationsheet/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============销售退换货单end=========== */

  /* =============销售费用分摊单start=========== */
  // 审核
  salescostapportionApproval: {
    'url': '/salescostapportion/approval',
    'mock': isMock,
    'methods': 'post'
  },

  // 删除
  salescostapportionDelete: {
    'url': '/salescostapportion/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 导出
  salescostapportionExport: {
    'url': '/salescostapportion/export',
    'mock': isMock
  },

  // 查看详细信息
  salescostapportionInfo: {
    'url': '/salescostapportion/info/{id}',
    'mock': isMock
  },

  // 获取列表
  salescostapportionList: {
    'url': '/salescostapportion/list',
    'mock': isMock
  },

  // 逻辑删除
  salescostapportionLogicDelete: {
    'url': '/salescostapportion/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  salescostapportionSave: {
    'url': '/salescostapportion/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  salescostapportionUpdate: {
    'url': '/salescostapportion/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============销售费用分摊单end=========== */

  /* =============报价单start=========== */
  // 审核
  salesquotationApproval: {
    'url': '/salesquotation/approval',
    'mock': isMock,
    'methods': 'post'
  },

  // 删除
  salesquotationDelete: {
    'url': '/salesquotation/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 导出
  salesquotationExport: {
    'url': '/salesquotation/export',
    'mock': isMock,
    'methods': 'post'
  },

  // 导出
  salesquotationExport: {
    'url': '/salesquotation/export',
    'mock': isMock
  },

  // 根据code查看详细信息
  salesquotationGetinfoByCode: {
    'url': '/salesquotation/getinfoByCode',
    'mock': isMock
  },

  // 根据id查看详细信息
  salesquotationInfo: {
    'url': '/salesquotation/info/{id}',
    'mock': isMock
  },

  // 生成请购单
  salesquotationInsertPurchaseApplyOrder: {
    'url': '/salesquotation/insertPurchaseApplyOrder',
    'mock': isMock,
    'methods': 'post'
  },

  // 获取列表
  salesquotationList: {
    'url': '/salesquotation/list',
    'mock': isMock
  },

  // 逻辑删除
  salesquotationLogicDelete: {
    'url': '/salesquotation/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 终止
  salesquotationPause: {
    'url': '/salesquotation/pause',
    'mock': isMock
  },

  // 保存
  salesquotationSave: {
    'url': '/salesquotation/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  salesquotationUpdate: {
    'url': '/salesquotation/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 更新采购预计到货时间
  salesquotationUpdatePurchaseArrivalTime: {
    'url': '/salesquotation/updatePurchaseArrivalTime',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============报价单end=========== */

  /* =============销售单start=========== */
  // 删除
  salessheetDelete: {
    'url': '/salessheet/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 导出
  salessheetExport: {
    'url': '/salessheet/export',
    'mock': isMock
  },

  // 查看详细信息
  salessheetInfo: {
    'url': '/salessheet/info/{id}',
    'mock': isMock
  },

  // 获取列表
  salessheetList: {
    'url': '/salessheet/list',
    'mock': isMock
  },

  // 逻辑删除
  salessheetLogicDelete: {
    'url': '/salessheet/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  salessheetSave: {
    'url': '/salessheet/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  salessheetUpdate: {
    'url': '/salessheet/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============销售单end=========== */

  /* =============销售出库单start=========== */
  // 审核
  salesshipmentApproval: {
    'url': '/salesshipment/approval',
    'mock': isMock,
    'methods': 'post'
  },

  // 合并生成销售出库单规则校验
  salesshipmentCheckInsertSalesShipment: {
    'url': '/salesshipment/checkInsertSalesShipment',
    'mock': isMock
  },

  // 删除
  salesshipmentDelete: {
    'url': '/salesshipment/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 导出
  salesshipmentExport: {
    'url': '/salesshipment/export',
    'mock': isMock
  },

  // 根据code查看详细信息
  salesshipmentGetInfoByCode: {
    'url': '/salesshipment/getInfoByCode',
    'mock': isMock
  },

  // 根据id查看详细信息
  salesshipmentInfo: {
    'url': '/salesshipment/info/{id}',
    'mock': isMock
  },

  // 生成合同
  salesshipmentInsertContract: {
    'url': '/salesshipment/insertContract',
    'mock': isMock,
    'methods': 'post'
  },

  // 获取列表
  salesshipmentList: {
    'url': '/salesshipment/list',
    'mock': isMock
  },

  // 逻辑删除
  salesshipmentLogicDelete: {
    'url': '/salesshipment/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 终止
  salesshipmentPause: {
    'url': '/salesshipment/pause',
    'mock': isMock,
    'methods': 'post'
  },

  // 保存
  salesshipmentSave: {
    'url': '/salesshipment/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  salesshipmentUpdate: {
    'url': '/salesshipment/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 编辑合同
  salesshipmentUpdateContract: {
    'url': '/salesshipment/updateContract',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============销售出库单end=========== */

  /* =============服务健康检查start=========== */
  // 检查服务健康状况
  healthCheck: {
    'url': '/ws/health/check',
    'mock': isMock
  },
  /* =============服务健康检查end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': isMock
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}