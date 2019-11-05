/*
 * @Author: 高大鹏
 * @Date: 2019-11-02 11:41:15
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-05 16:44:01
 * @Description: description
 */
const MOCK_ADDRESS = '/mock/5dbcfaabbc54fc3da273f1dc/psi'
const IS_MOCK = false
export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============库房管理start=========== */
  // 查看库房详细信息
  commonwmsmanagerInfo: {
    'url': '/commonwmsmanager/info/{id}',
    'mock': IS_MOCK
  },

  // 获取库房列表
  commonwmsmanagerList: {
    'url': '/commonwmsmanager/list',
    'mock': IS_MOCK
  },

  // 删除库房信息
  commonwmsmanagerLogicDelete: {
    'url': '/commonwmsmanager/logicDelete',
    'mock': IS_MOCK,
    'methods': 'delete'
  },

  // 保存库房信息
  commonwmsmanagerSave: {
    'url': '/commonwmsmanager/save',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改库房信息
  commonwmsmanagerUpdate: {
    'url': '/commonwmsmanager/update',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 修改库房状态
  commonwmsmanagerUpdateState: {
    'url': '/commonwmsmanager/updateState',
    'mock': IS_MOCK,
    'methods': 'post'
  },

  // 获取当前可用库房列表
  commonwmsmanagerUsableList: {
    'url': '/commonwmsmanager/usableList',
    'mock': true
  },
  /* =============库房管理end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': true,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============库房调拨商品清单start=========== */
  // 删除
  wmsallocationcommodityDelete: {
    'url': '/wmsallocationcommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsallocationcommodityInfo: {
    'url': '/wmsallocationcommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsallocationcommodityList: {
    'url': '/wmsallocationcommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmsallocationcommodityLogicDelete: {
    'url': '/wmsallocationcommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsallocationcommoditySave: {
    'url': '/wmsallocationcommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsallocationcommodityUpdate: {
    'url': '/wmsallocationcommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房调拨商品清单end=========== */

  /* =============库房调拨单start=========== */
  // 删除
  wmsallocationorderDelete: {
    'url': '/wmsallocationorder/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsallocationorderInfo: {
    'url': '/wmsallocationorder/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsallocationorderList: {
    'url': '/wmsallocationorder/list',
    'mock': true
  },

  // 逻辑删除
  wmsallocationorderLogicDelete: {
    'url': '/wmsallocationorder/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsallocationorderSave: {
    'url': '/wmsallocationorder/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsallocationorderUpdate: {
    'url': '/wmsallocationorder/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房调拨单end=========== */

  /* =============库房组装商品清单start=========== */
  // 删除
  wmsassemblecommodityDelete: {
    'url': '/wmsassemblecommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassemblecommodityInfo: {
    'url': '/wmsassemblecommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsassemblecommodityList: {
    'url': '/wmsassemblecommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmsassemblecommodityLogicDelete: {
    'url': '/wmsassemblecommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsassemblecommoditySave: {
    'url': '/wmsassemblecommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsassemblecommodityUpdate: {
    'url': '/wmsassemblecommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房组装商品清单end=========== */

  /* =============库房组装单start=========== */
  // 删除
  wmsassembleorderDelete: {
    'url': '/wmsassembleorder/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassembleorderInfo: {
    'url': '/wmsassembleorder/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsassembleorderList: {
    'url': '/wmsassembleorder/list',
    'mock': true
  },

  // 逻辑删除
  wmsassembleorderLogicDelete: {
    'url': '/wmsassembleorder/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsassembleorderSave: {
    'url': '/wmsassembleorder/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsassembleorderUpdate: {
    'url': '/wmsassembleorder/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房组装单end=========== */

  /* =============库房组装任务start=========== */
  // 删除
  wmsassembletaskDelete: {
    'url': '/wmsassembletask/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassembletaskInfo: {
    'url': '/wmsassembletask/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsassembletaskList: {
    'url': '/wmsassembletask/list',
    'mock': true
  },

  // 逻辑删除
  wmsassembletaskLogicDelete: {
    'url': '/wmsassembletask/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsassembletaskSave: {
    'url': '/wmsassembletask/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsassembletaskUpdate: {
    'url': '/wmsassembletask/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房组装任务end=========== */

  /* =============库房组装任务转移记录start=========== */
  // 删除
  wmsassembletasktransferrecordDelete: {
    'url': '/wmsassembletasktransferrecord/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsassembletasktransferrecordInfo: {
    'url': '/wmsassembletasktransferrecord/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsassembletasktransferrecordList: {
    'url': '/wmsassembletasktransferrecord/list',
    'mock': true
  },

  // 逻辑删除
  wmsassembletasktransferrecordLogicDelete: {
    'url': '/wmsassembletasktransferrecord/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsassembletasktransferrecordSave: {
    'url': '/wmsassembletasktransferrecord/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsassembletasktransferrecordUpdate: {
    'url': '/wmsassembletasktransferrecord/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房组装任务转移记录end=========== */

  /* =============库房盘点单start=========== */
  // 删除
  wmsblitemDelete: {
    'url': '/wmsblitem/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsblitemInfo: {
    'url': '/wmsblitem/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsblitemList: {
    'url': '/wmsblitem/list',
    'mock': true
  },

  // 逻辑删除
  wmsblitemLogicDelete: {
    'url': '/wmsblitem/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsblitemSave: {
    'url': '/wmsblitem/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsblitemUpdate: {
    'url': '/wmsblitem/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房盘点单end=========== */

  /* =============库房盘点商品清单start=========== */
  // 删除
  wmsblitemcommodityDelete: {
    'url': '/wmsblitemcommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsblitemcommodityInfo: {
    'url': '/wmsblitemcommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsblitemcommodityList: {
    'url': '/wmsblitemcommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmsblitemcommodityLogicDelete: {
    'url': '/wmsblitemcommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsblitemcommoditySave: {
    'url': '/wmsblitemcommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsblitemcommodityUpdate: {
    'url': '/wmsblitemcommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房盘点商品清单end=========== */

  /* =============库房借入借商品清单start=========== */
  // 删除
  wmsborrowloancommodityDelete: {
    'url': '/wmsborrowloancommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsborrowloancommodityInfo: {
    'url': '/wmsborrowloancommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsborrowloancommodityList: {
    'url': '/wmsborrowloancommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmsborrowloancommodityLogicDelete: {
    'url': '/wmsborrowloancommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsborrowloancommoditySave: {
    'url': '/wmsborrowloancommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsborrowloancommodityUpdate: {
    'url': '/wmsborrowloancommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房借入借商品清单end=========== */

  /* =============库房借入借出单start=========== */
  // 删除
  wmsborrowloanorderDelete: {
    'url': '/wmsborrowloanorder/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsborrowloanorderInfo: {
    'url': '/wmsborrowloanorder/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsborrowloanorderList: {
    'url': '/wmsborrowloanorder/list',
    'mock': true
  },

  // 逻辑删除
  wmsborrowloanorderLogicDelete: {
    'url': '/wmsborrowloanorder/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsborrowloanorderSave: {
    'url': '/wmsborrowloanorder/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsborrowloanorderUpdate: {
    'url': '/wmsborrowloanorder/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房借入借出单end=========== */

  /* =============库房借入借任务start=========== */
  // 删除
  wmsborrowloantaskDelete: {
    'url': '/wmsborrowloantask/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsborrowloantaskInfo: {
    'url': '/wmsborrowloantask/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsborrowloantaskList: {
    'url': '/wmsborrowloantask/list',
    'mock': true
  },

  // 逻辑删除
  wmsborrowloantaskLogicDelete: {
    'url': '/wmsborrowloantask/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsborrowloantaskSave: {
    'url': '/wmsborrowloantask/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsborrowloantaskUpdate: {
    'url': '/wmsborrowloantask/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房借入借任务end=========== */

  /* =============库房拆卸商品清单start=========== */
  // 删除
  wmsdisassemblycommodityDelete: {
    'url': '/wmsdisassemblycommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsdisassemblycommodityInfo: {
    'url': '/wmsdisassemblycommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsdisassemblycommodityList: {
    'url': '/wmsdisassemblycommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmsdisassemblycommodityLogicDelete: {
    'url': '/wmsdisassemblycommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsdisassemblycommoditySave: {
    'url': '/wmsdisassemblycommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsdisassemblycommodityUpdate: {
    'url': '/wmsdisassemblycommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房拆卸商品清单end=========== */

  /* =============库房拆卸单start=========== */
  // 删除
  wmsdisassemblyorderDelete: {
    'url': '/wmsdisassemblyorder/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsdisassemblyorderInfo: {
    'url': '/wmsdisassemblyorder/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsdisassemblyorderList: {
    'url': '/wmsdisassemblyorder/list',
    'mock': true
  },

  // 逻辑删除
  wmsdisassemblyorderLogicDelete: {
    'url': '/wmsdisassemblyorder/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsdisassemblyorderSave: {
    'url': '/wmsdisassemblyorder/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsdisassemblyorderUpdate: {
    'url': '/wmsdisassemblyorder/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房拆卸单end=========== */

  /* =============库房拆卸任务start=========== */
  // 删除
  wmsdisassemblytaskDelete: {
    'url': '/wmsdisassemblytask/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsdisassemblytaskInfo: {
    'url': '/wmsdisassemblytask/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsdisassemblytaskList: {
    'url': '/wmsdisassemblytask/list',
    'mock': true
  },

  // 逻辑删除
  wmsdisassemblytaskLogicDelete: {
    'url': '/wmsdisassemblytask/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsdisassemblytaskSave: {
    'url': '/wmsdisassemblytask/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsdisassemblytaskUpdate: {
    'url': '/wmsdisassemblytask/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房拆卸任务end=========== */

  /* =============库房流水记录start=========== */
  // 查看库房流水详细信息
  wmsflowrecordInfo: {
    'url': '/wmsflowrecord/info/{id}',
    'mock': true
  },

  // 获取库房流水记录列表
  wmsflowrecordList: {
    'url': '/wmsflowrecord/list',
    'mock': true
  },

  // 保存库房流水信息
  wmsflowrecordSave: {
    'url': '/wmsflowrecord/save',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房流水记录end=========== */

  /* =============库房商品清单start=========== */
  // 获取库房商品清单列表
  wmsinventoryList: {
    'url': '/wmsinventory/list',
    'mock': true
  },

  // 删除库房商品信息
  wmsinventoryLogicDelete: {
    'url': '/wmsinventory/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存库房商品信息
  wmsinventorySave: {
    'url': '/wmsinventory/save',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房商品清单end=========== */

  /* =============库房商品明细start=========== */
  // 删除
  wmsinventorydetailDelete: {
    'url': '/wmsinventorydetail/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsinventorydetailInfo: {
    'url': '/wmsinventorydetail/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsinventorydetailList: {
    'url': '/wmsinventorydetail/list',
    'mock': true
  },

  // 逻辑删除
  wmsinventorydetailLogicDelete: {
    'url': '/wmsinventorydetail/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 商品入库
  wmsinventorydetailSave: {
    'url': '/wmsinventorydetail/save',
    'mock': true,
    'methods': 'post'
  },

  // 扫码出库
  wmsinventorydetailUpdate: {
    'url': '/wmsinventorydetail/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房商品明细end=========== */

  /* =============库房拣货商品清单start=========== */
  // 删除
  wmspickingcommodityDelete: {
    'url': '/wmspickingcommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmspickingcommodityInfo: {
    'url': '/wmspickingcommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmspickingcommodityList: {
    'url': '/wmspickingcommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmspickingcommodityLogicDelete: {
    'url': '/wmspickingcommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmspickingcommoditySave: {
    'url': '/wmspickingcommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmspickingcommodityUpdate: {
    'url': '/wmspickingcommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房拣货商品清单end=========== */

  /* =============库房拣货单start=========== */
  // 删除
  wmspickingorderDelete: {
    'url': '/wmspickingorder/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmspickingorderInfo: {
    'url': '/wmspickingorder/info/{id}',
    'mock': true
  },

  // 获取列表
  wmspickingorderList: {
    'url': '/wmspickingorder/list',
    'mock': true
  },

  // 逻辑删除
  wmspickingorderLogicDelete: {
    'url': '/wmspickingorder/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmspickingorderSave: {
    'url': '/wmspickingorder/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmspickingorderUpdate: {
    'url': '/wmspickingorder/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房拣货单end=========== */

  /* =============库房报溢报损单start=========== */
  // 删除
  wmsreportinglossesDelete: {
    'url': '/wmsreportinglosses/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsreportinglossesInfo: {
    'url': '/wmsreportinglosses/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsreportinglossesList: {
    'url': '/wmsreportinglosses/list',
    'mock': true
  },

  // 逻辑删除
  wmsreportinglossesLogicDelete: {
    'url': '/wmsreportinglosses/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsreportinglossesSave: {
    'url': '/wmsreportinglosses/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsreportinglossesUpdate: {
    'url': '/wmsreportinglosses/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房报溢报损单end=========== */

  /* =============库房发货物流start=========== */
  // 删除
  wmsshipmentslogisticsDelete: {
    'url': '/wmsshipmentslogistics/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsshipmentslogisticsInfo: {
    'url': '/wmsshipmentslogistics/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsshipmentslogisticsList: {
    'url': '/wmsshipmentslogistics/list',
    'mock': true
  },

  // 逻辑删除
  wmsshipmentslogisticsLogicDelete: {
    'url': '/wmsshipmentslogistics/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsshipmentslogisticsSave: {
    'url': '/wmsshipmentslogistics/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsshipmentslogisticsUpdate: {
    'url': '/wmsshipmentslogistics/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房发货物流end=========== */

  /* =============库房发货单start=========== */
  // 查看库房发货单详细信息
  wmsshipmentsorderInfo: {
    'url': '/wmsshipmentsorder/info/{id}',
    'mock': true
  },

  // 获取库房发货单列表
  wmsshipmentsorderList: {
    'url': '/wmsshipmentsorder/list',
    'mock': true
  },

  // 保存库房发货单信息
  wmsshipmentsorderSave: {
    'url': '/wmsshipmentsorder/save',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房发货单end=========== */

  /* =============库房换货商品清单start=========== */
  // 删除
  wmsswapcommodityDelete: {
    'url': '/wmsswapcommodity/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsswapcommodityInfo: {
    'url': '/wmsswapcommodity/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsswapcommodityList: {
    'url': '/wmsswapcommodity/list',
    'mock': true
  },

  // 逻辑删除
  wmsswapcommodityLogicDelete: {
    'url': '/wmsswapcommodity/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsswapcommoditySave: {
    'url': '/wmsswapcommodity/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsswapcommodityUpdate: {
    'url': '/wmsswapcommodity/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房换货商品清单end=========== */

  /* =============库房换货单start=========== */
  // 删除
  wmsswaporderDelete: {
    'url': '/wmsswaporder/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsswaporderInfo: {
    'url': '/wmsswaporder/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsswaporderList: {
    'url': '/wmsswaporder/list',
    'mock': true
  },

  // 逻辑删除
  wmsswaporderLogicDelete: {
    'url': '/wmsswaporder/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsswaporderSave: {
    'url': '/wmsswaporder/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsswaporderUpdate: {
    'url': '/wmsswaporder/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房换货单end=========== */

  /* =============库房换货任务start=========== */
  // 删除
  wmsswaptaskDelete: {
    'url': '/wmsswaptask/delete',
    'mock': true,
    'methods': 'delete'
  },

  // 查看详细信息
  wmsswaptaskInfo: {
    'url': '/wmsswaptask/info/{id}',
    'mock': true
  },

  // 获取列表
  wmsswaptaskList: {
    'url': '/wmsswaptask/list',
    'mock': true
  },

  // 逻辑删除
  wmsswaptaskLogicDelete: {
    'url': '/wmsswaptask/logicDelete',
    'mock': true,
    'methods': 'delete'
  },

  // 保存
  wmsswaptaskSave: {
    'url': '/wmsswaptask/save',
    'mock': true,
    'methods': 'post'
  },

  // 修改
  wmsswaptaskUpdate: {
    'url': '/wmsswaptask/update',
    'mock': true,
    'methods': 'post'
  },
  /* =============库房换货任务end=========== */

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
