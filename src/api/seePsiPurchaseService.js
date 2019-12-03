// const MOCK_ADDRESS = '/mock/5dba336abc54fc3da273f11c/39.99.132.95:9205'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5dba336abc54fc3da273f11c/39.99.132.95:9205'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-12-03
* @host 39.99.132.95:9205
*/
export default {
    __mockAddress: MOCK_ADDRESS,

    /**
     * @tag job-controller
     * @description execute
     */
    jobExecute: {
        url: '/job/execute',
        methods: 'post',
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
     * @tag 采购单
     * @description 删除
     */
    purchaseDelete: {
        url: '/purchase/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 导出
     */
    purchaseExport: {
        url: '/purchase/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 查看详细信息
     */
    purchaseGetByCode: {
        url: '/purchase/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 查看详细信息
     */
    purchaseInfo: {
        url: '/purchase/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 获取列表
     */
    purchaseList: {
        url: '/purchase/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 打印
     */
    purchasePrint: {
        url: '/purchase/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 采购入库
     */
    purchasePutin: {
        url: '/purchase/putin',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 保存
     */
    purchaseSave: {
        url: '/purchase/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购单
     * @description 修改
     */
    purchaseUpdate: {
        url: '/purchase/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 撤销审核
     */
    purchasealterationCancel: {
        url: '/purchasealteration/cancel',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 删除
     */
    purchasealterationDelete: {
        url: '/purchasealteration/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 导出
     */
    purchasealterationExport: {
        url: '/purchasealteration/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 查看详细信息
     */
    purchasealterationGetByCode: {
        url: '/purchasealteration/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 查看详细信息
     */
    purchasealterationInfo: {
        url: '/purchasealteration/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 获取列表
     */
    purchasealterationList: {
        url: '/purchasealteration/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 逻辑删除
     */
    purchasealterationLogicDelete: {
        url: '/purchasealteration/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 审核通过
     */
    purchasealterationPassApproval: {
        url: '/purchasealteration/passApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 打印
     */
    purchasealterationPrint: {
        url: '/purchasealteration/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 退货出库
     */
    purchasealterationPutout: {
        url: '/purchasealteration/putout',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 驳回
     */
    purchasealterationReject: {
        url: '/purchasealteration/reject',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 保存
     */
    purchasealterationSave: {
        url: '/purchasealteration/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 库存统计数字
     */
    purchasealterationStatWms: {
        url: '/purchasealteration/statWms/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 提交审核
     */
    purchasealterationSubmitApproval: {
        url: '/purchasealteration/submitApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购退货单
     * @description 修改
     */
    purchasealterationUpdate: {
        url: '/purchasealteration/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 请购明细表
     */
    purchaseapplyorderCommoditys: {
        url: '/purchaseapplyorder/commoditys',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 删除
     */
    purchaseapplyorderDelete: {
        url: '/purchaseapplyorder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 请购明细导出
     */
    purchaseapplyorderDetailExport: {
        url: '/purchaseapplyorder/detailExport',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 导出
     */
    purchaseapplyorderExport: {
        url: '/purchaseapplyorder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 查看详细信息
     */
    purchaseapplyorderGetByCode: {
        url: '/purchaseapplyorder/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 查看详细信息
     */
    purchaseapplyorderInfo: {
        url: '/purchaseapplyorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 获取列表
     */
    purchaseapplyorderList: {
        url: '/purchaseapplyorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 逻辑删除
     */
    purchaseapplyorderLogicDelete: {
        url: '/purchaseapplyorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 打印
     */
    purchaseapplyorderPrint: {
        url: '/purchaseapplyorder/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 保存
     */
    purchaseapplyorderSave: {
        url: '/purchaseapplyorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 请购单
     * @description 修改
     */
    purchaseapplyorderUpdate: {
        url: '/purchaseapplyorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 删除
     */
    purchasedirectDelete: {
        url: '/purchasedirect/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 直发单发货
     */
    purchasedirectDeliver: {
        url: '/purchasedirect/deliver',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 直发单发货列表
     */
    purchasedirectDeliverList: {
        url: '/purchasedirect/deliverList/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 审核
     */
    purchasedirectExamine: {
        url: '/purchasedirect/examine',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 导出
     */
    purchasedirectExport: {
        url: '/purchasedirect/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 查看详细信息
     */
    purchasedirectGetByCode: {
        url: '/purchasedirect/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 查看详细信息
     */
    purchasedirectInfo: {
        url: '/purchasedirect/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 获取列表
     */
    purchasedirectList: {
        url: '/purchasedirect/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 逻辑删除
     */
    purchasedirectLogicDelete: {
        url: '/purchasedirect/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 打印
     */
    purchasedirectPrint: {
        url: '/purchasedirect/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 保存
     */
    purchasedirectSave: {
        url: '/purchasedirect/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 提交审核
     */
    purchasedirectSubmission: {
        url: '/purchasedirect/submission',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 撤销审核
     */
    purchasedirectUnsubmission: {
        url: '/purchasedirect/unsubmission',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 直发单
     * @description 修改
     */
    purchasedirectUpdate: {
        url: '/purchasedirect/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 撤销审核
     */
    purchaseputinCancel: {
        url: '/purchaseputin/cancel',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 生成合同
     */
    purchaseputinCreateCntract: {
        url: '/purchaseputin/createCntract',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 删除
     */
    purchaseputinDelete: {
        url: '/purchaseputin/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 导出
     */
    purchaseputinExport: {
        url: '/purchaseputin/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 查看详细信息
     */
    purchaseputinGetByCode: {
        url: '/purchaseputin/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 查看详细信息
     */
    purchaseputinInfo: {
        url: '/purchaseputin/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 获取列表
     */
    purchaseputinList: {
        url: '/purchaseputin/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 逻辑删除
     */
    purchaseputinLogicDelete: {
        url: '/purchaseputin/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 审核通过
     */
    purchaseputinPassApproval: {
        url: '/purchaseputin/passApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 打印
     */
    purchaseputinPrint: {
        url: '/purchaseputin/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 驳回
     */
    purchaseputinReject: {
        url: '/purchaseputin/reject',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 保存
     */
    purchaseputinSave: {
        url: '/purchaseputin/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 终止
     */
    purchaseputinShutdown: {
        url: '/purchaseputin/shutdown',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 提交审核
     */
    purchaseputinSubmitApproval: {
        url: '/purchaseputin/submitApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购入库单
     * @description 修改
     */
    purchaseputinUpdate: {
        url: '/purchaseputin/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 撤销审核
     */
    purchasestockorderCancel: {
        url: '/purchasestockorder/cancel',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 删除
     */
    purchasestockorderDelete: {
        url: '/purchasestockorder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 导出
     */
    purchasestockorderExport: {
        url: '/purchasestockorder/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 查看详细信息
     */
    purchasestockorderGetByCode: {
        url: '/purchasestockorder/getByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 查看详细信息
     */
    purchasestockorderInfo: {
        url: '/purchasestockorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 获取列表
     */
    purchasestockorderList: {
        url: '/purchasestockorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 逻辑删除
     */
    purchasestockorderLogicDelete: {
        url: '/purchasestockorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 审核通过
     */
    purchasestockorderPassApproval: {
        url: '/purchasestockorder/passApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 打印
     */
    purchasestockorderPrint: {
        url: '/purchasestockorder/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 驳回
     */
    purchasestockorderReject: {
        url: '/purchasestockorder/reject',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 保存
     */
    purchasestockorderSave: {
        url: '/purchasestockorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 提交审核
     */
    purchasestockorderSubmitApproval: {
        url: '/purchasestockorder/submitApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 备货单
     * @description 修改
     */
    purchasestockorderUpdate: {
        url: '/purchasestockorder/update',
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