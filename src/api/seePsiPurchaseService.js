const MOCK_ADDRESS = '/mock/5dddea16e8c6606de89f3154/see-psi-purchase-service'

export default {
  __mockAddress: MOCK_ADDRESS,
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

  /* =============采购单start=========== */
  // 删除
  purchaseDelete: {
    'url': '/purchase/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  purchaseExport: {
    'url': '/purchase/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  purchaseGetByCode: {
    'url': '/purchase/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  purchaseInfo: {
    'url': '/purchase/info/{id}',
    'mock': false
  },

  // 获取列表
  purchaseList: {
    'url': '/purchase/list',
    'mock': false
  },

  // 打印
  purchasePrint: {
    'url': '/purchase/print',
    'mock': false
  },

  // 采购入库
  purchasePutin: {
    'url': '/purchase/putin',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  purchaseSave: {
    'url': '/purchase/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  purchaseUpdate: {
    'url': '/purchase/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============采购单end=========== */

  /* =============采购退货单start=========== */
  // 撤销审核
  purchasealterationCancel: {
    'url': '/purchasealteration/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  purchasealterationDelete: {
    'url': '/purchasealteration/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  purchasealterationExport: {
    'url': '/purchasealteration/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  purchasealterationGetByCode: {
    'url': '/purchasealteration/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  purchasealterationInfo: {
    'url': '/purchasealteration/info/{id}',
    'mock': false
  },

  // 获取列表
  purchasealterationList: {
    'url': '/purchasealteration/list',
    'mock': false
  },

  // 逻辑删除
  purchasealterationLogicDelete: {
    'url': '/purchasealteration/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  purchasealterationPassApproval: {
    'url': '/purchasealteration/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 打印
  purchasealterationPrint: {
    'url': '/purchasealteration/print',
    'mock': false
  },

  // 驳回
  purchasealterationReject: {
    'url': '/purchasealteration/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  purchasealterationSave: {
    'url': '/purchasealteration/save',
    'mock': false,
    'methods': 'post'
  },

  // 库存统计数字
  purchasealterationStatWms: {
    'url': '/purchasealteration/statWms/{code}',
    'mock': false
  },

  // 提交审核
  purchasealterationSubmitApproval: {
    'url': '/purchasealteration/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  purchasealterationUpdate: {
    'url': '/purchasealteration/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============采购退货单end=========== */

  /* =============请购单start=========== */
  // 请购明细表
  purchaseapplyorderCommoditys: {
    'url': '/purchaseapplyorder/commoditys',
    'mock': false
  },

  // 删除
  purchaseapplyorderDelete: {
    'url': '/purchaseapplyorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 请购明细导出
  purchaseapplyorderDetailExport: {
    'url': '/purchaseapplyorder/detailExport',
    'mock': false,
    'methods': 'post'
  },

  // 导出
  purchaseapplyorderExport: {
    'url': '/purchaseapplyorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  purchaseapplyorderGetByCode: {
    'url': '/purchaseapplyorder/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  purchaseapplyorderInfo: {
    'url': '/purchaseapplyorder/info/{id}',
    'mock': false
  },

  // 获取列表
  purchaseapplyorderList: {
    'url': '/purchaseapplyorder/list',
    'mock': false
  },

  // 逻辑删除
  purchaseapplyorderLogicDelete: {
    'url': '/purchaseapplyorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 打印
  purchaseapplyorderPrint: {
    'url': '/purchaseapplyorder/print',
    'mock': false
  },

  // 保存
  purchaseapplyorderSave: {
    'url': '/purchaseapplyorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  purchaseapplyorderUpdate: {
    'url': '/purchaseapplyorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============请购单end=========== */

  /* =============直发单start=========== */
  // 删除
  purchasedirectDelete: {
    'url': '/purchasedirect/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 直发单发货
  purchasedirectDeliver: {
    'url': '/purchasedirect/deliver',
    'mock': false,
    'methods': 'post'
  },

  // 直发单发货列表
  purchasedirectDeliverList: {
    'url': '/purchasedirect/deliverList/{code}',
    'mock': false
  },

  // 审核
  purchasedirectExamine: {
    'url': '/purchasedirect/examine',
    'mock': false,
    'methods': 'post'
  },

  // 导出
  purchasedirectExport: {
    'url': '/purchasedirect/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  purchasedirectGetByCode: {
    'url': '/purchasedirect/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  purchasedirectInfo: {
    'url': '/purchasedirect/info/{id}',
    'mock': false
  },

  // 获取列表
  purchasedirectList: {
    'url': '/purchasedirect/list',
    'mock': false
  },

  // 逻辑删除
  purchasedirectLogicDelete: {
    'url': '/purchasedirect/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 打印
  purchasedirectPrint: {
    'url': '/purchasedirect/print',
    'mock': false
  },

  // 保存
  purchasedirectSave: {
    'url': '/purchasedirect/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  purchasedirectSubmission: {
    'url': '/purchasedirect/submission',
    'mock': false,
    'methods': 'post'
  },

  // 撤销审核
  purchasedirectUnsubmission: {
    'url': '/purchasedirect/unsubmission',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  purchasedirectUpdate: {
    'url': '/purchasedirect/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============直发单end=========== */

  /* =============采购入库单start=========== */
  // 撤销审核
  purchaseputinCancel: {
    'url': '/purchaseputin/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 生成合同
  purchaseputinCreateCntract: {
    'url': '/purchaseputin/createCntract',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  purchaseputinDelete: {
    'url': '/purchaseputin/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  purchaseputinExport: {
    'url': '/purchaseputin/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  purchaseputinGetByCode: {
    'url': '/purchaseputin/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  purchaseputinInfo: {
    'url': '/purchaseputin/info/{id}',
    'mock': false
  },

  // 获取列表
  purchaseputinList: {
    'url': '/purchaseputin/list',
    'mock': false
  },

  // 逻辑删除
  purchaseputinLogicDelete: {
    'url': '/purchaseputin/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  purchaseputinPassApproval: {
    'url': '/purchaseputin/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 打印
  purchaseputinPrint: {
    'url': '/purchaseputin/print',
    'mock': false
  },

  // 驳回
  purchaseputinReject: {
    'url': '/purchaseputin/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  purchaseputinSave: {
    'url': '/purchaseputin/save',
    'mock': false,
    'methods': 'post'
  },

  // 终止
  purchaseputinShutdown: {
    'url': '/purchaseputin/shutdown',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  purchaseputinSubmitApproval: {
    'url': '/purchaseputin/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  purchaseputinUpdate: {
    'url': '/purchaseputin/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============采购入库单end=========== */

  /* =============备货单start=========== */
  // 撤销审核
  purchasestockorderCancel: {
    'url': '/purchasestockorder/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  purchasestockorderDelete: {
    'url': '/purchasestockorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  purchasestockorderExport: {
    'url': '/purchasestockorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  purchasestockorderGetByCode: {
    'url': '/purchasestockorder/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  purchasestockorderInfo: {
    'url': '/purchasestockorder/info/{id}',
    'mock': false
  },

  // 获取列表
  purchasestockorderList: {
    'url': '/purchasestockorder/list',
    'mock': false
  },

  // 逻辑删除
  purchasestockorderLogicDelete: {
    'url': '/purchasestockorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  purchasestockorderPassApproval: {
    'url': '/purchasestockorder/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 打印
  purchasestockorderPrint: {
    'url': '/purchasestockorder/print',
    'mock': false
  },

  // 驳回
  purchasestockorderReject: {
    'url': '/purchasestockorder/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  purchasestockorderSave: {
    'url': '/purchasestockorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  purchasestockorderSubmitApproval: {
    'url': '/purchasestockorder/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  purchasestockorderUpdate: {
    'url': '/purchasestockorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============备货单end=========== */

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