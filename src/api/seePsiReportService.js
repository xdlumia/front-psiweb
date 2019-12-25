const MOCK_ADDRESS = '/mock/5dd79e1155e5ff0710c433ec/'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============首页统计start=========== */
  // 周期任务
  indexCycleTask: {
    'url': '/index/cycleTask',
    'mock': false
  },

  // 统计库存金额
  indexInventoryPrice: {
    'url': '/index/inventoryPrice',
    'mock': false
  },

  // 销售员工利润排行
  indexProfitTop: {
    'url': '/index/profitTop',
    'mock': false
  },

  // 促销管理
  indexQueryPromotion: {
    'url': '/index/queryPromotion',
    'mock': false
  },

  // 目标管理
  indexQueryPromotionGoal: {
    'url': '/index/queryPromotionGoal',
    'mock': false
  },

  // 统计财务应收金额
  indexReceivable: {
    'url': '/index/receivable',
    'mock': false
  },

  // 统计销售类占比
  indexSalesClassifyStatistics: {
    'url': '/index/salesClassifyStatistics',
    'mock': false
  },

  // 销售情况
  indexSalesLine: {
    'url': '/index/salesLine',
    'mock': false
  },

  // 今日任务
  indexTodayTask: {
    'url': '/index/todayTask',
    'mock': false
  },
  /* =============首页统计end=========== */

  /* =============job-controllerstart=========== */
  // execute
  jobExecute: {
    'url': '/job/execute',
    'mock': false,
    'methods': 'post'
  },
  /* =============job-controllerend=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': false,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============提成统计start=========== */
  // 个人提成统计
  royaltyUser: {
    'url': '/royalty/user',
    'mock': false
  },
  /* =============提成统计end=========== */

  /* =============sale-profit-report-controllerstart=========== */
  // 删除
  saleprofitreportDelete: {
    'url': '/saleprofitreport/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  saleprofitreportExport: {
    'url': '/saleprofitreport/export',
    'mock': false,
    'methods': 'post'
  },

  // 合计
  saleprofitreportGetSaleProfitSum: {
    'url': '/saleprofitreport/getSaleProfitSum',
    'mock': false
  },

  // 查看详细信息
  saleprofitreportInfo: {
    'url': '/saleprofitreport/info/{id}',
    'mock': false
  },

  // 获取列表
  saleprofitreportList: {
    'url': '/saleprofitreport/list',
    'mock': false
  },

  // 保存
  saleprofitreportSave: {
    'url': '/saleprofitreport/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============sale-profit-report-controllerend=========== */

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