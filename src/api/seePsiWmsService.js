const MOCK_ADDRESS = '/mock/5dbcfaabbc54fc3da273f1dc/psi'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============业务单账期表start=========== */
  // 删除
  businessshipmentfinanceDelete: {
    'url': '/businessshipmentfinance/delete',
    'mock': false,
    'methods': 'delete'
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

  /* =============库房管理start=========== */
  // 导出
  commonwmsmanagerExport: {
    'url': '/commonwmsmanager/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看库房详细信息
  commonwmsmanagerInfo: {
    'url': '/commonwmsmanager/info/{id}',
    'mock': false
  },

  // 获取库房列表
  commonwmsmanagerList: {
    'url': '/commonwmsmanager/list',
    'mock': false
  },

  // 删除库房信息
  commonwmsmanagerLogicDelete: {
    'url': '/commonwmsmanager/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存库房信息
  commonwmsmanagerSave: {
    'url': '/commonwmsmanager/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改库房信息
  commonwmsmanagerUpdate: {
    'url': '/commonwmsmanager/update',
    'mock': false,
    'methods': 'post'
  },

  // 修改库房状态
  commonwmsmanagerUpdateState: {
    'url': '/commonwmsmanager/updateState',
    'mock': false,
    'methods': 'post'
  },

  // 获取当前可用库房列表
  commonwmsmanagerUsableList: {
    'url': '/commonwmsmanager/usableList',
    'mock': false
  },
  /* =============库房管理end=========== */

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

  /* =============库房调拨商品清单start=========== */
  // 删除
  wmsallocationcommodityDelete: {
    'url': '/wmsallocationcommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsallocationcommodityInfo: {
    'url': '/wmsallocationcommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsallocationcommodityList: {
    'url': '/wmsallocationcommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmsallocationcommodityLogicDelete: {
    'url': '/wmsallocationcommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsallocationcommoditySave: {
    'url': '/wmsallocationcommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsallocationcommodityUpdate: {
    'url': '/wmsallocationcommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房调拨商品清单end=========== */

  /* =============库房调拨单start=========== */
  // 批量商品入库
  wmsallocationorderBatchSsave: {
    'url': '/wmsallocationorder/batchSsave',
    'mock': false,
    'methods': 'post'
  },

  // 批量扫码出库
  wmsallocationorderBatchUpdate: {
    'url': '/wmsallocationorder/batchUpdate',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsallocationorderDelete: {
    'url': '/wmsallocationorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsallocationorderExport: {
    'url': '/wmsallocationorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看库房调拨单详细信息
  wmsallocationorderInfo: {
    'url': '/wmsallocationorder/info/{code}',
    'mock': false
  },

  // 查看详细信息
  wmsallocationorderInfo: {
    'url': '/wmsallocationorder/info/{id}',
    'mock': false
  },

  // 获取库房调拨单列表
  wmsallocationorderList: {
    'url': '/wmsallocationorder/list',
    'mock': false
  },

  // 逻辑删除
  wmsallocationorderLogicDelete: {
    'url': '/wmsallocationorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 调拨单商品扫码调入校验
  wmsallocationorderPutawayCommodityCheck: {
    'url': '/wmsallocationorder/putawayCommodityCheck',
    'mock': false
  },

  // 保存库房调拨单信息
  wmsallocationorderSave: {
    'url': '/wmsallocationorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 调拨单商品扫码调出校验
  wmsallocationorderShipmentCommodityCheck: {
    'url': '/wmsallocationorder/shipmentCommodityCheck',
    'mock': false
  },

  // 临时商品统计
  wmsallocationorderTempCommodityCount: {
    'url': '/wmsallocationorder/tempCommodityCount',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsallocationorderUpdate: {
    'url': '/wmsallocationorder/update',
    'mock': false,
    'methods': 'post'
  },

  // 修改库房调拨单状态信息
  wmsallocationorderUpdateOrderState: {
    'url': '/wmsallocationorder/updateOrderState',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房调拨单end=========== */

  /* =============库房组装商品清单start=========== */
  // 删除
  wmsassemblecommodityDelete: {
    'url': '/wmsassemblecommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassemblecommodityInfo: {
    'url': '/wmsassemblecommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsassemblecommodityList: {
    'url': '/wmsassemblecommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmsassemblecommodityLogicDelete: {
    'url': '/wmsassemblecommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsassemblecommoditySave: {
    'url': '/wmsassemblecommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsassemblecommodityUpdate: {
    'url': '/wmsassemblecommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房组装商品清单end=========== */

  /* =============库房组装单start=========== */
  // 删除
  wmsassembleorderDelete: {
    'url': '/wmsassembleorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsassembleorderExport: {
    'url': '/wmsassembleorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据组装单编号查看组装单详细信息
  wmsassembleorderGetByCode: {
    'url': '/wmsassembleorder/getByCode/{code}',
    'mock': false
  },

  // 查看组装单详细信息
  wmsassembleorderInfo: {
    'url': '/wmsassembleorder/info/{id}',
    'mock': false
  },

  // 获取组装单列表
  wmsassembleorderList: {
    'url': '/wmsassembleorder/list',
    'mock': false
  },

  // 逻辑删除
  wmsassembleorderLogicDelete: {
    'url': '/wmsassembleorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存组装单信息
  wmsassembleorderSave: {
    'url': '/wmsassembleorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改组装单信息
  wmsassembleorderUpdate: {
    'url': '/wmsassembleorder/update',
    'mock': false,
    'methods': 'post'
  },

  // 调整组装任务生成顺序
  wmsassembleorderUpdatesSquence: {
    'url': '/wmsassembleorder/updatesSquence',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房组装单end=========== */

  /* =============库房组装任务start=========== */
  // 继续组装任务
  wmsassembletaskContinueTask: {
    'url': '/wmsassembletask/continueTask',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsassembletaskDelete: {
    'url': '/wmsassembletask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsassembletaskExport: {
    'url': '/wmsassembletask/export',
    'mock': false,
    'methods': 'post'
  },

  // 挂起组装任务
  wmsassembletaskHangTask: {
    'url': '/wmsassembletask/hangTask',
    'mock': false,
    'methods': 'post'
  },

  // 查看组装任务详细信息
  wmsassembletaskInfo: {
    'url': '/wmsassembletask/info/{id}',
    'mock': false
  },

  // 获取组装任务列表
  wmsassembletaskList: {
    'url': '/wmsassembletask/list',
    'mock': false
  },

  // 逻辑删除
  wmsassembletaskLogicDelete: {
    'url': '/wmsassembletask/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 组装入库商品
  wmsassembletaskPutawayCommodity: {
    'url': '/wmsassembletask/putawayCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 保存组装任务及拣货单信息
  wmsassembletaskSave: {
    'url': '/wmsassembletask/save',
    'mock': false,
    'methods': 'post'
  },

  // 确认并开始组装任务
  wmsassembletaskStart: {
    'url': '/wmsassembletask/start/{id}',
    'mock': false
  },

  // 转移组装任务责任人
  wmsassembletaskTransferTask: {
    'url': '/wmsassembletask/transferTask',
    'mock': false,
    'methods': 'post'
  },

  // 修改组装任务信息
  wmsassembletaskUpdate: {
    'url': '/wmsassembletask/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房组装任务end=========== */

  /* =============库房组装任务转移记录start=========== */
  // 删除
  wmsassembletasktransferrecordDelete: {
    'url': '/wmsassembletasktransferrecord/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassembletasktransferrecordInfo: {
    'url': '/wmsassembletasktransferrecord/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsassembletasktransferrecordList: {
    'url': '/wmsassembletasktransferrecord/list',
    'mock': false
  },

  // 逻辑删除
  wmsassembletasktransferrecordLogicDelete: {
    'url': '/wmsassembletasktransferrecord/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsassembletasktransferrecordSave: {
    'url': '/wmsassembletasktransferrecord/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsassembletasktransferrecordUpdate: {
    'url': '/wmsassembletasktransferrecord/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房组装任务转移记录end=========== */

  /* =============库房盘点单start=========== */
  // 库房商品盘点
  wmsblitemBlitemCommodityCheck: {
    'url': '/wmsblitem/blitemCommodityCheck',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsblitemDelete: {
    'url': '/wmsblitem/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsblitemExport: {
    'url': '/wmsblitem/export',
    'mock': false,
    'methods': 'post'
  },

  // 生成报溢报损单
  wmsblitemGenerateReportingOrder: {
    'url': '/wmsblitem/generateReportingOrder',
    'mock': false,
    'methods': 'post'
  },

  // 查看盘点单详细信息
  wmsblitemInfo: {
    'url': '/wmsblitem/info/{id}',
    'mock': false
  },

  // 获取盘点单列表
  wmsblitemList: {
    'url': '/wmsblitem/list',
    'mock': false
  },

  // 逻辑删除
  wmsblitemLogicDelete: {
    'url': '/wmsblitem/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存盘点单信息
  wmsblitemSave: {
    'url': '/wmsblitem/save',
    'mock': false,
    'methods': 'post'
  },

  // 库房商品盘点
  wmsblitemStart: {
    'url': '/wmsblitem/start',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsblitemUpdate: {
    'url': '/wmsblitem/update',
    'mock': false,
    'methods': 'post'
  },

  // 终止盘点单状态信息
  wmsblitemUpdateState: {
    'url': '/wmsblitem/updateState',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房盘点单end=========== */

  /* =============库房盘点商品清单start=========== */
  // 删除
  wmsblitemcommodityDelete: {
    'url': '/wmsblitemcommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsblitemcommodityInfo: {
    'url': '/wmsblitemcommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsblitemcommodityList: {
    'url': '/wmsblitemcommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmsblitemcommodityLogicDelete: {
    'url': '/wmsblitemcommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsblitemcommoditySave: {
    'url': '/wmsblitemcommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsblitemcommodityUpdate: {
    'url': '/wmsblitemcommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房盘点商品清单end=========== */

  /* =============库房借入借商品清单start=========== */
  // 删除
  wmsborrowloancommodityDelete: {
    'url': '/wmsborrowloancommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsborrowloancommodityInfo: {
    'url': '/wmsborrowloancommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsborrowloancommodityList: {
    'url': '/wmsborrowloancommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmsborrowloancommodityLogicDelete: {
    'url': '/wmsborrowloancommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsborrowloancommoditySave: {
    'url': '/wmsborrowloancommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsborrowloancommodityUpdate: {
    'url': '/wmsborrowloancommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房借入借商品清单end=========== */

  /* =============库房借入借出单start=========== */
  // 删除
  wmsborrowloanorderDelete: {
    'url': '/wmsborrowloanorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsborrowloanorderExport: {
    'url': '/wmsborrowloanorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 获取借入借出单编号对应的商品信息
  wmsborrowloanorderGetCommodityByBorrowLoanCode: {
    'url': '/wmsborrowloanorder/getCommodityByBorrowLoanCode',
    'mock': false
  },

  // 查看借入借出单详细信息
  wmsborrowloanorderInfo: {
    'url': '/wmsborrowloanorder/info/{id}',
    'mock': false
  },

  // 获取借入借出单列表
  wmsborrowloanorderList: {
    'url': '/wmsborrowloanorder/list',
    'mock': false
  },

  // 删除借入借出单信息
  wmsborrowloanorderLogicDelete: {
    'url': '/wmsborrowloanorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 通过借入借出单审核
  wmsborrowloanorderPassAudit: {
    'url': '/wmsborrowloanorder/passAudit/{id}',
    'mock': false
  },

  // 根据编号查看借入借出单详细信息
  wmsborrowloanorderQueryInfoByOrderCode: {
    'url': '/wmsborrowloanorder/queryInfoByOrderCode/{borrowLoanOrderCode}',
    'mock': false
  },

  // 驳回借入借出单审核
  wmsborrowloanorderRejectAudit: {
    'url': '/wmsborrowloanorder/rejectAudit/{id}',
    'mock': false
  },

  // 撤销借入借出单审核
  wmsborrowloanorderRevocationAudit: {
    'url': '/wmsborrowloanorder/revocationAudit/{id}',
    'mock': false
  },

  // 保存借入借出单信息
  wmsborrowloanorderSave: {
    'url': '/wmsborrowloanorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交借入借出单审核
  wmsborrowloanorderSubmitAudit: {
    'url': '/wmsborrowloanorder/submitAudit/{id}',
    'mock': false
  },

  // 终止借入借出单信息
  wmsborrowloanorderTerminationOrder: {
    'url': '/wmsborrowloanorder/terminationOrder/{id}',
    'mock': false
  },

  // 修改借入借出单信息
  wmsborrowloanorderUpdate: {
    'url': '/wmsborrowloanorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房借入借出单end=========== */

  /* =============库房借入借任务start=========== */
  // 归还商品
  wmsborrowloantaskBackCommodity: {
    'url': '/wmsborrowloantask/backCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 借入商品
  wmsborrowloantaskBorrowCommodity: {
    'url': '/wmsborrowloantask/borrowCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsborrowloantaskDelete: {
    'url': '/wmsborrowloantask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsborrowloantaskExport: {
    'url': '/wmsborrowloantask/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  wmsborrowloantaskInfo: {
    'url': '/wmsborrowloantask/info/{id}',
    'mock': false
  },

  // 获取借入借任务列表
  wmsborrowloantaskList: {
    'url': '/wmsborrowloantask/list',
    'mock': false
  },

  // 借出商品
  wmsborrowloantaskLoanCommodity: {
    'url': '/wmsborrowloantask/loanCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 逻辑删除
  wmsborrowloantaskLogicDelete: {
    'url': '/wmsborrowloantask/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 返还商品
  wmsborrowloantaskReturnCommodity: {
    'url': '/wmsborrowloantask/returnCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  wmsborrowloantaskSave: {
    'url': '/wmsborrowloantask/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsborrowloantaskUpdate: {
    'url': '/wmsborrowloantask/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房借入借任务end=========== */

  /* =============库房拆卸商品清单start=========== */
  // 删除
  wmsdisassemblycommodityDelete: {
    'url': '/wmsdisassemblycommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsdisassemblycommodityInfo: {
    'url': '/wmsdisassemblycommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsdisassemblycommodityList: {
    'url': '/wmsdisassemblycommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmsdisassemblycommodityLogicDelete: {
    'url': '/wmsdisassemblycommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsdisassemblycommoditySave: {
    'url': '/wmsdisassemblycommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsdisassemblycommodityUpdate: {
    'url': '/wmsdisassemblycommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房拆卸商品清单end=========== */

  /* =============库房拆卸单start=========== */
  // 删除
  wmsdisassemblyorderDelete: {
    'url': '/wmsdisassemblyorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsdisassemblyorderExport: {
    'url': '/wmsdisassemblyorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 生成拆卸任务
  wmsdisassemblyorderGenerateTask: {
    'url': '/wmsdisassemblyorder/generateTask',
    'mock': false,
    'methods': 'post'
  },

  // 查看拆卸单详细信息
  wmsdisassemblyorderInfo: {
    'url': '/wmsdisassemblyorder/info/{id}',
    'mock': false
  },

  // 获取拆卸单列表
  wmsdisassemblyorderList: {
    'url': '/wmsdisassemblyorder/list',
    'mock': false
  },

  // 删除拆卸单信息
  wmsdisassemblyorderLogicDelete: {
    'url': '/wmsdisassemblyorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 根据编号查看拆卸单详细信息
  wmsdisassemblyorderQueryInfoByOrderCode: {
    'url': '/wmsdisassemblyorder/queryInfoByOrderCode/{disassemblyOrderCode}',
    'mock': false
  },

  // 保存拆卸单信息
  wmsdisassemblyorderSave: {
    'url': '/wmsdisassemblyorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 终止拆卸单信息
  wmsdisassemblyorderTermination: {
    'url': '/wmsdisassemblyorder/termination/{id}',
    'mock': false
  },

  // 修改拆卸单信息
  wmsdisassemblyorderUpdate: {
    'url': '/wmsdisassemblyorder/update',
    'mock': false,
    'methods': 'post'
  },

  // 调整拆卸任务生成顺序
  wmsdisassemblyorderUpdatesSquence: {
    'url': '/wmsdisassemblyorder/updatesSquence',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房拆卸单end=========== */

  /* =============库房拆卸任务start=========== */
  // 继续拆卸任务
  wmsdisassemblytaskContinueTask: {
    'url': '/wmsdisassemblytask/continueTask',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsdisassemblytaskDelete: {
    'url': '/wmsdisassemblytask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsdisassemblytaskExport: {
    'url': '/wmsdisassemblytask/export',
    'mock': false,
    'methods': 'post'
  },

  // 挂起拆卸任务
  wmsdisassemblytaskHangTask: {
    'url': '/wmsdisassemblytask/hangTask',
    'mock': false,
    'methods': 'post'
  },

  // 查看拆卸任务详细信息
  wmsdisassemblytaskInfo: {
    'url': '/wmsdisassemblytask/info/{id}',
    'mock': false
  },

  // 获取拆卸任务列表
  wmsdisassemblytaskList: {
    'url': '/wmsdisassemblytask/list',
    'mock': false
  },

  // 逻辑删除
  wmsdisassemblytaskLogicDelete: {
    'url': '/wmsdisassemblytask/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 拆卸入库商品
  wmsdisassemblytaskPutawayCommodity: {
    'url': '/wmsdisassemblytask/putawayCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 根据任务编号查看拆卸任务详细信息
  wmsdisassemblytaskQueryInfoByTaskCode: {
    'url': '/wmsdisassemblytask/queryInfoByTaskCode/{disassemblyTaskCode}',
    'mock': false
  },

  // 保存
  wmsdisassemblytaskSave: {
    'url': '/wmsdisassemblytask/save',
    'mock': false,
    'methods': 'post'
  },

  // 确认并开始拆卸任务
  wmsdisassemblytaskStart: {
    'url': '/wmsdisassemblytask/start/{id}',
    'mock': false
  },

  // 修改拆卸任务信息
  wmsdisassemblytaskUpdate: {
    'url': '/wmsdisassemblytask/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房拆卸任务end=========== */

  /* =============库房流水记录start=========== */
  // 查看库房流水详细信息
  wmsflowrecordInfo: {
    'url': '/wmsflowrecord/info/{id}',
    'mock': false
  },

  // 获取库房流水记录列表
  wmsflowrecordList: {
    'url': '/wmsflowrecord/list',
    'mock': false
  },

  // 保存库房流水信息
  wmsflowrecordSave: {
    'url': '/wmsflowrecord/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房流水记录end=========== */

  /* =============库房商品清单start=========== */
  // 导出
  wmsinventoryExport: {
    'url': '/wmsinventory/export',
    'mock': false,
    'methods': 'post'
  },

  // 获取库房商品清单列表
  wmsinventoryList: {
    'url': '/wmsinventory/list',
    'mock': false
  },

  // 删除库房商品信息
  wmsinventoryLogicDelete: {
    'url': '/wmsinventory/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看库房分布信息
  wmsinventoryQueryInventoryDistribution: {
    'url': '/wmsinventory/queryInventoryDistribution',
    'mock': false
  },

  // 保存库房商品信息
  wmsinventorySave: {
    'url': '/wmsinventory/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房商品清单end=========== */

  /* =============库房商品期初信息start=========== */
  // 查看商品期初详细信息
  wmsinventorycommodityinitialinfoInfo: {
    'url': '/wmsinventorycommodityinitialinfo/info/{commodityCode}',
    'mock': false
  },
  /* =============库房商品期初信息end=========== */

  /* =============库房商品明细start=========== */
  // 批量扫码入库
  wmsinventorydetailBatchPutaway: {
    'url': '/wmsinventorydetail/batchPutaway',
    'mock': false,
    'methods': 'post'
  },

  // 批量扫码出库
  wmsinventorydetailBatchShipment: {
    'url': '/wmsinventorydetail/batchShipment',
    'mock': false,
    'methods': 'post'
  },

  // 批量商品入库
  wmsinventorydetailBatchSsave: {
    'url': '/wmsinventorydetail/batchSsave',
    'mock': false,
    'methods': 'post'
  },

  // 批量扫码出库
  wmsinventorydetailBatchUpdate: {
    'url': '/wmsinventorydetail/batchUpdate',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsinventorydetailDelete: {
    'url': '/wmsinventorydetail/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 根据SN码或机器号查询商品
  wmsinventorydetailGetCommodityBySnCode: {
    'url': '/wmsinventorydetail/getCommodityBySnCode',
    'mock': false,
    'methods': 'post'
  },

  // 根据SN码或机器号查询商品
  wmsinventorydetailGetCommodityBySnCode: {
    'url': '/wmsinventorydetail/getCommodityBySnCode',
    'mock': false
  },

  // 查看详细信息
  wmsinventorydetailInfo: {
    'url': '/wmsinventorydetail/info/{id}',
    'mock': false
  },

  // 期初商品入库
  wmsinventorydetailInitializePutaway: {
    'url': '/wmsinventorydetail/initializePutaway',
    'mock': false,
    'methods': 'post'
  },

  // 获取库房可用商品列表
  wmsinventorydetailList: {
    'url': '/wmsinventorydetail/list',
    'mock': false
  },

  // 逻辑删除
  wmsinventorydetailLogicDelete: {
    'url': '/wmsinventorydetail/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 商品扫码入库校验
  wmsinventorydetailPutawayCommodityCheck: {
    'url': '/wmsinventorydetail/putawayCommodityCheck',
    'mock': false,
    'methods': 'post'
  },

  // 商品入库
  wmsinventorydetailSave: {
    'url': '/wmsinventorydetail/save',
    'mock': false,
    'methods': 'post'
  },

  // 商品扫码出库校验
  wmsinventorydetailShipmentCommodityCheck: {
    'url': '/wmsinventorydetail/shipmentCommodityCheck',
    'mock': false,
    'methods': 'post'
  },

  // 扫码出库
  wmsinventorydetailUpdate: {
    'url': '/wmsinventorydetail/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房商品明细end=========== */

  /* =============库房拣货商品清单start=========== */
  // 删除
  wmspickingcommodityDelete: {
    'url': '/wmspickingcommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmspickingcommodityInfo: {
    'url': '/wmspickingcommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmspickingcommodityList: {
    'url': '/wmspickingcommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmspickingcommodityLogicDelete: {
    'url': '/wmspickingcommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmspickingcommoditySave: {
    'url': '/wmspickingcommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmspickingcommodityUpdate: {
    'url': '/wmspickingcommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房拣货商品清单end=========== */

  /* =============库房拣货单start=========== */
  // 拣货单批量扫码出库
  wmspickingorderBatchShipment: {
    'url': '/wmspickingorder/batchShipment',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmspickingorderDelete: {
    'url': '/wmspickingorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmspickingorderExport: {
    'url': '/wmspickingorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看拣货单详细信息
  wmspickingorderInfo: {
    'url': '/wmspickingorder/info/{id}',
    'mock': false
  },

  // 获取拣货单列表
  wmspickingorderList: {
    'url': '/wmspickingorder/list',
    'mock': false
  },

  // 逻辑删除
  wmspickingorderLogicDelete: {
    'url': '/wmspickingorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存拣货单信息
  wmspickingorderSave: {
    'url': '/wmspickingorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 拣货单扫码出库校验
  wmspickingorderShipmentCommodityCheck: {
    'url': '/wmspickingorder/shipmentCommodityCheck',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmspickingorderUpdate: {
    'url': '/wmspickingorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房拣货单end=========== */

  /* =============库房报溢报损单start=========== */
  // 删除
  wmsreportinglossesDelete: {
    'url': '/wmsreportinglosses/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsreportinglossesExport: {
    'url': '/wmsreportinglosses/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看报溢报损单详细信息
  wmsreportinglossesInfo: {
    'url': '/wmsreportinglosses/info/{id}',
    'mock': false
  },

  // 获取报溢报损单列表
  wmsreportinglossesList: {
    'url': '/wmsreportinglosses/list',
    'mock': false
  },

  // 逻辑删除
  wmsreportinglossesLogicDelete: {
    'url': '/wmsreportinglosses/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存报溢报损单信息
  wmsreportinglossesSave: {
    'url': '/wmsreportinglosses/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsreportinglossesUpdate: {
    'url': '/wmsreportinglosses/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房报溢报损单end=========== */

  /* =============库房发货物流start=========== */
  // 删除
  wmsshipmentslogisticsDelete: {
    'url': '/wmsshipmentslogistics/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsshipmentslogisticsInfo: {
    'url': '/wmsshipmentslogistics/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsshipmentslogisticsList: {
    'url': '/wmsshipmentslogistics/list',
    'mock': false
  },

  // 逻辑删除
  wmsshipmentslogisticsLogicDelete: {
    'url': '/wmsshipmentslogistics/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsshipmentslogisticsSave: {
    'url': '/wmsshipmentslogistics/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsshipmentslogisticsUpdate: {
    'url': '/wmsshipmentslogistics/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房发货物流end=========== */

  /* =============库房发货单start=========== */
  // 导出
  wmsshipmentsorderExport: {
    'url': '/wmsshipmentsorder/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看库房发货单详细信息
  wmsshipmentsorderInfo: {
    'url': '/wmsshipmentsorder/info/{id}',
    'mock': false
  },

  // 获取库房发货单列表
  wmsshipmentsorderList: {
    'url': '/wmsshipmentsorder/list',
    'mock': false
  },

  // 保存库房发货单信息
  wmsshipmentsorderSave: {
    'url': '/wmsshipmentsorder/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房发货单end=========== */

  /* =============库房换货商品清单start=========== */
  // 删除
  wmsswapcommodityDelete: {
    'url': '/wmsswapcommodity/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsswapcommodityInfo: {
    'url': '/wmsswapcommodity/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsswapcommodityList: {
    'url': '/wmsswapcommodity/list',
    'mock': false
  },

  // 逻辑删除
  wmsswapcommodityLogicDelete: {
    'url': '/wmsswapcommodity/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsswapcommoditySave: {
    'url': '/wmsswapcommodity/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsswapcommodityUpdate: {
    'url': '/wmsswapcommodity/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房换货商品清单end=========== */

  /* =============库房换货单start=========== */
  // 撤销审核
  wmsswaporderCancel: {
    'url': '/wmsswaporder/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  wmsswaporderDelete: {
    'url': '/wmsswaporder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsswaporderExport: {
    'url': '/wmsswaporder/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息根据CODE
  wmsswaporderGetByCode: {
    'url': '/wmsswaporder/getByCode/{code}',
    'mock': false
  },

  // 查看详细信息
  wmsswaporderInfo: {
    'url': '/wmsswaporder/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsswaporderList: {
    'url': '/wmsswaporder/list',
    'mock': false
  },

  // 逻辑删除
  wmsswaporderLogicDelete: {
    'url': '/wmsswaporder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 审核通过
  wmsswaporderPassApproval: {
    'url': '/wmsswaporder/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  wmsswaporderReject: {
    'url': '/wmsswaporder/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  wmsswaporderSave: {
    'url': '/wmsswaporder/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  wmsswaporderSubmitApproval: {
    'url': '/wmsswaporder/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsswaporderUpdate: {
    'url': '/wmsswaporder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房换货单end=========== */

  /* =============库房换货任务start=========== */
  // 删除
  wmsswaptaskDelete: {
    'url': '/wmsswaptask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  wmsswaptaskExport: {
    'url': '/wmsswaptask/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  wmsswaptaskInfo: {
    'url': '/wmsswaptask/info/{id}',
    'mock': false
  },

  // 获取换货任务列表
  wmsswaptaskList: {
    'url': '/wmsswaptask/list',
    'mock': false
  },

  // 逻辑删除
  wmsswaptaskLogicDelete: {
    'url': '/wmsswaptask/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsswaptaskSave: {
    'url': '/wmsswaptask/save',
    'mock': false,
    'methods': 'post'
  },

  // 商品换货出入库
  wmsswaptaskSwapCommodity: {
    'url': '/wmsswaptask/swapCommodity',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsswaptaskUpdate: {
    'url': '/wmsswaptask/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房换货任务end=========== */

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