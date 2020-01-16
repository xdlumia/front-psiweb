const MOCK_ADDRESS = '/mock/5dce08cfbc54fc3da273f529/see-psi-finance-service'
const USE_MOCK = false
export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============账单start=========== */
  // 复核通过
  fbillAuditApproval: {
    'url': '/fbill/auditApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 批量保存
  fbillBatchSave: {
    'url': '/fbill/batchSave',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除
  fbillDelete: {
    'url': '/fbill/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 账单导出
  fbillExport: {
    'url': '/fbill/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 账单金额同步
  fbillFbillSyncAmount: {
    'url': '/fbill/fbillSyncAmount',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 客户账单统计
  fbillGetClientFbillStatistics: {
    'url': '/fbill/getClientFbillStatistics',
    'mock': USE_MOCK
  },

  // 根据code查看详细信息
  fbillGetInfoByCode: {
    'url': '/fbill/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  fbillInfo: {
    'url': '/fbill/info/{id}',
    'mock': USE_MOCK
  },

  // 账单列表
  fbillList: {
    'url': '/fbill/list',
    'mock': USE_MOCK
  },

  // 审核通过
  fbillPassApproval: {
    'url': '/fbill/passApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 付款申请
  fbillPaymentApply: {
    'url': '/fbill/paymentApply',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 付款单列表--分页
  fbillQueryPaymentlist: {
    'url': '/fbill/queryPaymentlist',
    'mock': USE_MOCK
  },

  // 驳回
  fbillReject: {
    'url': '/fbill/reject',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  fbillSave: {
    'url': '/fbill/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  fbillUpdate: {
    'url': '/fbill/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code修改
  fbillUpdateByBusCode: {
    'url': '/fbill/updateByBusCode',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============账单end=========== */

  /* =============账单调整表start=========== */
  // 撤销审核
  fbilladjustCancel: {
    'url': '/fbilladjust/cancel',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除
  fbilladjustDelete: {
    'url': '/fbilladjust/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  fbilladjustExport: {
    'url': '/fbilladjust/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  fbilladjustGetInfoByCode: {
    'url': '/fbilladjust/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  fbilladjustInfo: {
    'url': '/fbilladjust/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  fbilladjustList: {
    'url': '/fbilladjust/list',
    'mock': USE_MOCK
  },

  // 审核通过
  fbilladjustPassApproval: {
    'url': '/fbilladjust/passApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 驳回
  fbilladjustReject: {
    'url': '/fbilladjust/reject',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  fbilladjustSave: {
    'url': '/fbilladjust/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 账单调整申请
  fbilladjustSubmitApproval: {
    'url': '/fbilladjust/submitApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  fbilladjustUpdate: {
    'url': '/fbilladjust/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============账单调整表end=========== */

  /* =============借款单start=========== */
  // 删除
  fborrowingDelete: {
    'url': '/fborrowing/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  fborrowingExport: {
    'url': '/fborrowing/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code查看详细信息
  fborrowingGetInfoByCode: {
    'url': '/fborrowing/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  fborrowingInfo: {
    'url': '/fborrowing/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  fborrowingList: {
    'url': '/fborrowing/list',
    'mock': USE_MOCK
  },

  // 逻辑删除
  fborrowingLogicDelete: {
    'url': '/fborrowing/logicDelete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 保存
  fborrowingSave: {
    'url': '/fborrowing/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  fborrowingUpdate: {
    'url': '/fborrowing/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============借款单end=========== */

  /* =============费用单start=========== */
  // 复核通过
  fcostAuditApproval: {
    'url': '/fcost/auditApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 撤销审核
  fcostCancel: {
    'url': '/fcost/cancel',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除
  fcostDelete: {
    'url': '/fcost/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  fcostExport: {
    'url': '/fcost/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code查询详情
  fcostGetInfoByCode: {
    'url': '/fcost/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  fcostInfo: {
    'url': '/fcost/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  fcostList: {
    'url': '/fcost/list',
    'mock': USE_MOCK
  },

  // 逻辑删除
  fcostLogicDelete: {
    'url': '/fcost/logicDelete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 审核通过
  fcostPassApproval: {
    'url': '/fcost/passApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 驳回
  fcostReject: {
    'url': '/fcost/reject',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  fcostSave: {
    'url': '/fcost/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 提交审核
  fcostSubmitApproval: {
    'url': '/fcost/submitApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  fcostUpdate: {
    'url': '/fcost/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============费用单end=========== */

  /* =============财务任务start=========== */
  // 账单即将逾期处理
  financeJobCalculateFbillWillReceivaOver: {
    'url': '/financeJob/calculateFbillWillReceivaOver',
    'mock': USE_MOCK
  },

  // 收票逾期处理
  financeJobCalculateInvoiceReceivaOver: {
    'url': '/financeJob/calculateInvoiceReceivaOver',
    'mock': USE_MOCK
  },

  // 账单逾期处理
  financeJobCalculateOverDays: {
    'url': '/financeJob/calculateOverDays',
    'mock': USE_MOCK
  },

  // 发票下限预警
  financeJobFInvoiceFloorWarning: {
    'url': '/financeJob/fInvoiceFloorWarning',
    'mock': USE_MOCK
  },
  /* =============财务任务end=========== */

  /* =============流水start=========== */
  // 删除
  fincomerecordDelete: {
    'url': '/fincomerecord/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  fincomerecordExport: {
    'url': '/fincomerecord/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  fincomerecordGetInfoByCode: {
    'url': '/fincomerecord/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  fincomerecordInfo: {
    'url': '/fincomerecord/info/{id}',
    'mock': USE_MOCK
  },

  // 新增流水并匹配
  fincomerecordInsertRoutedAatching: {
    'url': '/fincomerecord/insertRoutedAatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 新增转账单
  fincomerecordInsertTransfer: {
    'url': '/fincomerecord/insertTransfer',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 获取列表
  fincomerecordList: {
    'url': '/fincomerecord/list',
    'mock': USE_MOCK
  },

  // 保存
  fincomerecordSave: {
    'url': '/fincomerecord/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  fincomerecordUpdate: {
    'url': '/fincomerecord/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============流水end=========== */

  /* =============账单匹配流水关系表start=========== */
  // 删除
  fincomerecordmatchDelete: {
    'url': '/fincomerecordmatch/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  fincomerecordmatchInfo: {
    'url': '/fincomerecordmatch/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  fincomerecordmatchList: {
    'url': '/fincomerecordmatch/list',
    'mock': USE_MOCK
  },

  // 不分页列表
  fincomerecordmatchQueryList: {
    'url': '/fincomerecordmatch/queryList',
    'mock': USE_MOCK
  },

  // 保存
  fincomerecordmatchSave: {
    'url': '/fincomerecordmatch/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  fincomerecordmatchUpdate: {
    'url': '/fincomerecordmatch/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============账单匹配流水关系表end=========== */

  /* =============票据表start=========== */
  // 审核
  finvoiceApproval: {
    'url': '/finvoice/approval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 作废
  finvoiceCancellation: {
    'url': '/finvoice/cancellation',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除
  finvoiceDelete: {
    'url': '/finvoice/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  finvoiceExport: {
    'url': '/finvoice/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据业务code，查询票据总金额
  finvoiceGetBusCodeTotalAmount: {
    'url': '/finvoice/getBusCodeTotalAmount',
    'mock': USE_MOCK
  },

  // 查看详细信息
  finvoiceInfo: {
    'url': '/finvoice/info/{id}',
    'mock': USE_MOCK
  },

  // 根据业务code，验证票据是否存在
  finvoiceIsFinvoice: {
    'url': '/finvoice/isFinvoice',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoiceList: {
    'url': '/finvoice/list',
    'mock': USE_MOCK
  },

  // 逻辑删除
  finvoiceLogicDelete: {
    'url': '/finvoice/logicDelete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 保存
  finvoiceSave: {
    'url': '/finvoice/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  finvoiceUpdate: {
    'url': '/finvoice/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============票据表end=========== */

  /* =============开票据start=========== */
  // 开票
  finvoicebillingBilling: {
    'url': '/finvoicebilling/billing',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 撤销审核
  finvoicebillingCancel: {
    'url': '/finvoicebilling/cancel',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 作废
  finvoicebillingCancellation: {
    'url': '/finvoicebilling/cancellation',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 作废
  finvoicebillingCancellation: {
    'url': '/finvoicebilling/cancellation',
    'mock': USE_MOCK
  },

  // 删除
  finvoicebillingDelete: {
    'url': '/finvoicebilling/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 冲红
  finvoicebillingDilution: {
    'url': '/finvoicebilling/dilution',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 冲红
  finvoicebillingDilution: {
    'url': '/finvoicebilling/dilution',
    'mock': USE_MOCK
  },

  // 导出
  finvoicebillingExport: {
    'url': '/finvoicebilling/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  finvoicebillingInfo: {
    'url': '/finvoicebilling/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoicebillingList: {
    'url': '/finvoicebilling/list',
    'mock': USE_MOCK
  },

  // 合并开票
  finvoicebillingMergeBilling: {
    'url': '/finvoicebilling/mergeBilling',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 审核通过
  finvoicebillingPassApproval: {
    'url': '/finvoicebilling/passApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 驳回
  finvoicebillingReject: {
    'url': '/finvoicebilling/reject',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  finvoicebillingSave: {
    'url': '/finvoicebilling/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 提交审核
  finvoicebillingSubmitApproval: {
    'url': '/finvoicebilling/submitApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  finvoicebillingUpdate: {
    'url': '/finvoicebilling/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============开票据end=========== */

  /* =============发票号码库start=========== */
  // 删除
  finvoicecodingDelete: {
    'url': '/finvoicecoding/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  finvoicecodingInfo: {
    'url': '/finvoicecoding/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoicecodingList: {
    'url': '/finvoicecoding/list',
    'mock': USE_MOCK
  },

  // 保存
  finvoicecodingSave: {
    'url': '/finvoicecoding/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  finvoicecodingUpdate: {
    'url': '/finvoicecoding/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============发票号码库end=========== */

  /* =============发票本start=========== */
  // 删除
  finvoicedatumDelete: {
    'url': '/finvoicedatum/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  finvoicedatumExport: {
    'url': '/finvoicedatum/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  finvoicedatumInfo: {
    'url': '/finvoicedatum/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoicedatumList: {
    'url': '/finvoicedatum/list',
    'mock': USE_MOCK
  },

  // 保存
  finvoicedatumSave: {
    'url': '/finvoicedatum/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  finvoicedatumUpdate: {
    'url': '/finvoicedatum/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============发票本end=========== */

  /* =============发票详细信息start=========== */
  // 删除
  finvoicedetailDelete: {
    'url': '/finvoicedetail/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  finvoicedetailInfo: {
    'url': '/finvoicedetail/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoicedetailList: {
    'url': '/finvoicedetail/list',
    'mock': USE_MOCK
  },

  // 保存
  finvoicedetailSave: {
    'url': '/finvoicedetail/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============发票详细信息end=========== */

  /* =============收票start=========== */
  // 撤销审核
  finvoicereceivableCancel: {
    'url': '/finvoicereceivable/cancel',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 作废
  finvoicereceivableCancellation: {
    'url': '/finvoicereceivable/cancellation',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除
  finvoicereceivableDelete: {
    'url': '/finvoicereceivable/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  finvoicereceivableExport: {
    'url': '/finvoicereceivable/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  finvoicereceivableInfo: {
    'url': '/finvoicereceivable/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoicereceivableList: {
    'url': '/finvoicereceivable/list',
    'mock': USE_MOCK
  },

  // 审核通过
  finvoicereceivablePassApproval: {
    'url': '/finvoicereceivable/passApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 退票
  finvoicereceivableRefund: {
    'url': '/finvoicereceivable/refund',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 驳回
  finvoicereceivableReject: {
    'url': '/finvoicereceivable/reject',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  finvoicereceivableSave: {
    'url': '/finvoicereceivable/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 提交审核
  finvoicereceivableSubmitApproval: {
    'url': '/finvoicereceivable/submitApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  finvoicereceivableUpdate: {
    'url': '/finvoicereceivable/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============收票end=========== */

  /* =============发票库start=========== */
  // 删除
  finvoicewarehouseDelete: {
    'url': '/finvoicewarehouse/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  finvoicewarehouseInfo: {
    'url': '/finvoicewarehouse/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  finvoicewarehouseList: {
    'url': '/finvoicewarehouse/list',
    'mock': USE_MOCK
  },

  // 保存
  finvoicewarehouseSave: {
    'url': '/finvoicewarehouse/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  finvoicewarehouseUpdate: {
    'url': '/finvoicewarehouse/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============发票库end=========== */

  /* =============还款记录表start=========== */
  // 删除
  frepaymentrecordDelete: {
    'url': '/frepaymentrecord/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 查看详细信息
  frepaymentrecordInfo: {
    'url': '/frepaymentrecord/info/{id}',
    'mock': USE_MOCK
  },

  // 获取列表
  frepaymentrecordList: {
    'url': '/frepaymentrecord/list',
    'mock': USE_MOCK
  },

  // 保存
  frepaymentrecordSave: {
    'url': '/frepaymentrecord/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  frepaymentrecordUpdate: {
    'url': '/frepaymentrecord/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============还款记录表end=========== */

  /* =============job-controllerstart=========== */
  // execute
  jobExecute: {
    'url': '/job/execute',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============job-controllerend=========== */

  /* =============付款单start=========== */
  // 复核通过
  paybillAuditApproval: {
    'url': '/paybill/auditApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 批量付款申请
  paybillBatchPaymentApply: {
    'url': '/paybill/batchPaymentApply',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 批量保存
  paybillBatchSave: {
    'url': '/paybill/batchSave',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除
  paybillDelete: {
    'url': '/paybill/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 账单导出
  paybillExport: {
    'url': '/paybill/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code查看详细信息
  paybillGetInfoByCode: {
    'url': '/paybill/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  paybillInfo: {
    'url': '/paybill/info/{id}',
    'mock': USE_MOCK
  },

  // 账单列表
  paybillList: {
    'url': '/paybill/list',
    'mock': USE_MOCK
  },

  // 审核通过
  paybillPassApproval: {
    'url': '/paybill/passApproval',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 付款
  paybillPay: {
    'url': '/paybill/pay',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 付款申请
  paybillPaymentApply: {
    'url': '/paybill/paymentApply',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 付款单列表--分页
  paybillQueryPaymentlist: {
    'url': '/paybill/queryPaymentlist',
    'mock': USE_MOCK
  },

  // 驳回
  paybillReject: {
    'url': '/paybill/reject',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  paybillSave: {
    'url': '/paybill/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  paybillUpdate: {
    'url': '/paybill/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============付款单end=========== */

  /* =============应付账单start=========== */
  // 批量保存
  paymentbillBatchSave: {
    'url': '/paymentbill/batchSave',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 收取滞纳金
  paymentbillChargeLateFee: {
    'url': '/paymentbill/chargeLateFee',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除流水匹配
  paymentbillDelRoutedMatching: {
    'url': '/paymentbill/delRoutedMatching',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 删除
  paymentbillDelete: {
    'url': '/paymentbill/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 账单导出
  paymentbillExport: {
    'url': '/paymentbill/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code查看详细信息
  paymentbillGetInfoByCode: {
    'url': '/paymentbill/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  paymentbillInfo: {
    'url': '/paymentbill/info/{id}',
    'mock': USE_MOCK
  },

  // 新增流水并匹配
  paymentbillInsertRoutedMatching: {
    'url': '/paymentbill/insertRoutedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 账单列表
  paymentbillList: {
    'url': '/paymentbill/list',
    'mock': USE_MOCK
  },

  // 付款单列表--分页
  paymentbillQueryPaymentlist: {
    'url': '/paymentbill/queryPaymentlist',
    'mock': USE_MOCK
  },

  // 流水匹配
  paymentbillRoutedMatching: {
    'url': '/paymentbill/routedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  paymentbillSave: {
    'url': '/paymentbill/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  paymentbillUpdate: {
    'url': '/paymentbill/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============应付账单end=========== */

  /* =============支出流水start=========== */
  // 删除
  payrecordDelete: {
    'url': '/payrecord/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  payrecordExport: {
    'url': '/payrecord/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  payrecordGetInfoByCode: {
    'url': '/payrecord/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  payrecordInfo: {
    'url': '/payrecord/info/{id}',
    'mock': USE_MOCK
  },

  // 新增流水并匹配
  payrecordInsertRoutedAatching: {
    'url': '/payrecord/insertRoutedAatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 新增转账单
  payrecordInsertTransfer: {
    'url': '/payrecord/insertTransfer',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 获取列表
  payrecordList: {
    'url': '/payrecord/list',
    'mock': USE_MOCK
  },

  // 收款单匹配
  payrecordRoutedMatching: {
    'url': '/payrecord/routedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  payrecordSave: {
    'url': '/payrecord/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  payrecordUpdate: {
    'url': '/payrecord/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============支出流水end=========== */

  /* =============process-event-controllerstart=========== */
  // allListenerConfig
  processEventAllListenerConfig: {
    'url': '/processEvent/allListenerConfig/{processType}',
    'mock': USE_MOCK
  },

  // onProcessEvent
  processEventOnProcessEvent: {
    'url': '/processEvent/onProcessEvent/{processType}',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============process-event-controllerend=========== */

  /* =============收入账单start=========== */
  // 批量保存
  revenuebillBatchSave: {
    'url': '/revenuebill/batchSave',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 收取滞纳金
  revenuebillChargeLateFee: {
    'url': '/revenuebill/chargeLateFee',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除流水匹配
  revenuebillDelRoutedMatching: {
    'url': '/revenuebill/delRoutedMatching',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 删除
  revenuebillDelete: {
    'url': '/revenuebill/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 账单导出
  revenuebillExport: {
    'url': '/revenuebill/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code查看详细信息
  revenuebillGetInfoByCode: {
    'url': '/revenuebill/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  revenuebillInfo: {
    'url': '/revenuebill/info/{id}',
    'mock': USE_MOCK
  },

  // 新增流水并匹配
  revenuebillInsertRoutedMatching: {
    'url': '/revenuebill/insertRoutedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 账单列表
  revenuebillList: {
    'url': '/revenuebill/list',
    'mock': USE_MOCK
  },

  // 付款单列表--分页
  revenuebillQueryPaymentlist: {
    'url': '/revenuebill/queryPaymentlist',
    'mock': USE_MOCK
  },

  // 流水匹配
  revenuebillRoutedMatching: {
    'url': '/revenuebill/routedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  revenuebillSave: {
    'url': '/revenuebill/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  revenuebillUpdate: {
    'url': '/revenuebill/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============收入账单end=========== */

  /* =============收入流水start=========== */
  // 删除
  revenuerecordDelete: {
    'url': '/revenuerecord/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 导出
  revenuerecordExport: {
    'url': '/revenuerecord/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 查看详细信息
  revenuerecordGetInfoByCode: {
    'url': '/revenuerecord/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  revenuerecordInfo: {
    'url': '/revenuerecord/info/{id}',
    'mock': USE_MOCK
  },

  // 新增流水并匹配
  revenuerecordInsertRoutedAatching: {
    'url': '/revenuerecord/insertRoutedAatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 新增转账单
  revenuerecordInsertTransfer: {
    'url': '/revenuerecord/insertTransfer',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 获取列表
  revenuerecordList: {
    'url': '/revenuerecord/list',
    'mock': USE_MOCK
  },

  // 收款单匹配
  revenuerecordRoutedMatching: {
    'url': '/revenuerecord/routedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  revenuerecordSave: {
    'url': '/revenuerecord/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  revenuerecordUpdate: {
    'url': '/revenuerecord/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============收入流水end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============今日应付账单start=========== */
  // 批量保存
  todaybillBatchSave: {
    'url': '/todaybill/batchSave',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 收取滞纳金
  todaybillChargeLateFee: {
    'url': '/todaybill/chargeLateFee',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 删除流水匹配
  todaybillDelRoutedMatching: {
    'url': '/todaybill/delRoutedMatching',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 删除
  todaybillDelete: {
    'url': '/todaybill/delete',
    'mock': USE_MOCK,
    'methods': 'delete'
  },

  // 账单导出
  todaybillExport: {
    'url': '/todaybill/export',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 根据code查看详细信息
  todaybillGetInfoByCode: {
    'url': '/todaybill/getInfoByCode',
    'mock': USE_MOCK
  },

  // 查看详细信息
  todaybillInfo: {
    'url': '/todaybill/info/{id}',
    'mock': USE_MOCK
  },

  // 新增流水并匹配
  todaybillInsertRoutedMatching: {
    'url': '/todaybill/insertRoutedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 账单列表
  todaybillList: {
    'url': '/todaybill/list',
    'mock': USE_MOCK
  },

  // 付款单列表--分页
  todaybillQueryPaymentlist: {
    'url': '/todaybill/queryPaymentlist',
    'mock': USE_MOCK
  },

  // 流水匹配
  todaybillRoutedMatching: {
    'url': '/todaybill/routedMatching',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 保存
  todaybillSave: {
    'url': '/todaybill/save',
    'mock': USE_MOCK,
    'methods': 'post'
  },

  // 修改
  todaybillUpdate: {
    'url': '/todaybill/update',
    'mock': USE_MOCK,
    'methods': 'post'
  },
  /* =============今日应付账单end=========== */

  /* =============服务健康检查start=========== */
  // 检查服务健康状况
  healthCheck: {
    'url': '/ws/health/check',
    'mock': USE_MOCK
  },
  /* =============服务健康检查end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': USE_MOCK
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}