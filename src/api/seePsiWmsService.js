const MOCK_ADDRESS = '/mock/5dbcfaabbc54fc3da273f1dc/psi'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============库房管理start=========== */
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

  // 查看详细信息
  wmsassembleorderInfo: {
    'url': '/wmsassembleorder/info/{id}',
    'mock': false
  },

  // 获取列表
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

  // 保存
  wmsassembleorderSave: {
    'url': '/wmsassembleorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsassembleorderUpdate: {
    'url': '/wmsassembleorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房组装单end=========== */

  /* =============库房组装任务start=========== */
  // 删除
  wmsassembletaskDelete: {
    'url': '/wmsassembletask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassembletaskInfo: {
    'url': '/wmsassembletask/info/{id}',
    'mock': false
  },

  // 获取列表
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

  // 保存
  wmsassembletaskSave: {
    'url': '/wmsassembletask/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
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
  // 删除
  wmsblitemDelete: {
    'url': '/wmsblitem/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsblitemInfo: {
    'url': '/wmsblitem/info/{id}',
    'mock': false
  },

  // 获取列表
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

  // 保存
  wmsblitemSave: {
    'url': '/wmsblitem/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsblitemUpdate: {
    'url': '/wmsblitem/update',
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

  // 查看详细信息
  wmsborrowloanorderInfo: {
    'url': '/wmsborrowloanorder/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsborrowloanorderList: {
    'url': '/wmsborrowloanorder/list',
    'mock': false
  },

  // 逻辑删除
  wmsborrowloanorderLogicDelete: {
    'url': '/wmsborrowloanorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsborrowloanorderSave: {
    'url': '/wmsborrowloanorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsborrowloanorderUpdate: {
    'url': '/wmsborrowloanorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房借入借出单end=========== */

  /* =============库房借入借任务start=========== */
  // 删除
  wmsborrowloantaskDelete: {
    'url': '/wmsborrowloantask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsborrowloantaskInfo: {
    'url': '/wmsborrowloantask/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsborrowloantaskList: {
    'url': '/wmsborrowloantask/list',
    'mock': false
  },

  // 逻辑删除
  wmsborrowloantaskLogicDelete: {
    'url': '/wmsborrowloantask/logicDelete',
    'mock': false,
    'methods': 'delete'
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

  // 查看详细信息
  wmsdisassemblyorderInfo: {
    'url': '/wmsdisassemblyorder/info/{id}',
    'mock': false
  },

  // 获取列表
  wmsdisassemblyorderList: {
    'url': '/wmsdisassemblyorder/list',
    'mock': false
  },

  // 逻辑删除
  wmsdisassemblyorderLogicDelete: {
    'url': '/wmsdisassemblyorder/logicDelete',
    'mock': false,
    'methods': 'delete'
  },

  // 保存
  wmsdisassemblyorderSave: {
    'url': '/wmsdisassemblyorder/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  wmsdisassemblyorderUpdate: {
    'url': '/wmsdisassemblyorder/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============库房拆卸单end=========== */

  /* =============库房拆卸任务start=========== */
  // 删除
  wmsdisassemblytaskDelete: {
    'url': '/wmsdisassemblytask/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsdisassemblytaskInfo: {
    'url': '/wmsdisassemblytask/info/{id}',
    'mock': false
  },

  // 获取列表
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

  // 保存
  wmsdisassemblytaskSave: {
    'url': '/wmsdisassemblytask/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
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

  /* =============库房商品明细start=========== */
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
    'mock': false
  },

  // 查看详细信息
  wmsinventorydetailInfo: {
    'url': '/wmsinventorydetail/info/{id}',
    'mock': false
  },

  // 获取列表
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
  // 删除
  wmspickingorderDelete: {
    'url': '/wmspickingorder/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  wmspickingorderInfo: {
    'url': '/wmspickingorder/info/{id}',
    'mock': false
  },

  // 获取列表
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

  // 保存
  wmspickingorderSave: {
    'url': '/wmspickingorder/save',
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
  // 删除
  wmsswaporderDelete: {
    'url': '/wmsswaporder/delete',
    'mock': false,
    'methods': 'delete'
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

  // 保存
  wmsswaporderSave: {
    'url': '/wmsswaporder/save',
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

  // 查看详细信息
  wmsswaptaskInfo: {
    'url': '/wmsswaptask/info/{id}',
    'mock': false
  },

  // 获取列表
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