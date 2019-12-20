// const MOCK_ADDRESS = '/mock/5ddcf2dee8c6606de89f2df3/39.99.132.95:9223'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5ddcf2dee8c6606de89f2df3/39.99.132.95:9223'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-12-20
* @host 39.99.132.95:9223
*/
export default {
    __mockAddress: MOCK_ADDRESS,

    /**
     * @tag 首页统计
     * @description 周期任务
     */
    indexCycleTask: {
        url: '/index/cycleTask',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页统计
     * @description 统计库存金额
     */
    indexInventoryPrice: {
        url: '/index/inventoryPrice',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页统计
     * @description 销售员工利润排行
     */
    indexProfitTop: {
        url: '/index/profitTop',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页统计
     * @description 统计财务应收金额
     */
    indexReceivable: {
        url: '/index/receivable',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页统计
     * @description 统计销售类占比
     */
    indexSalesClassifyStatistics: {
        url: '/index/salesClassifyStatistics',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页统计
     * @description 销售情况
     */
    indexSalesLine: {
        url: '/index/salesLine',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页统计
     * @description 今日任务
     */
    indexTodayTask: {
        url: '/index/todayTask',
        methods: 'get',
        mock: isUseMock
    },
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
     * @tag RocketMQ失败重试
     * @description 重试失败消息
     */
    rocketMQRetryFailedMessage: {
        url: '/rocketMQ/retryFailedMessage/{className}',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 提成统计
     * @description 个人提成统计
     */
    royaltyUser: {
        url: '/royalty/user',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag sale-profit-report-controller
     * @description 删除
     */
    saleprofitreportDelete: {
        url: '/saleprofitreport/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag sale-profit-report-controller
     * @description 导出
     */
    saleprofitreportExport: {
        url: '/saleprofitreport/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag sale-profit-report-controller
     * @description 查看详细信息
     */
    saleprofitreportInfo: {
        url: '/saleprofitreport/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag sale-profit-report-controller
     * @description 获取列表
     */
    saleprofitreportList: {
        url: '/saleprofitreport/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag sale-profit-report-controller
     * @description 保存
     */
    saleprofitreportSave: {
        url: '/saleprofitreport/save',
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