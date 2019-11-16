// const MOCK_ADDRESS = '/mock/5dbf808ebc54fc3da273f27e/39.99.132.95:9211'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5dbf808ebc54fc3da273f27e/39.99.132.95:9211'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-11-16
* @host 39.99.132.95:9211
*/
export default {
    __mockAddress: MOCK_ADDRESS,

    /**
     * @tag 库房管理
     * @description 查看库房详细信息
     */
    commonwmsmanagerInfo: {
        url: '/commonwmsmanager/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 获取库房列表
     */
    commonwmsmanagerList: {
        url: '/commonwmsmanager/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 删除库房信息
     */
    commonwmsmanagerLogicDelete: {
        url: '/commonwmsmanager/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 保存库房信息
     */
    commonwmsmanagerSave: {
        url: '/commonwmsmanager/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 修改库房信息
     */
    commonwmsmanagerUpdate: {
        url: '/commonwmsmanager/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 修改库房状态
     */
    commonwmsmanagerUpdateState: {
        url: '/commonwmsmanager/updateState',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 获取当前可用库房列表
     */
    commonwmsmanagerUsableList: {
        url: '/commonwmsmanager/usableList',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag process-event-controller
     * @description allListenerConfig
     */
    processEventAllListenerConfig: {
        url: '/processEvent/allListenerConfig/{processType}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag process-event-controller
     * @description onProcessEvent
     */
    processEventOnProcessEvent: {
        url: '/processEvent/onProcessEvent/{processType}',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag RocketMQ失败重试
     * @description 重试失败消息
     */
    rocketMQRetryFailedMessage: {
        url: '/rocketMQ/retryFailedMessage/{className}',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 批量商品入库
     */
    wmsallocationorderBatchSsave: {
        url: '/wmsallocationorder/batchSsave',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 批量扫码出库
     */
    wmsallocationorderBatchUpdate: {
        url: '/wmsallocationorder/batchUpdate',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 查看库房调拨单详细信息
     */
    wmsallocationorderInfo: {
        url: '/wmsallocationorder/info/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 获取库房调拨单列表
     */
    wmsallocationorderList: {
        url: '/wmsallocationorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 保存库房调拨单信息
     */
    wmsallocationorderSave: {
        url: '/wmsallocationorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 调拨单商品扫码调出校验
     */
    wmsallocationorderShipmentCommodityCheck: {
        url: '/wmsallocationorder/shipmentCommodityCheck',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 临时商品统计
     */
    wmsallocationorderTempCommodityCount: {
        url: '/wmsallocationorder/tempCommodityCount',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房调拨单
     * @description 修改库房调拨单状态信息
     */
    wmsallocationorderUpdateOrderState: {
        url: '/wmsallocationorder/updateOrderState',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装商品清单
     * @description 删除
     */
    wmsassemblecommodityDelete: {
        url: '/wmsassemblecommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装商品清单
     * @description 查看详细信息
     */
    wmsassemblecommodityInfo: {
        url: '/wmsassemblecommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装商品清单
     * @description 获取列表
     */
    wmsassemblecommodityList: {
        url: '/wmsassemblecommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装商品清单
     * @description 逻辑删除
     */
    wmsassemblecommodityLogicDelete: {
        url: '/wmsassemblecommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装商品清单
     * @description 保存
     */
    wmsassemblecommoditySave: {
        url: '/wmsassemblecommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装商品清单
     * @description 修改
     */
    wmsassemblecommodityUpdate: {
        url: '/wmsassemblecommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 删除
     */
    wmsassembleorderDelete: {
        url: '/wmsassembleorder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 查看详细信息
     */
    wmsassembleorderInfo: {
        url: '/wmsassembleorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 获取列表
     */
    wmsassembleorderList: {
        url: '/wmsassembleorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 逻辑删除
     */
    wmsassembleorderLogicDelete: {
        url: '/wmsassembleorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 保存
     */
    wmsassembleorderSave: {
        url: '/wmsassembleorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 修改
     */
    wmsassembleorderUpdate: {
        url: '/wmsassembleorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 删除
     */
    wmsassembletaskDelete: {
        url: '/wmsassembletask/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 查看详细信息
     */
    wmsassembletaskInfo: {
        url: '/wmsassembletask/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 获取列表
     */
    wmsassembletaskList: {
        url: '/wmsassembletask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 逻辑删除
     */
    wmsassembletaskLogicDelete: {
        url: '/wmsassembletask/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 保存
     */
    wmsassembletaskSave: {
        url: '/wmsassembletask/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 修改
     */
    wmsassembletaskUpdate: {
        url: '/wmsassembletask/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务转移记录
     * @description 删除
     */
    wmsassembletasktransferrecordDelete: {
        url: '/wmsassembletasktransferrecord/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务转移记录
     * @description 查看详细信息
     */
    wmsassembletasktransferrecordInfo: {
        url: '/wmsassembletasktransferrecord/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务转移记录
     * @description 获取列表
     */
    wmsassembletasktransferrecordList: {
        url: '/wmsassembletasktransferrecord/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务转移记录
     * @description 逻辑删除
     */
    wmsassembletasktransferrecordLogicDelete: {
        url: '/wmsassembletasktransferrecord/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务转移记录
     * @description 保存
     */
    wmsassembletasktransferrecordSave: {
        url: '/wmsassembletasktransferrecord/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务转移记录
     * @description 修改
     */
    wmsassembletasktransferrecordUpdate: {
        url: '/wmsassembletasktransferrecord/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 生成报溢报损单
     */
    wmsblitemGenerateReportingOrder: {
        url: '/wmsblitem/generateReportingOrder',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 查看盘点单详细信息
     */
    wmsblitemInfo: {
        url: '/wmsblitem/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 获取盘点单列表
     */
    wmsblitemList: {
        url: '/wmsblitem/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 保存盘点单信息
     */
    wmsblitemSave: {
        url: '/wmsblitem/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 修改盘点单状态信息
     */
    wmsblitemUpdateState: {
        url: '/wmsblitem/updateState',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 获取借入借出单编号对应的商品信息
     */
    wmsborrowloanorderGetCommodityByBorrowLoanCode: {
        url: '/wmsborrowloanorder/getCommodityByBorrowLoanCode',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 查看借入借出单详细信息
     */
    wmsborrowloanorderInfo: {
        url: '/wmsborrowloanorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 获取借入借出单列表
     */
    wmsborrowloanorderList: {
        url: '/wmsborrowloanorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 删除借入借出单信息
     */
    wmsborrowloanorderLogicDelete: {
        url: '/wmsborrowloanorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 通过借入借出单审核
     */
    wmsborrowloanorderPassAudit: {
        url: '/wmsborrowloanorder/passAudit/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 根据编号查看借入借出单详细信息
     */
    wmsborrowloanorderQueryInfoByOrderCode: {
        url: '/wmsborrowloanorder/queryInfoByOrderCode/{borrowLoanOrderCode}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 驳回借入借出单审核
     */
    wmsborrowloanorderRejectAudit: {
        url: '/wmsborrowloanorder/rejectAudit/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 撤销借入借出单审核
     */
    wmsborrowloanorderRevocationAudit: {
        url: '/wmsborrowloanorder/revocationAudit/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 保存借入借出单信息
     */
    wmsborrowloanorderSave: {
        url: '/wmsborrowloanorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 提交借入借出单审核
     */
    wmsborrowloanorderSubmitAudit: {
        url: '/wmsborrowloanorder/submitAudit/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 终止借入借出单信息
     */
    wmsborrowloanorderTerminationOrder: {
        url: '/wmsborrowloanorder/terminationOrder/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 修改借入借出单信息
     */
    wmsborrowloanorderUpdate: {
        url: '/wmsborrowloanorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 归还商品
     */
    wmsborrowloantaskBackCommodity: {
        url: '/wmsborrowloantask/backCommodity',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 借入商品
     */
    wmsborrowloantaskBorrowCommodity: {
        url: '/wmsborrowloantask/borrowCommodity',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 获取借入借任务列表
     */
    wmsborrowloantaskList: {
        url: '/wmsborrowloantask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 借出商品
     */
    wmsborrowloantaskLoanCommodity: {
        url: '/wmsborrowloantask/loanCommodity',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 返还商品
     */
    wmsborrowloantaskReturnCommodity: {
        url: '/wmsborrowloantask/returnCommodity',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 生成拆卸任务
     */
    wmsdisassemblyorderGenerateTask: {
        url: '/wmsdisassemblyorder/generateTask',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 查看拆卸单详细信息
     */
    wmsdisassemblyorderInfo: {
        url: '/wmsdisassemblyorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 获取拆卸单列表
     */
    wmsdisassemblyorderList: {
        url: '/wmsdisassemblyorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 删除拆卸单信息
     */
    wmsdisassemblyorderLogicDelete: {
        url: '/wmsdisassemblyorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 根据编号查看拆卸单详细信息
     */
    wmsdisassemblyorderQueryInfoByOrderCode: {
        url: '/wmsdisassemblyorder/queryInfoByOrderCode/{disassemblyOrderCode}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 保存拆卸单信息
     */
    wmsdisassemblyorderSave: {
        url: '/wmsdisassemblyorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 修改拆卸单信息
     */
    wmsdisassemblyorderUpdate: {
        url: '/wmsdisassemblyorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 调整拆卸任务生成顺序
     */
    wmsdisassemblyorderUpdatesSquence: {
        url: '/wmsdisassemblyorder/updatesSquence',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 查看拆卸任务详细信息
     */
    wmsdisassemblytaskInfo: {
        url: '/wmsdisassemblytask/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 获取拆卸任务列表
     */
    wmsdisassemblytaskList: {
        url: '/wmsdisassemblytask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 修改拆卸任务信息
     */
    wmsdisassemblytaskUpdate: {
        url: '/wmsdisassemblytask/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房流水记录
     * @description 获取库房流水记录列表
     */
    wmsflowrecordList: {
        url: '/wmsflowrecord/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房流水记录
     * @description 保存库房流水信息
     */
    wmsflowrecordSave: {
        url: '/wmsflowrecord/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品清单
     * @description 获取库房商品清单列表
     */
    wmsinventoryList: {
        url: '/wmsinventory/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房商品清单
     * @description 查看库房分布信息
     */
    wmsinventoryQueryInventoryDistribution: {
        url: '/wmsinventory/queryInventoryDistribution',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房商品清单
     * @description 保存库房商品信息
     */
    wmsinventorySave: {
        url: '/wmsinventory/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品期初信息
     * @description 查看商品期初详细信息
     */
    wmsinventorycommodityinitialinfoInfo: {
        url: '/wmsinventorycommodityinitialinfo/info/{commodityCode}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 批量扫码入库
     */
    wmsinventorydetailBatchPutaway: {
        url: '/wmsinventorydetail/batchPutaway',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 批量扫码出库
     */
    wmsinventorydetailBatchShipment: {
        url: '/wmsinventorydetail/batchShipment',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 根据SN码或机器号查询商品
     */
    wmsinventorydetailGetCommodityBySnCode: {
        url: '/wmsinventorydetail/getCommodityBySnCode',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 期初商品入库
     */
    wmsinventorydetailInitializePutaway: {
        url: '/wmsinventorydetail/initializePutaway',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 获取库房可用商品列表
     */
    wmsinventorydetailList: {
        url: '/wmsinventorydetail/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 商品扫码入库校验
     */
    wmsinventorydetailPutawayCommodityCheck: {
        url: '/wmsinventorydetail/putawayCommodityCheck',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 商品扫码出库校验
     */
    wmsinventorydetailShipmentCommodityCheck: {
        url: '/wmsinventorydetail/shipmentCommodityCheck',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 拣货单批量扫码出库
     */
    wmspickingorderBatchShipment: {
        url: '/wmspickingorder/batchShipment',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 查看拣货单详细信息
     */
    wmspickingorderInfo: {
        url: '/wmspickingorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 获取拣货单列表
     */
    wmspickingorderList: {
        url: '/wmspickingorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 保存拣货单信息
     */
    wmspickingorderSave: {
        url: '/wmspickingorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 拣货单扫码出库校验
     */
    wmspickingorderShipmentCommodityCheck: {
        url: '/wmspickingorder/shipmentCommodityCheck',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 查看报溢报损单详细信息
     */
    wmsreportinglossesInfo: {
        url: '/wmsreportinglosses/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 获取报溢报损单列表
     */
    wmsreportinglossesList: {
        url: '/wmsreportinglosses/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 保存报溢报损单信息
     */
    wmsreportinglossesSave: {
        url: '/wmsreportinglosses/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房发货单
     * @description 查看库房发货单详细信息
     */
    wmsshipmentsorderInfo: {
        url: '/wmsshipmentsorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房发货单
     * @description 获取库房发货单列表
     */
    wmsshipmentsorderList: {
        url: '/wmsshipmentsorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房发货单
     * @description 保存库房发货单信息
     */
    wmsshipmentsorderSave: {
        url: '/wmsshipmentsorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货商品清单
     * @description 删除
     */
    wmsswapcommodityDelete: {
        url: '/wmsswapcommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货商品清单
     * @description 查看详细信息
     */
    wmsswapcommodityInfo: {
        url: '/wmsswapcommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货商品清单
     * @description 获取列表
     */
    wmsswapcommodityList: {
        url: '/wmsswapcommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货商品清单
     * @description 逻辑删除
     */
    wmsswapcommodityLogicDelete: {
        url: '/wmsswapcommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货商品清单
     * @description 保存
     */
    wmsswapcommoditySave: {
        url: '/wmsswapcommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货商品清单
     * @description 修改
     */
    wmsswapcommodityUpdate: {
        url: '/wmsswapcommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 删除
     */
    wmsswaporderDelete: {
        url: '/wmsswaporder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 查看详细信息
     */
    wmsswaporderInfo: {
        url: '/wmsswaporder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 获取列表
     */
    wmsswaporderList: {
        url: '/wmsswaporder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 逻辑删除
     */
    wmsswaporderLogicDelete: {
        url: '/wmsswaporder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 保存
     */
    wmsswaporderSave: {
        url: '/wmsswaporder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 修改
     */
    wmsswaporderUpdate: {
        url: '/wmsswaporder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 删除
     */
    wmsswaptaskDelete: {
        url: '/wmsswaptask/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 查看详细信息
     */
    wmsswaptaskInfo: {
        url: '/wmsswaptask/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 获取列表
     */
    wmsswaptaskList: {
        url: '/wmsswaptask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 逻辑删除
     */
    wmsswaptaskLogicDelete: {
        url: '/wmsswaptask/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 保存
     */
    wmsswaptaskSave: {
        url: '/wmsswaptask/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 修改
     */
    wmsswaptaskUpdate: {
        url: '/wmsswaptask/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 服务健康检查
     * @description 检查服务健康状况
     */
    healthCheck: {
        url: '/ws/health/check',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 文件压缩下载（日志和配置文件）
     * @description 根据端口号压缩并下载指定类型文件
     */
    runlogCompressAndDownload: {
        url: '/ws/runlog/compressAndDownload',
        methods: 'get',
        mock: isUseMock
    },
}