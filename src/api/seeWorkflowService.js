const MOCK_ADDRESS = '/mock/5dd4e78855e5ff0710c433a4/seeWorkflowService  '

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============业务数据权限-楼盘相关查询start=========== */
  // 获取楼盘列表
  cfgbuildinglistList: {
    'url': '/cfgbuildinglist/list',
    'mock': false
  },
  /* =============业务数据权限-楼盘相关查询end=========== */

  /* =============业务数据权限-配置start=========== */
  // 获取业务设置对细分数据权限是否启用的设置
  cfgobjectdataauthGetAllObjCfgList: {
    'url': '/cfgobjectdataauth/getAllObjCfgList',
    'mock': false
  },

  // 获取某个用户的所有可见对象列表
  cfgobjectdataauthGetAllObjList: {
    'url': '/cfgobjectdataauth/getAllObjList',
    'mock': false
  },

  // 获取某个用户的某个功能的可见对象列表
  cfgobjectdataauthGetObjList: {
    'url': '/cfgobjectdataauth/getObjList',
    'mock': false
  },

  // 获取某个楼盘的设置列表
  cfgobjectdataauthList: {
    'url': '/cfgobjectdataauth/list',
    'mock': false
  },

  // 保存业务数据权限配置信息
  cfgobjectdataauthSave: {
    'url': '/cfgobjectdataauth/save',
    'mock': false,
    'methods': 'post'
  },

  // 设置楼盘默认责任人（后端调用）
  cfgobjectdataauthSaveDefaultRes: {
    'url': '/cfgobjectdataauth/saveDefaultRes',
    'mock': false,
    'methods': 'post'
  },
  /* =============业务数据权限-配置end=========== */

  /* =============业务数据权限-页面关系start=========== */
  // 获取列表
  cfgpageobjauthList: {
    'url': '/cfgpageobjauth/list',
    'mock': false
  },
  /* =============业务数据权限-页面关系end=========== */

  /* =============流程设置start=========== */
  // 获取当前流程设置
  processSetQueryProcessSet: {
    'url': '/processSet/queryProcessSet/{code}',
    'mock': false
  },

  // 更新当前流程设置
  processSetUpdateProcessSet: {
    'url': '/processSet/updateProcessSet',
    'mock': false,
    'methods': 'post'
  },
  /* =============流程设置end=========== */

  /* =============流程定义表start=========== */
  // 流程定义列表
  processdefinitionList: {
    'url': '/processdefinition/list',
    'mock': false
  },

  // 获取流程节点
  processdefinitionQueryProcessDefinitionSubTask: {
    'url': '/processdefinition/queryProcessDefinitionSubTask',
    'mock': false
  },

  // 修改流程定义
  processdefinitionUpdate: {
    'url': '/processdefinition/update',
    'mock': false,
    'methods': 'post'
  },

  // 修改流程定义中的抄送人
  processdefinitionUpdateTaskCopyTo: {
    'url': '/processdefinition/updateTaskCopyTo',
    'mock': false,
    'methods': 'post'
  },
  /* =============流程定义表end=========== */

  /* =============流程任务列表start=========== */
  // 完成任务
  processtaskCompleteTask: {
    'url': '/processtask/completeTask',
    'mock': false,
    'methods': 'post'
  },

  // 完成任务
  processtaskCompleteTask: {
    'url': '/processtask/completeTask/{taskId}',
    'mock': false,
    'methods': 'post'
  },

  // 取消流程
  processtaskProcessCancel: {
    'url': '/processtask/processCancel',
    'mock': false,
    'methods': 'post'
  },

  // 暂停流程
  processtaskProcessSuspend: {
    'url': '/processtask/processSuspend',
    'mock': false,
    'methods': 'post'
  },

  // 获取抄送给我的流程
  processtaskQueryCopyTo: {
    'url': '/processtask/queryCopyTo',
    'mock': false
  },

  // 获取当前登录人待审批的流程
  processtaskQueryGtasks: {
    'url': '/processtask/queryGtasks',
    'mock': false
  },

  // 获取当前任务实例
  processtaskQueryProcessEntity: {
    'url': '/processtask/queryProcessEntity',
    'mock': false
  },

  // 获取流程历史任务实例
  processtaskQueryProcessHistoryEntity: {
    'url': '/processtask/queryProcessHistoryEntity',
    'mock': false
  },

  // 获取当前流程的节点信息与审核人信息
  processtaskQueryProcessTaskNode: {
    'url': '/processtask/queryProcessTaskNode',
    'mock': false
  },

  // 获取当前流程的节点信息与审核人信息集中式用
  processtaskQueryProcessTaskNodenNoTX: {
    'url': '/processtask/queryProcessTaskNodenNoTX',
    'mock': false
  },

  // 获取我发起的流程
  processtaskQuerySponsorTask: {
    'url': '/processtask/querySponsorTask',
    'mock': false
  },

  // 驳回任务
  processtaskRejectTask: {
    'url': '/processtask/rejectTask',
    'mock': false,
    'methods': 'post'
  },

  // 驳回任务
  processtaskRejectTask: {
    'url': '/processtask/rejectTask/{taskId}',
    'mock': false,
    'methods': 'post'
  },

  // 启动流程
  processtaskStartProcess: {
    'url': '/processtask/startProcess',
    'mock': false
  },

  // 启动流程
  processtaskStartProcess: {
    'url': '/processtask/startProcess',
    'mock': false,
    'methods': 'post'
  },

  // 获取任务列表
  processtaskTaskList: {
    'url': '/processtask/taskList',
    'mock': false
  },

  // 获取任务列表
  processtaskTaskMap: {
    'url': '/processtask/taskMap',
    'mock': false
  },

  // 测试接口--流程启动
  processtaskTest: {
    'url': '/processtask/test/{businessId}',
    'mock': false
  },
  /* =============流程任务列表end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': false,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

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