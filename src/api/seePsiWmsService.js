// const MOCK_ADDRESS = '/mock/5dbf808ebc54fc3da273f27e/39.99.132.95:9211'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5dbf808ebc54fc3da273f27e/39.99.132.95:9211'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-11-06
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
     * @description 删除
     */
    wmsblitemDelete: {
        url: '/wmsblitem/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 查看详细信息
     */
    wmsblitemInfo: {
        url: '/wmsblitem/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 获取列表
     */
    wmsblitemList: {
        url: '/wmsblitem/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 逻辑删除
     */
    wmsblitemLogicDelete: {
        url: '/wmsblitem/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 保存
     */
    wmsblitemSave: {
        url: '/wmsblitem/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点单
     * @description 修改
     */
    wmsblitemUpdate: {
        url: '/wmsblitem/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点商品清单
     * @description 删除
     */
    wmsblitemcommodityDelete: {
        url: '/wmsblitemcommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点商品清单
     * @description 查看详细信息
     */
    wmsblitemcommodityInfo: {
        url: '/wmsblitemcommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点商品清单
     * @description 获取列表
     */
    wmsblitemcommodityList: {
        url: '/wmsblitemcommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点商品清单
     * @description 逻辑删除
     */
    wmsblitemcommodityLogicDelete: {
        url: '/wmsblitemcommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点商品清单
     * @description 保存
     */
    wmsblitemcommoditySave: {
        url: '/wmsblitemcommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房盘点商品清单
     * @description 修改
     */
    wmsblitemcommodityUpdate: {
        url: '/wmsblitemcommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借商品清单
     * @description 删除
     */
    wmsborrowloancommodityDelete: {
        url: '/wmsborrowloancommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借商品清单
     * @description 查看详细信息
     */
    wmsborrowloancommodityInfo: {
        url: '/wmsborrowloancommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借商品清单
     * @description 获取列表
     */
    wmsborrowloancommodityList: {
        url: '/wmsborrowloancommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借商品清单
     * @description 逻辑删除
     */
    wmsborrowloancommodityLogicDelete: {
        url: '/wmsborrowloancommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借商品清单
     * @description 保存
     */
    wmsborrowloancommoditySave: {
        url: '/wmsborrowloancommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借商品清单
     * @description 修改
     */
    wmsborrowloancommodityUpdate: {
        url: '/wmsborrowloancommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 删除
     */
    wmsborrowloanorderDelete: {
        url: '/wmsborrowloanorder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 查看详细信息
     */
    wmsborrowloanorderInfo: {
        url: '/wmsborrowloanorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 获取列表
     */
    wmsborrowloanorderList: {
        url: '/wmsborrowloanorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 逻辑删除
     */
    wmsborrowloanorderLogicDelete: {
        url: '/wmsborrowloanorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 保存
     */
    wmsborrowloanorderSave: {
        url: '/wmsborrowloanorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借出单
     * @description 修改
     */
    wmsborrowloanorderUpdate: {
        url: '/wmsborrowloanorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 删除
     */
    wmsborrowloantaskDelete: {
        url: '/wmsborrowloantask/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 查看详细信息
     */
    wmsborrowloantaskInfo: {
        url: '/wmsborrowloantask/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 获取列表
     */
    wmsborrowloantaskList: {
        url: '/wmsborrowloantask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 逻辑删除
     */
    wmsborrowloantaskLogicDelete: {
        url: '/wmsborrowloantask/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 保存
     */
    wmsborrowloantaskSave: {
        url: '/wmsborrowloantask/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房借入借任务
     * @description 修改
     */
    wmsborrowloantaskUpdate: {
        url: '/wmsborrowloantask/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸商品清单
     * @description 删除
     */
    wmsdisassemblycommodityDelete: {
        url: '/wmsdisassemblycommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸商品清单
     * @description 查看详细信息
     */
    wmsdisassemblycommodityInfo: {
        url: '/wmsdisassemblycommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸商品清单
     * @description 获取列表
     */
    wmsdisassemblycommodityList: {
        url: '/wmsdisassemblycommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸商品清单
     * @description 逻辑删除
     */
    wmsdisassemblycommodityLogicDelete: {
        url: '/wmsdisassemblycommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸商品清单
     * @description 保存
     */
    wmsdisassemblycommoditySave: {
        url: '/wmsdisassemblycommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸商品清单
     * @description 修改
     */
    wmsdisassemblycommodityUpdate: {
        url: '/wmsdisassemblycommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 删除
     */
    wmsdisassemblyorderDelete: {
        url: '/wmsdisassemblyorder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 查看详细信息
     */
    wmsdisassemblyorderInfo: {
        url: '/wmsdisassemblyorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 获取列表
     */
    wmsdisassemblyorderList: {
        url: '/wmsdisassemblyorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 逻辑删除
     */
    wmsdisassemblyorderLogicDelete: {
        url: '/wmsdisassemblyorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 保存
     */
    wmsdisassemblyorderSave: {
        url: '/wmsdisassemblyorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸单
     * @description 修改
     */
    wmsdisassemblyorderUpdate: {
        url: '/wmsdisassemblyorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 删除
     */
    wmsdisassemblytaskDelete: {
        url: '/wmsdisassemblytask/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 查看详细信息
     */
    wmsdisassemblytaskInfo: {
        url: '/wmsdisassemblytask/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 获取列表
     */
    wmsdisassemblytaskList: {
        url: '/wmsdisassemblytask/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 逻辑删除
     */
    wmsdisassemblytaskLogicDelete: {
        url: '/wmsdisassemblytask/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 保存
     */
    wmsdisassemblytaskSave: {
        url: '/wmsdisassemblytask/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拆卸任务
     * @description 修改
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
     * @description 保存库房商品信息
     */
    wmsinventorySave: {
        url: '/wmsinventory/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 批量商品入库
     */
    wmsinventorydetailBatchSsave: {
        url: '/wmsinventorydetail/batchSsave',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 批量扫码出库
     */
    wmsinventorydetailBatchUpdate: {
        url: '/wmsinventorydetail/batchUpdate',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 根据SN码或机器号查询商品
     */
    wmsinventorydetailGetCommodityBySnCode: {
        url: '/wmsinventorydetail/getCommodityBySnCode',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 查看详细信息
     */
    wmsinventorydetailInfo: {
        url: '/wmsinventorydetail/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房商品明细
     * @description 获取列表
     */
    wmsinventorydetailList: {
        url: '/wmsinventorydetail/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货商品清单
     * @description 删除
     */
    wmspickingcommodityDelete: {
        url: '/wmspickingcommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货商品清单
     * @description 查看详细信息
     */
    wmspickingcommodityInfo: {
        url: '/wmspickingcommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货商品清单
     * @description 获取列表
     */
    wmspickingcommodityList: {
        url: '/wmspickingcommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货商品清单
     * @description 逻辑删除
     */
    wmspickingcommodityLogicDelete: {
        url: '/wmspickingcommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货商品清单
     * @description 保存
     */
    wmspickingcommoditySave: {
        url: '/wmspickingcommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货商品清单
     * @description 修改
     */
    wmspickingcommodityUpdate: {
        url: '/wmspickingcommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 删除
     */
    wmspickingorderDelete: {
        url: '/wmspickingorder/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 查看详细信息
     */
    wmspickingorderInfo: {
        url: '/wmspickingorder/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 获取列表
     */
    wmspickingorderList: {
        url: '/wmspickingorder/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 逻辑删除
     */
    wmspickingorderLogicDelete: {
        url: '/wmspickingorder/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 保存
     */
    wmspickingorderSave: {
        url: '/wmspickingorder/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房拣货单
     * @description 修改
     */
    wmspickingorderUpdate: {
        url: '/wmspickingorder/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 删除
     */
    wmsreportinglossesDelete: {
        url: '/wmsreportinglosses/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 查看详细信息
     */
    wmsreportinglossesInfo: {
        url: '/wmsreportinglosses/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 获取列表
     */
    wmsreportinglossesList: {
        url: '/wmsreportinglosses/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 逻辑删除
     */
    wmsreportinglossesLogicDelete: {
        url: '/wmsreportinglosses/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 保存
     */
    wmsreportinglossesSave: {
        url: '/wmsreportinglosses/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 库房报溢报损单
     * @description 修改
     */
    wmsreportinglossesUpdate: {
        url: '/wmsreportinglosses/update',
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