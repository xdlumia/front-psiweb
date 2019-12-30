const MOCK_ADDRESS = '/mock/5e056d905688e307251e3025/see-oa-service'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============请假申请表start=========== */
  // 获取请假日历
  absenceapplicationGetAbsenceCalendar: {
    'url': '/absenceapplication/getAbsenceCalendar',
    'mock': false
  },

  // 根据请假开始时间和结束时间查询不可用交接人用户id列表
  absenceapplicationGetInvalidHandoverUserIdList: {
    'url': '/absenceapplication/getInvalidHandoverUserIdList',
    'mock': false
  },

  // 工作交接列表
  absenceapplicationGetWorkHandoverList: {
    'url': '/absenceapplication/getWorkHandoverList',
    'mock': false
  },

  // 保存
  absenceapplicationSave: {
    'url': '/absenceapplication/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============请假申请表end=========== */

  /* =============报销申请表start=========== */
  // 保存
  accountapplicationSave: {
    'url': '/accountapplication/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============报销申请表end=========== */

  /* =============报销明细表start=========== */
  // 保存
  accountdetailSave: {
    'url': '/accountdetail/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============报销明细表end=========== */

  /* =============考勤记录表start=========== */
  // 获取打卡、请假信息
  attendancerecordListRecordApply: {
    'url': '/attendancerecord/listRecordApply',
    'mock': false
  },

  // 保存
  attendancerecordSave: {
    'url': '/attendancerecord/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============考勤记录表end=========== */

  /* =============job-controllerstart=========== */
  // execute
  jobExecute: {
    'url': '/job/execute',
    'mock': false,
    'methods': 'post'
  },
  /* =============job-controllerend=========== */

  /* =============重点工作表start=========== */
  // 查看详细信息
  keypointworkInfo: {
    'url': '/keypointwork/info/{id}',
    'mock': false
  },

  // 获取列表 移动端-小程序
  keypointworkListForApplet: {
    'url': '/keypointwork/listForApplet',
    'mock': false
  },

  // 强制弹出框 PC端
  keypointworkListPopUpBoxForC: {
    'url': '/keypointwork/listPopUpBoxForC',
    'mock': false
  },

  // 保存
  keypointworkSave: {
    'url': '/keypointwork/save',
    'mock': false,
    'methods': 'post'
  },

  // 完成重点工作
  keypointworkUpdateCompletion: {
    'url': '/keypointwork/updateCompletion',
    'mock': false,
    'methods': 'post'
  },
  /* =============重点工作表end=========== */

  /* =============重点工作反馈表start=========== */
  // 删除
  keypointworkfeedbackDelete: {
    'url': '/keypointworkfeedback/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 获取列表
  keypointworkfeedbackList: {
    'url': '/keypointworkfeedback/list',
    'mock': false
  },

  // 保存
  keypointworkfeedbackSave: {
    'url': '/keypointworkfeedback/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============重点工作反馈表end=========== */

  /* =============重点工作强制弹窗记录表start=========== */
  // 是否强制弹出重点工作弹窗
  keypointworkpopupboxQueryIsPopUp: {
    'url': '/keypointworkpopupbox/queryIsPopUp',
    'mock': false,
    'methods': 'post'
  },
  /* =============重点工作强制弹窗记录表end=========== */

  /* =============通讯录最近联系人表start=========== */
  // 获取列表
  latestcontactsList: {
    'url': '/latestcontacts/list',
    'mock': false
  },

  // 保存
  latestcontactsSave: {
    'url': '/latestcontacts/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============通讯录最近联系人表end=========== */

  /* =============谈判条件申请表start=========== */
  // 保存
  negotiateconditionapplicationSave: {
    'url': '/negotiateconditionapplication/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============谈判条件申请表end=========== */

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

  /* =============催缴报告表start=========== */
  // 查看详细信息
  reminderreportInfo: {
    'url': '/reminderreport/info/{id}',
    'mock': false
  },

  // 保存
  reminderreportSave: {
    'url': '/reminderreport/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============催缴报告表end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': false,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============工作汇报表start=========== */
  // 查看详细信息,移动端-小程序
  workreportInfo: {
    'url': '/workreport/info/{id}',
    'mock': false
  },

  // 获取工作计划列表,移动端-小程序
  workreportListPlanApplet: {
    'url': '/workreport/listPlanApplet',
    'mock': false
  },

  // 快捷筛选 移动端-小程序
  workreportListProject: {
    'url': '/workreport/listProject',
    'mock': false
  },

  // 获取工作汇报列表,移动端-小程序
  workreportListReportApplet: {
    'url': '/workreport/listReportApplet',
    'mock': false
  },

  // 获取列表 PC端
  workreportListReportForC: {
    'url': '/workreport/listReportForC',
    'mock': false
  },

  // 快捷筛选 PC端
  workreportRapidScreening: {
    'url': '/workreport/rapidScreening',
    'mock': false
  },

  // 保存
  workreportSave: {
    'url': '/workreport/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  workreportUpdate: {
    'url': '/workreport/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============工作汇报表end=========== */

  /* =============工作汇报/催缴报告评论表start=========== */
  // 删除
  workreportcommentDelete: {
    'url': '/workreportcomment/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 获取列表
  workreportcommentList: {
    'url': '/workreportcomment/list',
    'mock': false
  },

  // 保存
  workreportcommentSave: {
    'url': '/workreportcomment/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============工作汇报/催缴报告评论表end=========== */

  /* =============工作汇报/催缴报告读取记录表start=========== */
  // 变更读取状态
  workreportreadrecordUpdateReadStatus: {
    'url': '/workreportreadrecord/updateReadStatus',
    'mock': false,
    'methods': 'post'
  },
  /* =============工作汇报/催缴报告读取记录表end=========== */

  /* =============工作汇报类型接收人记忆表start=========== */
  // 查看详细信息
  workreporttyperecipientmemoryInfo: {
    'url': '/workreporttyperecipientmemory/info/{userId}',
    'mock': false
  },

  // 保存
  workreporttyperecipientmemorySave: {
    'url': '/workreporttyperecipientmemory/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============工作汇报类型接收人记忆表end=========== */

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