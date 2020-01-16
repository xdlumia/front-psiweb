// const MOCK_ADDRESS = '/mock/5dc23e61bc54fc3da273f404/39.99.132.95:9215'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5dc23e61bc54fc3da273f404/39.99.132.95:9215'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-12-04
* @host 39.99.132.95:9215
*/
export default {
  __mockAddress: MOCK_ADDRESS,

  /**
     * @tag 账单
     * @description 复核通过
     */
  fbillAuditApproval: {
    url: '/fbill/auditApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 批量保存
     */
  fbillBatchSave: {
    url: '/fbill/batchSave',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 删除
     */
  fbillDelete: {
    url: '/fbill/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 账单导出
     */
  fbillExport: {
    url: '/fbill/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 客户账单统计
     */
  fbillGetClientFbillStatistics: {
    url: '/fbill/getClientFbillStatistics',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 根据code查看详细信息
     */
  fbillGetInfoByCode: {
    url: '/fbill/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 查看详细信息
     */
  fbillInfo: {
    url: '/fbill/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 账单列表
     */
  fbillList: {
    url: '/fbill/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 审核通过
     */
  fbillPassApproval: {
    url: '/fbill/passApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 付款申请
     */
  fbillPaymentApply: {
    url: '/fbill/paymentApply',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 付款单列表--分页
     */
  fbillQueryPaymentlist: {
    url: '/fbill/queryPaymentlist',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 驳回
     */
  fbillReject: {
    url: '/fbill/reject',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 保存
     */
  fbillSave: {
    url: '/fbill/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 修改
     */
  fbillUpdate: {
    url: '/fbill/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单
     * @description 根据code修改
     */
  fbillUpdateByBusCode: {
    url: '/fbill/updateByBusCode',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 撤销审核
     */
  fbilladjustCancel: {
    url: '/fbilladjust/cancel',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 删除
     */
  fbilladjustDelete: {
    url: '/fbilladjust/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 导出
     */
  fbilladjustExport: {
    url: '/fbilladjust/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 查看详细信息
     */
  fbilladjustGetInfoByCode: {
    url: '/fbilladjust/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 查看详细信息
     */
  fbilladjustInfo: {
    url: '/fbilladjust/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 获取列表
     */
  fbilladjustList: {
    url: '/fbilladjust/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 审核通过
     */
  fbilladjustPassApproval: {
    url: '/fbilladjust/passApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 驳回
     */
  fbilladjustReject: {
    url: '/fbilladjust/reject',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 保存
     */
  fbilladjustSave: {
    url: '/fbilladjust/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 账单调整申请
     */
  fbilladjustSubmitApproval: {
    url: '/fbilladjust/submitApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单调整表
     * @description 修改
     */
  fbilladjustUpdate: {
    url: '/fbilladjust/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 删除
     */
  fborrowingDelete: {
    url: '/fborrowing/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 导出
     */
  fborrowingExport: {
    url: '/fborrowing/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 根据code查看详细信息
     */
  fborrowingGetInfoByCode: {
    url: '/fborrowing/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 查看详细信息
     */
  fborrowingInfo: {
    url: '/fborrowing/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 获取列表
     */
  fborrowingList: {
    url: '/fborrowing/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 逻辑删除
     */
  fborrowingLogicDelete: {
    url: '/fborrowing/logicDelete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 保存
     */
  fborrowingSave: {
    url: '/fborrowing/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 借款单
     * @description 修改
     */
  fborrowingUpdate: {
    url: '/fborrowing/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 复核通过
     */
  fcostAuditApproval: {
    url: '/fcost/auditApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 撤销审核
     */
  fcostCancel: {
    url: '/fcost/cancel',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 删除
     */
  fcostDelete: {
    url: '/fcost/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 导出
     */
  fcostExport: {
    url: '/fcost/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 根据code查询详情
     */
  fcostGetInfoByCode: {
    url: '/fcost/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 查看详细信息
     */
  fcostInfo: {
    url: '/fcost/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 获取列表
     */
  fcostList: {
    url: '/fcost/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 逻辑删除
     */
  fcostLogicDelete: {
    url: '/fcost/logicDelete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 审核通过
     */
  fcostPassApproval: {
    url: '/fcost/passApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 驳回
     */
  fcostReject: {
    url: '/fcost/reject',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 保存
     */
  fcostSave: {
    url: '/fcost/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 提交审核
     */
  fcostSubmitApproval: {
    url: '/fcost/submitApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 费用单
     * @description 修改
     */
  fcostUpdate: {
    url: '/fcost/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 财务任务
     * @description 收票逾期处理
     */
  financeJobCalculateInvoiceReceivaOver: {
    url: '/financeJob/calculateInvoiceReceivaOver',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 财务任务
     * @description 账单逾期处理
     */
  financeJobCalculateOverDays: {
    url: '/financeJob/calculateOverDays',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 删除
     */
  fincomerecordDelete: {
    url: '/fincomerecord/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 导出
     */
  fincomerecordExport: {
    url: '/fincomerecord/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 查看详细信息
     */
  fincomerecordGetInfoByCode: {
    url: '/fincomerecord/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 查看详细信息
     */
  fincomerecordInfo: {
    url: '/fincomerecord/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 新增流水并匹配
     */
  fincomerecordInsertRoutedAatching: {
    url: '/fincomerecord/insertRoutedAatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 新增转账单
     */
  fincomerecordInsertTransfer: {
    url: '/fincomerecord/insertTransfer',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 获取列表
     */
  fincomerecordList: {
    url: '/fincomerecord/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 保存
     */
  fincomerecordSave: {
    url: '/fincomerecord/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 流水
     * @description 修改
     */
  fincomerecordUpdate: {
    url: '/fincomerecord/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单匹配流水关系表
     * @description 删除
     */
  fincomerecordmatchDelete: {
    url: '/fincomerecordmatch/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 账单匹配流水关系表
     * @description 查看详细信息
     */
  fincomerecordmatchInfo: {
    url: '/fincomerecordmatch/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单匹配流水关系表
     * @description 获取列表
     */
  fincomerecordmatchList: {
    url: '/fincomerecordmatch/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单匹配流水关系表
     * @description 不分页列表
     */
  fincomerecordmatchQueryList: {
    url: '/fincomerecordmatch/queryList',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 账单匹配流水关系表
     * @description 保存
     */
  fincomerecordmatchSave: {
    url: '/fincomerecordmatch/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 账单匹配流水关系表
     * @description 修改
     */
  fincomerecordmatchUpdate: {
    url: '/fincomerecordmatch/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 删除
     */
  finvoiceDelete: {
    url: '/finvoice/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 查看详细信息
     */
  finvoiceInfo: {
    url: '/finvoice/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 根据业务code，验证票据是否存在
     */
  finvoiceIsFinvoice: {
    url: '/finvoice/isFinvoice',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 获取列表
     */
  finvoiceList: {
    url: '/finvoice/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 逻辑删除
     */
  finvoiceLogicDelete: {
    url: '/finvoice/logicDelete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 保存
     */
  finvoiceSave: {
    url: '/finvoice/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 票据表
     * @description 修改
     */
  finvoiceUpdate: {
    url: '/finvoice/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 开票
     */
  finvoicebillingBilling: {
    url: '/finvoicebilling/billing',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 撤销审核
     */
  finvoicebillingCancel: {
    url: '/finvoicebilling/cancel',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 作废
     */
  finvoicebillingCancellation: {
    url: '/finvoicebilling/cancellation',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 删除
     */
  finvoicebillingDelete: {
    url: '/finvoicebilling/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 冲红
     */
  finvoicebillingDilution: {
    url: '/finvoicebilling/dilution',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 导出
     */
  finvoicebillingExport: {
    url: '/finvoicebilling/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 查看详细信息
     */
  finvoicebillingInfo: {
    url: '/finvoicebilling/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 获取列表
     */
  finvoicebillingList: {
    url: '/finvoicebilling/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 审核通过
     */
  finvoicebillingPassApproval: {
    url: '/finvoicebilling/passApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 驳回
     */
  finvoicebillingReject: {
    url: '/finvoicebilling/reject',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 保存
     */
  finvoicebillingSave: {
    url: '/finvoicebilling/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 提交审核
     */
  finvoicebillingSubmitApproval: {
    url: '/finvoicebilling/submitApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 开票据
     * @description 修改
     */
  finvoicebillingUpdate: {
    url: '/finvoicebilling/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票号码库
     * @description 删除
     */
  finvoicecodingDelete: {
    url: '/finvoicecoding/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 发票号码库
     * @description 查看详细信息
     */
  finvoicecodingInfo: {
    url: '/finvoicecoding/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票号码库
     * @description 获取列表
     */
  finvoicecodingList: {
    url: '/finvoicecoding/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票号码库
     * @description 保存
     */
  finvoicecodingSave: {
    url: '/finvoicecoding/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票号码库
     * @description 修改
     */
  finvoicecodingUpdate: {
    url: '/finvoicecoding/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票本
     * @description 删除
     */
  finvoicedatumDelete: {
    url: '/finvoicedatum/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 发票本
     * @description 导出
     */
  finvoicedatumExport: {
    url: '/finvoicedatum/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票本
     * @description 查看详细信息
     */
  finvoicedatumInfo: {
    url: '/finvoicedatum/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票本
     * @description 获取列表
     */
  finvoicedatumList: {
    url: '/finvoicedatum/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票本
     * @description 保存
     */
  finvoicedatumSave: {
    url: '/finvoicedatum/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票本
     * @description 修改
     */
  finvoicedatumUpdate: {
    url: '/finvoicedatum/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票详细信息
     * @description 删除
     */
  finvoicedetailDelete: {
    url: '/finvoicedetail/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 发票详细信息
     * @description 查看详细信息
     */
  finvoicedetailInfo: {
    url: '/finvoicedetail/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票详细信息
     * @description 获取列表
     */
  finvoicedetailList: {
    url: '/finvoicedetail/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票详细信息
     * @description 保存
     */
  finvoicedetailSave: {
    url: '/finvoicedetail/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 撤销审核
     */
  finvoicereceivableCancel: {
    url: '/finvoicereceivable/cancel',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 作废
     */
  finvoicereceivableCancellation: {
    url: '/finvoicereceivable/cancellation',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 删除
     */
  finvoicereceivableDelete: {
    url: '/finvoicereceivable/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 导出
     */
  finvoicereceivableExport: {
    url: '/finvoicereceivable/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 查看详细信息
     */
  finvoicereceivableInfo: {
    url: '/finvoicereceivable/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 获取列表
     */
  finvoicereceivableList: {
    url: '/finvoicereceivable/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 审核通过
     */
  finvoicereceivablePassApproval: {
    url: '/finvoicereceivable/passApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 驳回
     */
  finvoicereceivableReject: {
    url: '/finvoicereceivable/reject',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 保存
     */
  finvoicereceivableSave: {
    url: '/finvoicereceivable/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 提交审核
     */
  finvoicereceivableSubmitApproval: {
    url: '/finvoicereceivable/submitApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收票
     * @description 修改
     */
  finvoicereceivableUpdate: {
    url: '/finvoicereceivable/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票库
     * @description 删除
     */
  finvoicewarehouseDelete: {
    url: '/finvoicewarehouse/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 发票库
     * @description 查看详细信息
     */
  finvoicewarehouseInfo: {
    url: '/finvoicewarehouse/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票库
     * @description 获取列表
     */
  finvoicewarehouseList: {
    url: '/finvoicewarehouse/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 发票库
     * @description 保存
     */
  finvoicewarehouseSave: {
    url: '/finvoicewarehouse/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 发票库
     * @description 修改
     */
  finvoicewarehouseUpdate: {
    url: '/finvoicewarehouse/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 还款记录表
     * @description 删除
     */
  frepaymentrecordDelete: {
    url: '/frepaymentrecord/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 还款记录表
     * @description 查看详细信息
     */
  frepaymentrecordInfo: {
    url: '/frepaymentrecord/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 还款记录表
     * @description 获取列表
     */
  frepaymentrecordList: {
    url: '/frepaymentrecord/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 还款记录表
     * @description 保存
     */
  frepaymentrecordSave: {
    url: '/frepaymentrecord/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 还款记录表
     * @description 修改
     */
  frepaymentrecordUpdate: {
    url: '/frepaymentrecord/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 复核通过
     */
  paybillAuditApproval: {
    url: '/paybill/auditApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 批量付款申请
     */
  paybillBatchPaymentApply: {
    url: '/paybill/batchPaymentApply',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 批量保存
     */
  paybillBatchSave: {
    url: '/paybill/batchSave',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 删除
     */
  paybillDelete: {
    url: '/paybill/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 账单导出
     */
  paybillExport: {
    url: '/paybill/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 根据code查看详细信息
     */
  paybillGetInfoByCode: {
    url: '/paybill/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 查看详细信息
     */
  paybillInfo: {
    url: '/paybill/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 账单列表
     */
  paybillList: {
    url: '/paybill/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 审核通过
     */
  paybillPassApproval: {
    url: '/paybill/passApproval',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 付款
     */
  paybillPay: {
    url: '/paybill/pay',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 付款申请
     */
  paybillPaymentApply: {
    url: '/paybill/paymentApply',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 付款单列表--分页
     */
  paybillQueryPaymentlist: {
    url: '/paybill/queryPaymentlist',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 驳回
     */
  paybillReject: {
    url: '/paybill/reject',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 保存
     */
  paybillSave: {
    url: '/paybill/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 付款单
     * @description 修改
     */
  paybillUpdate: {
    url: '/paybill/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 批量保存
     */
  paymentbillBatchSave: {
    url: '/paymentbill/batchSave',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 收取滞纳金
     */
  paymentbillChargeLateFee: {
    url: '/paymentbill/chargeLateFee',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 删除流水匹配
     */
  paymentbillDelRoutedMatching: {
    url: '/paymentbill/delRoutedMatching',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 删除
     */
  paymentbillDelete: {
    url: '/paymentbill/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 账单导出
     */
  paymentbillExport: {
    url: '/paymentbill/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 根据code查看详细信息
     */
  paymentbillGetInfoByCode: {
    url: '/paymentbill/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 查看详细信息
     */
  paymentbillInfo: {
    url: '/paymentbill/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 新增流水并匹配
     */
  paymentbillInsertRoutedMatching: {
    url: '/paymentbill/insertRoutedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 账单列表
     */
  paymentbillList: {
    url: '/paymentbill/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 付款单列表--分页
     */
  paymentbillQueryPaymentlist: {
    url: '/paymentbill/queryPaymentlist',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 流水匹配
     */
  paymentbillRoutedMatching: {
    url: '/paymentbill/routedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 保存
     */
  paymentbillSave: {
    url: '/paymentbill/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 应付账单
     * @description 修改
     */
  paymentbillUpdate: {
    url: '/paymentbill/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 删除
     */
  payrecordDelete: {
    url: '/payrecord/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 导出
     */
  payrecordExport: {
    url: '/payrecord/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 查看详细信息
     */
  payrecordGetInfoByCode: {
    url: '/payrecord/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 查看详细信息
     */
  payrecordInfo: {
    url: '/payrecord/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 新增流水并匹配
     */
  payrecordInsertRoutedAatching: {
    url: '/payrecord/insertRoutedAatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 新增转账单
     */
  payrecordInsertTransfer: {
    url: '/payrecord/insertTransfer',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 获取列表
     */
  payrecordList: {
    url: '/payrecord/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 收款单匹配
     */
  payrecordRoutedMatching: {
    url: '/payrecord/routedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 保存
     */
  payrecordSave: {
    url: '/payrecord/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 支出流水
     * @description 修改
     */
  payrecordUpdate: {
    url: '/payrecord/update',
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
     * @tag 收入账单
     * @description 批量保存
     */
  revenuebillBatchSave: {
    url: '/revenuebill/batchSave',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 收取滞纳金
     */
  revenuebillChargeLateFee: {
    url: '/revenuebill/chargeLateFee',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 删除流水匹配
     */
  revenuebillDelRoutedMatching: {
    url: '/revenuebill/delRoutedMatching',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 删除
     */
  revenuebillDelete: {
    url: '/revenuebill/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 账单导出
     */
  revenuebillExport: {
    url: '/revenuebill/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 根据code查看详细信息
     */
  revenuebillGetInfoByCode: {
    url: '/revenuebill/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 查看详细信息
     */
  revenuebillInfo: {
    url: '/revenuebill/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 新增流水并匹配
     */
  revenuebillInsertRoutedMatching: {
    url: '/revenuebill/insertRoutedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 账单列表
     */
  revenuebillList: {
    url: '/revenuebill/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 付款单列表--分页
     */
  revenuebillQueryPaymentlist: {
    url: '/revenuebill/queryPaymentlist',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 流水匹配
     */
  revenuebillRoutedMatching: {
    url: '/revenuebill/routedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 保存
     */
  revenuebillSave: {
    url: '/revenuebill/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入账单
     * @description 修改
     */
  revenuebillUpdate: {
    url: '/revenuebill/update',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 删除
     */
  revenuerecordDelete: {
    url: '/revenuerecord/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 导出
     */
  revenuerecordExport: {
    url: '/revenuerecord/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 查看详细信息
     */
  revenuerecordGetInfoByCode: {
    url: '/revenuerecord/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 查看详细信息
     */
  revenuerecordInfo: {
    url: '/revenuerecord/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 新增流水并匹配
     */
  revenuerecordInsertRoutedAatching: {
    url: '/revenuerecord/insertRoutedAatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 新增转账单
     */
  revenuerecordInsertTransfer: {
    url: '/revenuerecord/insertTransfer',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 获取列表
     */
  revenuerecordList: {
    url: '/revenuerecord/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 收款单匹配
     */
  revenuerecordRoutedMatching: {
    url: '/revenuerecord/routedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 保存
     */
  revenuerecordSave: {
    url: '/revenuerecord/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 收入流水
     * @description 修改
     */
  revenuerecordUpdate: {
    url: '/revenuerecord/update',
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
     * @tag 今日应付账单
     * @description 批量保存
     */
  todaybillBatchSave: {
    url: '/todaybill/batchSave',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 收取滞纳金
     */
  todaybillChargeLateFee: {
    url: '/todaybill/chargeLateFee',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 删除流水匹配
     */
  todaybillDelRoutedMatching: {
    url: '/todaybill/delRoutedMatching',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 删除
     */
  todaybillDelete: {
    url: '/todaybill/delete',
    methods: 'delete',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 账单导出
     */
  todaybillExport: {
    url: '/todaybill/export',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 根据code查看详细信息
     */
  todaybillGetInfoByCode: {
    url: '/todaybill/getInfoByCode',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 查看详细信息
     */
  todaybillInfo: {
    url: '/todaybill/info/{id}',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 新增流水并匹配
     */
  todaybillInsertRoutedMatching: {
    url: '/todaybill/insertRoutedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 账单列表
     */
  todaybillList: {
    url: '/todaybill/list',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 付款单列表--分页
     */
  todaybillQueryPaymentlist: {
    url: '/todaybill/queryPaymentlist',
    methods: 'get',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 流水匹配
     */
  todaybillRoutedMatching: {
    url: '/todaybill/routedMatching',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 保存
     */
  todaybillSave: {
    url: '/todaybill/save',
    methods: 'post',
    mock: isUseMock
  },
  /**
     * @tag 今日应付账单
     * @description 修改
     */
  todaybillUpdate: {
    url: '/todaybill/update',
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
  // 合并开票
  finvoicebillingMergeBilling: {
    'url': '/finvoicebilling/mergeBilling',
    'mock': isUseMock,
    'methods': 'post'
  }
}
