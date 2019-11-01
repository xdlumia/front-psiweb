/*
 * @Author: 赵伦
 * @Date: 2019-11-01 14:07:48
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-01 14:08:13
 * @Description: file content
 */
const MOCK_ADDRESS = '/mock/5db95c6dbc54fc3da273ee8c/39.99.132.95:9218'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5db95c6dbc54fc3da273ee8c/39.99.132.95:9218'; // 小程序用
// const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-11-01
* @host 39.99.132.95:9218
*/
export default {
    __mockAddress: MOCK_ADDRESS,

    /**
     * @tag 其他合同
     * @description 删除
     */
    contractDelete: {
        url: '/contract/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 其他合同
     * @description 导出
     */
    contractExport: {
        url: '/contract/export',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 其他合同
     * @description 查看详细信息
     */
    contractInfo: {
        url: '/contract/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 其他合同
     * @description 获取列表
     */
    contractList: {
        url: '/contract/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 其他合同
     * @description 打印
     */
    contractPrint: {
        url: '/contract/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 其他合同
     * @description 保存
     */
    contractSave: {
        url: '/contract/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 其他合同
     * @description 修改
     */
    contractUpdate: {
        url: '/contract/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 删除
     */
    contractpurchaseDelete: {
        url: '/contractpurchase/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 导出
     */
    contractpurchaseExport: {
        url: '/contractpurchase/export',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 查看详细信息
     */
    contractpurchaseInfo: {
        url: '/contractpurchase/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 获取列表
     */
    contractpurchaseList: {
        url: '/contractpurchase/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 打印
     */
    contractpurchasePrint: {
        url: '/contractpurchase/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 保存
     */
    contractpurchaseSave: {
        url: '/contractpurchase/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 采购合同
     * @description 修改
     */
    contractpurchaseUpdate: {
        url: '/contractpurchase/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 删除
     */
    contractsalesDelete: {
        url: '/contractsales/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 导出
     */
    contractsalesExport: {
        url: '/contractsales/export',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 查看详细信息
     */
    contractsalesInfo: {
        url: '/contractsales/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 获取列表
     */
    contractsalesList: {
        url: '/contractsales/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 打印
     */
    contractsalesPrint: {
        url: '/contractsales/print',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 保存
     */
    contractsalesSave: {
        url: '/contractsales/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售合同
     * @description 修改
     */
    contractsalesUpdate: {
        url: '/contractsales/update',
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