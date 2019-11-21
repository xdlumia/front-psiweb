const MOCK_ADDRESS = '/mock/5dce08cfbc54fc3da273f529/see-psi-finance-service'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============账单start=========== */
  // 复核通过
  fbillAuditApproval: {
    'url': '/fbill/auditApproval',
    'mock': false,
    'methods': 'post'
  },

  // 批量保存
  fbillBatchSave: {
    'url': '/fbill/batchSave',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  fbillDelete: {
    'url': '/fbill/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 账单导出
  fbillExport: {
    'url': '/fbill/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  fbillGetInfoByCode: {
    'url': '/fbill/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  fbillInfo: {
    'url': '/fbill/info/{id}',
    'mock': false
  },

  // 账单列表
  fbillList: {
    'url': '/fbill/list',
    'mock': false
  },

  // 审核通过
  fbillPassApproval: {
    'url': '/fbill/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 付款申请
  fbillPaymentApply: {
    'url': '/fbill/paymentApply',
    'mock': false,
    'methods': 'post'
  },

  // 付款单列表--分页
  fbillQueryPaymentlist: {
    'url': '/fbill/queryPaymentlist',
    'mock': false
  },

  // 驳回
  fbillReject: {
    'url': '/fbill/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  fbillSave: {
    'url': '/fbill/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  fbillUpdate: {
    'url': '/fbill/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============账单end=========== */

  /* =============账单调整表start=========== */
  // 撤销审核
  fbilladjustCancel: {
    'url': '/fbilladjust/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  fbilladjustDelete: {
    'url': '/fbilladjust/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  fbilladjustExport: {
    'url': '/fbilladjust/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  fbilladjustGetInfoByCode: {
    'url': '/fbilladjust/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  fbilladjustInfo: {
    'url': '/fbilladjust/info/{id}',
    'mock': false
  },

  // 获取列表
  fbilladjustList: {
    'url': '/fbilladjust/list',
    'mock': false
  },

  // 审核通过
  fbilladjustPassApproval: {
    'url': '/fbilladjust/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  fbilladjustReject: {
    'url': '/fbilladjust/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  fbilladjustSave: {
    'url': '/fbilladjust/save',
    'mock': false,
    'methods': 'post'
  },

  // 账单调整申请
  fbilladjustSubmitApproval: {
    'url': '/fbilladjust/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  fbilladjustUpdate: {
    'url': '/fbilladjust/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============账单调整表end=========== */

  /* =============借款单start=========== */
  // 删除
  fborrowingDelete: {
    'url': '/fborrowing/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  fborrowingExport: {
    'url': '/fborrowing/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  fborrowingGetInfoByCode: {
    'url': '/fborrowing/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  fborrowingInfo: {
    'url': '/fborrowing/info/{id}',
    'mock': false
  },

  // 获取列表
  fborrowingList: {
    'url': '/fborrowing/list',
    'mock': false
  },

  // 保存
  fborrowingSave: {
    'url': '/fborrowing/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  fborrowingUpdate: {
    'url': '/fborrowing/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============借款单end=========== */

  /* =============费用单start=========== */
  // 复核通过
  fcostAuditApproval: {
    'url': '/fcost/auditApproval',
    'mock': false,
    'methods': 'post'
  },

  // 撤销审核
  fcostCancel: {
    'url': '/fcost/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  fcostDelete: {
    'url': '/fcost/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  fcostExport: {
    'url': '/fcost/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查询详情
  fcostGetInfoByCode: {
    'url': '/fcost/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  fcostInfo: {
    'url': '/fcost/info/{id}',
    'mock': false
  },

  // 获取列表
  fcostList: {
    'url': '/fcost/list',
    'mock': false
  },

  // 审核通过
  fcostPassApproval: {
    'url': '/fcost/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  fcostReject: {
    'url': '/fcost/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  fcostSave: {
    'url': '/fcost/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  fcostSubmitApproval: {
    'url': '/fcost/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  fcostUpdate: {
    'url': '/fcost/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============费用单end=========== */

  /* =============流水start=========== */
  // 删除
  fincomerecordDelete: {
    'url': '/fincomerecord/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  fincomerecordExport: {
    'url': '/fincomerecord/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  fincomerecordGetInfoByCode: {
    'url': '/fincomerecord/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  fincomerecordInfo: {
    'url': '/fincomerecord/info/{id}',
    'mock': false
  },

  // 新增流水并匹配
  fincomerecordInsertRoutedAatching: {
    'url': '/fincomerecord/insertRoutedAatching',
    'mock': false,
    'methods': 'post'
  },

  // 新增转账单
  fincomerecordInsertTransfer: {
    'url': '/fincomerecord/insertTransfer',
    'mock': false,
    'methods': 'post'
  },

  // 获取列表
  fincomerecordList: {
    'url': '/fincomerecord/list',
    'mock': false
  },

  // 保存
  fincomerecordSave: {
    'url': '/fincomerecord/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  fincomerecordUpdate: {
    'url': '/fincomerecord/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============流水end=========== */

  /* =============账单匹配流水关系表start=========== */
  // 删除
  fincomerecordmatchDelete: {
    'url': '/fincomerecordmatch/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  fincomerecordmatchInfo: {
    'url': '/fincomerecordmatch/info/{id}',
    'mock': false
  },

  // 获取列表
  fincomerecordmatchList: {
    'url': '/fincomerecordmatch/list',
    'mock': false
  },

  // 不分页列表
  fincomerecordmatchQueryList: {
    'url': '/fincomerecordmatch/queryList',
    'mock': false
  },

  // 保存
  fincomerecordmatchSave: {
    'url': '/fincomerecordmatch/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  fincomerecordmatchUpdate: {
    'url': '/fincomerecordmatch/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============账单匹配流水关系表end=========== */

  /* =============票据表start=========== */
  // 审核
  finvoiceApproval: {
    'url': '/finvoice/approval',
    'mock': false,
    'methods': 'post'
  },

  // 作废
  finvoiceCancellation: {
    'url': '/finvoice/cancellation',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  finvoiceDelete: {
    'url': '/finvoice/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  finvoiceExport: {
    'url': '/finvoice/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  finvoiceInfo: {
    'url': '/finvoice/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoiceList: {
    'url': '/finvoice/list',
    'mock': false
  },

  // 保存
  finvoiceSave: {
    'url': '/finvoice/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  finvoiceUpdate: {
    'url': '/finvoice/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============票据表end=========== */

  /* =============开票据start=========== */
  // 开票
  finvoicebillingBilling: {
    'url': '/finvoicebilling/billing',
    'mock': false,
    'methods': 'post'
  },

  // 撤销审核
  finvoicebillingCancel: {
    'url': '/finvoicebilling/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 作废
  finvoicebillingCancellation: {
    'url': '/finvoicebilling/cancellation',
    'mock': false
  },

  // 删除
  finvoicebillingDelete: {
    'url': '/finvoicebilling/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 冲红
  finvoicebillingDilution: {
    'url': '/finvoicebilling/dilution',
    'mock': false
  },

  // 导出
  finvoicebillingExport: {
    'url': '/finvoicebilling/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  finvoicebillingInfo: {
    'url': '/finvoicebilling/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoicebillingList: {
    'url': '/finvoicebilling/list',
    'mock': false
  },

  // 审核通过
  finvoicebillingPassApproval: {
    'url': '/finvoicebilling/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  finvoicebillingReject: {
    'url': '/finvoicebilling/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  finvoicebillingSave: {
    'url': '/finvoicebilling/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  finvoicebillingSubmitApproval: {
    'url': '/finvoicebilling/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  finvoicebillingUpdate: {
    'url': '/finvoicebilling/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============开票据end=========== */

  /* =============发票号码库start=========== */
  // 删除
  finvoicecodingDelete: {
    'url': '/finvoicecoding/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  finvoicecodingInfo: {
    'url': '/finvoicecoding/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoicecodingList: {
    'url': '/finvoicecoding/list',
    'mock': false
  },

  // 保存
  finvoicecodingSave: {
    'url': '/finvoicecoding/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  finvoicecodingUpdate: {
    'url': '/finvoicecoding/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============发票号码库end=========== */

  /* =============发票本start=========== */
  // 删除
  finvoicedatumDelete: {
    'url': '/finvoicedatum/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  finvoicedatumExport: {
    'url': '/finvoicedatum/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  finvoicedatumInfo: {
    'url': '/finvoicedatum/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoicedatumList: {
    'url': '/finvoicedatum/list',
    'mock': false
  },

  // 保存
  finvoicedatumSave: {
    'url': '/finvoicedatum/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  finvoicedatumUpdate: {
    'url': '/finvoicedatum/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============发票本end=========== */

  /* =============发票详细信息start=========== */
  // 删除
  finvoicedetailDelete: {
    'url': '/finvoicedetail/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  finvoicedetailInfo: {
    'url': '/finvoicedetail/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoicedetailList: {
    'url': '/finvoicedetail/list',
    'mock': false
  },

  // 保存
  finvoicedetailSave: {
    'url': '/finvoicedetail/save',
    'mock': false,
    'methods': 'post'
  },
  /* =============发票详细信息end=========== */

  /* =============收票start=========== */
  // 撤销审核
  finvoicereceivableCancel: {
    'url': '/finvoicereceivable/cancel',
    'mock': false,
    'methods': 'post'
  },

  // 作废
  finvoicereceivableCancellation: {
    'url': '/finvoicereceivable/cancellation',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  finvoicereceivableDelete: {
    'url': '/finvoicereceivable/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  finvoicereceivableExport: {
    'url': '/finvoicereceivable/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  finvoicereceivableInfo: {
    'url': '/finvoicereceivable/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoicereceivableList: {
    'url': '/finvoicereceivable/list',
    'mock': false
  },

  // 审核通过
  finvoicereceivablePassApproval: {
    'url': '/finvoicereceivable/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 驳回
  finvoicereceivableReject: {
    'url': '/finvoicereceivable/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  finvoicereceivableSave: {
    'url': '/finvoicereceivable/save',
    'mock': false,
    'methods': 'post'
  },

  // 提交审核
  finvoicereceivableSubmitApproval: {
    'url': '/finvoicereceivable/submitApproval',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  finvoicereceivableUpdate: {
    'url': '/finvoicereceivable/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============收票end=========== */

  /* =============发票库start=========== */
  // 删除
  finvoicewarehouseDelete: {
    'url': '/finvoicewarehouse/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  finvoicewarehouseInfo: {
    'url': '/finvoicewarehouse/info/{id}',
    'mock': false
  },

  // 获取列表
  finvoicewarehouseList: {
    'url': '/finvoicewarehouse/list',
    'mock': false
  },

  // 保存
  finvoicewarehouseSave: {
    'url': '/finvoicewarehouse/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  finvoicewarehouseUpdate: {
    'url': '/finvoicewarehouse/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============发票库end=========== */

  /* =============还款记录表start=========== */
  // 删除
  frepaymentrecordDelete: {
    'url': '/frepaymentrecord/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 查看详细信息
  frepaymentrecordInfo: {
    'url': '/frepaymentrecord/info/{id}',
    'mock': false
  },

  // 获取列表
  frepaymentrecordList: {
    'url': '/frepaymentrecord/list',
    'mock': false
  },

  // 保存
  frepaymentrecordSave: {
    'url': '/frepaymentrecord/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  frepaymentrecordUpdate: {
    'url': '/frepaymentrecord/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============还款记录表end=========== */

  /* =============付款单start=========== */
  // 复核通过
  paybillAuditApproval: {
    'url': '/paybill/auditApproval',
    'mock': false,
    'methods': 'post'
  },

  // 批量付款申请
  paybillBatchPaymentApply: {
    'url': '/paybill/batchPaymentApply',
    'mock': false,
    'methods': 'post'
  },

  // 批量保存
  paybillBatchSave: {
    'url': '/paybill/batchSave',
    'mock': false,
    'methods': 'post'
  },

  // 删除
  paybillDelete: {
    'url': '/paybill/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 账单导出
  paybillExport: {
    'url': '/paybill/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  paybillGetInfoByCode: {
    'url': '/paybill/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  paybillInfo: {
    'url': '/paybill/info/{id}',
    'mock': false
  },

  // 账单列表
  paybillList: {
    'url': '/paybill/list',
    'mock': false
  },

  // 审核通过
  paybillPassApproval: {
    'url': '/paybill/passApproval',
    'mock': false,
    'methods': 'post'
  },

  // 付款
  paybillPay: {
    'url': '/paybill/pay',
    'mock': false,
    'methods': 'post'
  },

  // 付款申请
  paybillPaymentApply: {
    'url': '/paybill/paymentApply',
    'mock': false,
    'methods': 'post'
  },

  // 付款单列表--分页
  paybillQueryPaymentlist: {
    'url': '/paybill/queryPaymentlist',
    'mock': false
  },

  // 驳回
  paybillReject: {
    'url': '/paybill/reject',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  paybillSave: {
    'url': '/paybill/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  paybillUpdate: {
    'url': '/paybill/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============付款单end=========== */

  /* =============应付账单start=========== */
  // 批量保存
  paymentbillBatchSave: {
    'url': '/paymentbill/batchSave',
    'mock': false,
    'methods': 'post'
  },

  // 收取滞纳金
  paymentbillChargeLateFee: {
    'url': '/paymentbill/chargeLateFee',
    'mock': false,
    'methods': 'post'
  },

  // 删除流水匹配
  paymentbillDelRoutedMatching: {
    'url': '/paymentbill/delRoutedMatching',
    'mock': false,
    'methods': 'delete'
  },

  // 删除
  paymentbillDelete: {
    'url': '/paymentbill/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 账单导出
  paymentbillExport: {
    'url': '/paymentbill/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  paymentbillGetInfoByCode: {
    'url': '/paymentbill/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  paymentbillInfo: {
    'url': '/paymentbill/info/{id}',
    'mock': false
  },

  // 新增流水并匹配
  paymentbillInsertRoutedMatching: {
    'url': '/paymentbill/insertRoutedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 账单列表
  paymentbillList: {
    'url': '/paymentbill/list',
    'mock': false
  },

  // 付款单列表--分页
  paymentbillQueryPaymentlist: {
    'url': '/paymentbill/queryPaymentlist',
    'mock': false
  },

  // 流水匹配
  paymentbillRoutedMatching: {
    'url': '/paymentbill/routedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  paymentbillSave: {
    'url': '/paymentbill/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  paymentbillUpdate: {
    'url': '/paymentbill/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============应付账单end=========== */

  /* =============支出流水start=========== */
  // 删除
  payrecordDelete: {
    'url': '/payrecord/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  payrecordExport: {
    'url': '/payrecord/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  payrecordGetInfoByCode: {
    'url': '/payrecord/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  payrecordInfo: {
    'url': '/payrecord/info/{id}',
    'mock': false
  },

  // 新增流水并匹配
  payrecordInsertRoutedAatching: {
    'url': '/payrecord/insertRoutedAatching',
    'mock': false,
    'methods': 'post'
  },

  // 新增转账单
  payrecordInsertTransfer: {
    'url': '/payrecord/insertTransfer',
    'mock': false,
    'methods': 'post'
  },

  // 获取列表
  payrecordList: {
    'url': '/payrecord/list',
    'mock': false
  },

  // 收款单匹配
  payrecordRoutedMatching: {
    'url': '/payrecord/routedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  payrecordSave: {
    'url': '/payrecord/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  payrecordUpdate: {
    'url': '/payrecord/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============支出流水end=========== */

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

  /* =============收入账单start=========== */
  // 批量保存
  revenuebillBatchSave: {
    'url': '/revenuebill/batchSave',
    'mock': false,
    'methods': 'post'
  },

  // 收取滞纳金
  revenuebillChargeLateFee: {
    'url': '/revenuebill/chargeLateFee',
    'mock': false,
    'methods': 'post'
  },

  // 删除流水匹配
  revenuebillDelRoutedMatching: {
    'url': '/revenuebill/delRoutedMatching',
    'mock': false,
    'methods': 'delete'
  },

  // 删除
  revenuebillDelete: {
    'url': '/revenuebill/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 账单导出
  revenuebillExport: {
    'url': '/revenuebill/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  revenuebillGetInfoByCode: {
    'url': '/revenuebill/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  revenuebillInfo: {
    'url': '/revenuebill/info/{id}',
    'mock': false
  },

  // 新增流水并匹配
  revenuebillInsertRoutedMatching: {
    'url': '/revenuebill/insertRoutedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 账单列表
  revenuebillList: {
    'url': '/revenuebill/list',
    'mock': false
  },

  // 付款单列表--分页
  revenuebillQueryPaymentlist: {
    'url': '/revenuebill/queryPaymentlist',
    'mock': false
  },

  // 流水匹配
  revenuebillRoutedMatching: {
    'url': '/revenuebill/routedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  revenuebillSave: {
    'url': '/revenuebill/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  revenuebillUpdate: {
    'url': '/revenuebill/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============收入账单end=========== */

  /* =============收入流水start=========== */
  // 删除
  revenuerecordDelete: {
    'url': '/revenuerecord/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 导出
  revenuerecordExport: {
    'url': '/revenuerecord/export',
    'mock': false,
    'methods': 'post'
  },

  // 查看详细信息
  revenuerecordGetInfoByCode: {
    'url': '/revenuerecord/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  revenuerecordInfo: {
    'url': '/revenuerecord/info/{id}',
    'mock': false
  },

  // 新增流水并匹配
  revenuerecordInsertRoutedAatching: {
    'url': '/revenuerecord/insertRoutedAatching',
    'mock': false,
    'methods': 'post'
  },

  // 新增转账单
  revenuerecordInsertTransfer: {
    'url': '/revenuerecord/insertTransfer',
    'mock': false,
    'methods': 'post'
  },

  // 获取列表
  revenuerecordList: {
    'url': '/revenuerecord/list',
    'mock': false
  },

  // 收款单匹配
  revenuerecordRoutedMatching: {
    'url': '/revenuerecord/routedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  revenuerecordSave: {
    'url': '/revenuerecord/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  revenuerecordUpdate: {
    'url': '/revenuerecord/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============收入流水end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': false,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============今日应付账单start=========== */
  // 批量保存
  todaybillBatchSave: {
    'url': '/todaybill/batchSave',
    'mock': false,
    'methods': 'post'
  },

  // 收取滞纳金
  todaybillChargeLateFee: {
    'url': '/todaybill/chargeLateFee',
    'mock': false,
    'methods': 'post'
  },

  // 删除流水匹配
  todaybillDelRoutedMatching: {
    'url': '/todaybill/delRoutedMatching',
    'mock': false,
    'methods': 'delete'
  },

  // 删除
  todaybillDelete: {
    'url': '/todaybill/delete',
    'mock': false,
    'methods': 'delete'
  },

  // 账单导出
  todaybillExport: {
    'url': '/todaybill/export',
    'mock': false,
    'methods': 'post'
  },

  // 根据code查看详细信息
  todaybillGetInfoByCode: {
    'url': '/todaybill/getInfoByCode',
    'mock': false
  },

  // 查看详细信息
  todaybillInfo: {
    'url': '/todaybill/info/{id}',
    'mock': false
  },

  // 新增流水并匹配
  todaybillInsertRoutedMatching: {
    'url': '/todaybill/insertRoutedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 账单列表
  todaybillList: {
    'url': '/todaybill/list',
    'mock': false
  },

  // 付款单列表--分页
  todaybillQueryPaymentlist: {
    'url': '/todaybill/queryPaymentlist',
    'mock': false
  },

  // 流水匹配
  todaybillRoutedMatching: {
    'url': '/todaybill/routedMatching',
    'mock': false,
    'methods': 'post'
  },

  // 保存
  todaybillSave: {
    'url': '/todaybill/save',
    'mock': false,
    'methods': 'post'
  },

  // 修改
  todaybillUpdate: {
    'url': '/todaybill/update',
    'mock': false,
    'methods': 'post'
  },
  /* =============今日应付账单end=========== */

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