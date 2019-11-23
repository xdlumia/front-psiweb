// const MOCK_ADDRESS = '/mock/5dbf808ebc54fc3da273f27e/39.99.132.95:9211'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5dbf808ebc54fc3da273f27e/39.99.132.95:9211'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-11-23
* @host 39.99.132.95:9211
*/
export default {
    __mockAddress: MOCK_ADDRESS,

    /**
     * @tag 业务单账期表
     * @description 删除
     */
    businessshipmentfinanceDelete: {
        url: '/businessshipmentfinance/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 业务单账期表
     * @description 查看详细信息
     */
    businessshipmentfinanceInfo: {
        url: '/businessshipmentfinance/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 业务单账期表
     * @description 获取列表
     */
    businessshipmentfinanceList: {
        url: '/businessshipmentfinance/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 业务单账期表
     * @description 保存
     */
    businessshipmentfinanceSave: {
        url: '/businessshipmentfinance/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房管理
     * @description 导出
     */
    commonwmsmanagerExport: {
        url: '/commonwmsmanager/export',
        methods: 'post',
        mock: isUseMock
    },
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
     * @description 导出
     */
    wmsallocationorderExport: {
        url: '/wmsallocationorder/export',
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
     * @description 调拨单商品扫码调入校验
     */
    wmsallocationorderPutawayCommodityCheck: {
        url: '/wmsallocationorder/putawayCommodityCheck',
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
     * @tag 库房组装单
     * @description 导出
     */
    wmsassembleorderExport: {
        url: '/wmsassembleorder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 根据组装单编号查看组装单详细信息
     */
    wmsassembleorderGetByCode: {
        url: '/wmsassembleorder/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 查看组装单详细信息
     */
    wmsassembleorderInfo: {
        url: '/wmsassembleorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 获取组装单列表
     */
    wmsassembleorderList: {
        url: '/wmsassembleorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 保存组装单信息
     */
    wmsassembleorderSave: {
        url: '/wmsassembleorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 修改组装单信息
     */
    wmsassembleorderUpdate: {
        url: '/wmsassembleorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装单
     * @description 调整组装任务生成顺序
     */
    wmsassembleorderUpdatesSquence: {
        url: '/wmsassembleorder/updatesSquence',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 继续组装任务
     */
    wmsassembletaskContinueTask: {
        url: '/wmsassembletask/continueTask',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 导出
     */
    wmsassembletaskExport: {
        url: '/wmsassembletask/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 查看组装任务详细信息根据CODE
     */
    wmsassembletaskGetByCode: {
        url: '/wmsassembletask/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 挂起组装任务
     */
    wmsassembletaskHangTask: {
        url: '/wmsassembletask/hangTask',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 查看组装任务详细信息
     */
    wmsassembletaskInfo: {
        url: '/wmsassembletask/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 获取组装任务列表
     */
    wmsassembletaskList: {
        url: '/wmsassembletask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 组装入库商品
     */
    wmsassembletaskPutawayCommodity: {
        url: '/wmsassembletask/putawayCommodity',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 保存组装任务及拣货单信息
     */
    wmsassembletaskSave: {
        url: '/wmsassembletask/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 确认并开始组装任务
     */
    wmsassembletaskStart: {
        url: '/wmsassembletask/start/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 转移组装任务责任人
     */
    wmsassembletaskTransferTask: {
        url: '/wmsassembletask/transferTask',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房组装任务
     * @description 修改组装任务信息
     */
    wmsassembletaskUpdate: {
        url: '/wmsassembletask/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 商品盘点验证
     */
    wmsblitemBlitemCommodityCheck: {
        url: '/wmsblitem/blitemCommodityCheck',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 导出
     */
    wmsblitemExport: {
        url: '/wmsblitem/export',
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
     * @description 库房商品盘点
     */
    wmsblitemStart: {
        url: '/wmsblitem/start',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 终止盘点单状态信息
     */
    wmsblitemUpdateState: {
        url: '/wmsblitem/updateState',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 导出
     */
    wmsborrowloanorderExport: {
        url: '/wmsborrowloanorder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 根据编号查看借入借出单详细信息
     */
    wmsborrowloanorderGetByCode: {
        url: '/wmsborrowloanorder/getByCode/{code}',
        methods: 'get',
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
     * @description 导出
     */
    wmsborrowloantaskExport: {
        url: '/wmsborrowloantask/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 查看借入借任务详细信息根据CODE
     */
    wmsborrowloantaskGetByCode: {
        url: '/wmsborrowloantask/getByCode/{code}',
        methods: 'get',
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
     * @description 撤销审核
     */
    wmsdisassemblyorderCancel: {
        url: '/wmsdisassemblyorder/cancel',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 导出
     */
    wmsdisassemblyorderExport: {
        url: '/wmsdisassemblyorder/export',
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
     * @description 根据编号查看拆卸单详细信息
     */
    wmsdisassemblyorderGetByCode: {
        url: '/wmsdisassemblyorder/getByCode/{code}',
        methods: 'get',
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
     * @description 拆卸单审核通过
     */
    wmsdisassemblyorderPassApproval: {
        url: '/wmsdisassemblyorder/passApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 拆卸单审核驳回
     */
    wmsdisassemblyorderReject: {
        url: '/wmsdisassemblyorder/reject',
        methods: 'post',
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
     * @description 拆卸单提交审核
     */
    wmsdisassemblyorderSubmitApproval: {
        url: '/wmsdisassemblyorder/submitApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 终止拆卸单信息
     */
    wmsdisassemblyorderTermination: {
        url: '/wmsdisassemblyorder/termination/{id}',
        methods: 'get',
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
     * @description 继续拆卸任务
     */
    wmsdisassemblytaskContinueTask: {
        url: '/wmsdisassemblytask/continueTask',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 导出
     */
    wmsdisassemblytaskExport: {
        url: '/wmsdisassemblytask/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 根据任务编号查看拆卸任务详细信息
     */
    wmsdisassemblytaskGetByCode: {
        url: '/wmsdisassemblytask/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 挂起拆卸任务
     */
    wmsdisassemblytaskHangTask: {
        url: '/wmsdisassemblytask/hangTask',
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
     * @description 拆卸入库商品
     */
    wmsdisassemblytaskPutawayCommodity: {
        url: '/wmsdisassemblytask/putawayCommodity',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 确认并开始拆卸任务
     */
    wmsdisassemblytaskStart: {
        url: '/wmsdisassemblytask/start/{id}',
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
     * @description 导出
     */
    wmsinventoryExport: {
        url: '/wmsinventory/export',
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
     * @description 导出
     */
    wmspickingorderExport: {
        url: '/wmspickingorder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 查看拣货单详细信息根据CODE
     */
    wmspickingorderGetByCode: {
        url: '/wmspickingorder/getByCode/{code}',
        methods: 'get',
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
     * @description 导出
     */
    wmsreportinglossesExport: {
        url: '/wmsreportinglosses/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 查看报溢报损单详细信息根据CODE
     */
    wmsreportinglossesGetByCode: {
        url: '/wmsreportinglosses/getByCode/{code}',
        methods: 'get',
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
     * @description 导出
     */
    wmsshipmentsorderExport: {
        url: '/wmsshipmentsorder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房发货单
     * @description 查看发货单详细信息根据CODE
     */
    wmsshipmentsorderGetByCode: {
        url: '/wmsshipmentsorder/getByCode/{code}',
        methods: 'get',
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
     * @tag 库房换货单
     * @description 撤销审核
     */
    wmsswaporderCancel: {
        url: '/wmsswaporder/cancel',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 删除换货单信息
     */
    wmsswaporderDelete: {
        url: '/wmsswaporder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 导出
     */
    wmsswaporderExport: {
        url: '/wmsswaporder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 查看换货单详细信息根据CODE
     */
    wmsswaporderGetByCode: {
        url: '/wmsswaporder/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 查看换货单详细信息
     */
    wmsswaporderInfo: {
        url: '/wmsswaporder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 获取换货单列表
     */
    wmsswaporderList: {
        url: '/wmsswaporder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 逻辑删除换货单信息
     */
    wmsswaporderLogicDelete: {
        url: '/wmsswaporder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 换货单审核通过
     */
    wmsswaporderPassApproval: {
        url: '/wmsswaporder/passApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 换货单审核驳回
     */
    wmsswaporderReject: {
        url: '/wmsswaporder/reject',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 保存换货单信息
     */
    wmsswaporderSave: {
        url: '/wmsswaporder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 换货单提交审核
     */
    wmsswaporderSubmitApproval: {
        url: '/wmsswaporder/submitApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货单
     * @description 修改换货单信息
     */
    wmsswaporderUpdate: {
        url: '/wmsswaporder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 导出
     */
    wmsswaptaskExport: {
        url: '/wmsswaptask/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 查看换货任务详细信息根据CODE
     */
    wmsswaptaskGetByCode: {
        url: '/wmsswaptask/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 获取换货任务列表
     */
    wmsswaptaskList: {
        url: '/wmsswaptask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房换货任务
     * @description 商品换货出入库
     */
    wmsswaptaskSwapCommodity: {
        url: '/wmsswaptask/swapCommodity',
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