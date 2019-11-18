// const MOCK_ADDRESS = '/mock/5dba336abc54fc3da273f0a3/39.99.132.95:9201'; // pc端用
// const MOCK_ADDRESS = 'http://10.168.1.145:7300/mock/5dba336abc54fc3da273f0a3/39.99.132.95:9201'; // 小程序用
const MOCK_ADDRESS = ''; // 禁用easymock
const isUseMock = false;
/**
* @date 2019-11-18
* @host 39.99.132.95:9201
*/
export default {
    __mockAddress: MOCK_ADDRESS,

    /**
     * @tag 销售和采购调价单
     * @description 撤销
     */
    commonadjustpriceCancel: {
        url: '/commonadjustprice/cancel',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 删除
     */
    commonadjustpriceDelete: {
        url: '/commonadjustprice/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 查看详细信息
     */
    commonadjustpriceInfo: {
        url: '/commonadjustprice/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 查看详细信息
     */
    commonadjustpriceInfoByCode: {
        url: '/commonadjustprice/infoByCode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 获取列表
     */
    commonadjustpriceList: {
        url: '/commonadjustprice/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 逻辑删除
     */
    commonadjustpriceLogicDelete: {
        url: '/commonadjustprice/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 审核通过
     */
    commonadjustpricePassApproval: {
        url: '/commonadjustprice/passApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 驳回
     */
    commonadjustpriceReject: {
        url: '/commonadjustprice/reject',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 保存
     */
    commonadjustpriceSave: {
        url: '/commonadjustprice/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 提交审核
     */
    commonadjustpriceSubmitApproval: {
        url: '/commonadjustprice/submitApproval',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 销售和采购调价单
     * @description 修改
     */
    commonadjustpriceUpdate: {
        url: '/commonadjustprice/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品调价明细表
     * @description 删除
     */
    commonadjustpricedetailedDelete: {
        url: '/commonadjustpricedetailed/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 商品调价明细表
     * @description 查看详细信息
     */
    commonadjustpricedetailedInfo: {
        url: '/commonadjustpricedetailed/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 商品调价明细表
     * @description 获取列表
     */
    commonadjustpricedetailedList: {
        url: '/commonadjustpricedetailed/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 商品调价明细表
     * @description 逻辑删除
     */
    commonadjustpricedetailedLogicDelete: {
        url: '/commonadjustpricedetailed/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 商品调价明细表
     * @description 保存
     */
    commonadjustpricedetailedSave: {
        url: '/commonadjustpricedetailed/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品调价明细表
     * @description 修改
     */
    commonadjustpricedetailedUpdate: {
        url: '/commonadjustpricedetailed/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 删除
     */
    commonclientinfoDelete: {
        url: '/commonclientinfo/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 查看客户详细信息
     */
    commonclientinfoInfo: {
        url: '/commonclientinfo/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 根据编码查看客户详细信息
     */
    commonclientinfoInfoBycode: {
        url: '/commonclientinfo/infoBycode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 逻辑删除
     */
    commonclientinfoLogicDelete: {
        url: '/commonclientinfo/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 获取客户列表
     */
    commonclientinfoPagelist: {
        url: '/commonclientinfo/pagelist',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 普通查询
     */
    commonclientinfoQueryList: {
        url: '/commonclientinfo/queryList',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 保存客户
     */
    commonclientinfoSave: {
        url: '/commonclientinfo/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 客户
     * @description 修改客户
     */
    commonclientinfoUpdate: {
        url: '/commonclientinfo/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品信息表
     * @description 查看详细信息
     */
    commoncommodityinfoInfo: {
        url: '/commoncommodityinfo/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 商品信息表
     * @description 获取列表
     */
    commoncommodityinfoList: {
        url: '/commoncommodityinfo/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 商品信息表
     * @description 逻辑删除
     */
    commoncommodityinfoLogicDelete: {
        url: '/commoncommodityinfo/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 商品信息表
     * @description 保存
     */
    commoncommodityinfoSave: {
        url: '/commoncommodityinfo/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品信息表
     * @description 修改
     */
    commoncommodityinfoUpdate: {
        url: '/commoncommodityinfo/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 删除
     */
    commoncommoditysortDelete: {
        url: '/commoncommoditysort/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 查看详细信息
     */
    commoncommoditysortInfo: {
        url: '/commoncommoditysort/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 获取列表
     */
    commoncommoditysortList: {
        url: '/commoncommoditysort/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 逻辑删除
     */
    commoncommoditysortLogicDelete: {
        url: '/commoncommoditysort/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 保存
     */
    commoncommoditysortSave: {
        url: '/commoncommoditysort/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 置顶
     */
    commoncommoditysortStick: {
        url: '/commoncommoditysort/stick',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 商品分类表
     * @description 修改
     */
    commoncommoditysortUpdate: {
        url: '/commoncommoditysort/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 删除
     */
    commonpromotionDelete: {
        url: '/commonpromotion/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 查看详细信息
     */
    commonpromotionInfo: {
        url: '/commonpromotion/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 根据code详细信息
     */
    commonpromotionInfoBycode: {
        url: '/commonpromotion/infoBycode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 获取列表
     */
    commonpromotionList: {
        url: '/commonpromotion/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 逻辑删除
     */
    commonpromotionLogicDelete: {
        url: '/commonpromotion/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 保存
     */
    commonpromotionSave: {
        url: '/commonpromotion/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 促销管理表
     * @description 修改
     */
    commonpromotionUpdate: {
        url: '/commonpromotion/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与商品详细表
     * @description 删除
     */
    commonpromotioncommoditydetailsDelete: {
        url: '/commonpromotioncommoditydetails/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与商品详细表
     * @description 查看详细信息
     */
    commonpromotioncommoditydetailsInfo: {
        url: '/commonpromotioncommoditydetails/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与商品详细表
     * @description 获取列表
     */
    commonpromotioncommoditydetailsList: {
        url: '/commonpromotioncommoditydetails/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与商品详细表
     * @description 逻辑删除
     */
    commonpromotioncommoditydetailsLogicDelete: {
        url: '/commonpromotioncommoditydetails/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与商品详细表
     * @description 保存
     */
    commonpromotioncommoditydetailsSave: {
        url: '/commonpromotioncommoditydetails/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与商品详细表
     * @description 修改
     */
    commonpromotioncommoditydetailsUpdate: {
        url: '/commonpromotioncommoditydetails/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 删除
     */
    commonpromotiongoalDelete: {
        url: '/commonpromotiongoal/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 查看详细信息
     */
    commonpromotiongoalInfo: {
        url: '/commonpromotiongoal/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 查看详细信息
     */
    commonpromotiongoalInfoBycode: {
        url: '/commonpromotiongoal/infoBycode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 获取列表
     */
    commonpromotiongoalList: {
        url: '/commonpromotiongoal/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 逻辑删除
     */
    commonpromotiongoalLogicDelete: {
        url: '/commonpromotiongoal/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 保存
     */
    commonpromotiongoalSave: {
        url: '/commonpromotiongoal/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 修改
     */
    commonpromotiongoalUpdate: {
        url: '/commonpromotiongoal/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 目标管理
     * @description 设置默认目标
     */
    commonpromotiongoalUpdateDefault: {
        url: '/commonpromotiongoal/updateDefault',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 目标管理参与人详细表
     * @description 删除
     */
    commonpromotiongoalpersonnelDelete: {
        url: '/commonpromotiongoalpersonnel/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 目标管理参与人详细表
     * @description 查看详细信息
     */
    commonpromotiongoalpersonnelInfo: {
        url: '/commonpromotiongoalpersonnel/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 目标管理参与人详细表
     * @description 获取列表
     */
    commonpromotiongoalpersonnelList: {
        url: '/commonpromotiongoalpersonnel/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 目标管理参与人详细表
     * @description 逻辑删除
     */
    commonpromotiongoalpersonnelLogicDelete: {
        url: '/commonpromotiongoalpersonnel/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 目标管理参与人详细表
     * @description 保存
     */
    commonpromotiongoalpersonnelSave: {
        url: '/commonpromotiongoalpersonnel/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 目标管理参与人详细表
     * @description 修改
     */
    commonpromotiongoalpersonnelUpdate: {
        url: '/commonpromotiongoalpersonnel/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与人详细表
     * @description 删除
     */
    commonpromotionpersonnelDelete: {
        url: '/commonpromotionpersonnel/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与人详细表
     * @description 查看详细信息
     */
    commonpromotionpersonnelInfo: {
        url: '/commonpromotionpersonnel/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与人详细表
     * @description 获取列表
     */
    commonpromotionpersonnelList: {
        url: '/commonpromotionpersonnel/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与人详细表
     * @description 逻辑删除
     */
    commonpromotionpersonnelLogicDelete: {
        url: '/commonpromotionpersonnel/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与人详细表
     * @description 保存
     */
    commonpromotionpersonnelSave: {
        url: '/commonpromotionpersonnel/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 促销管理参与人详细表
     * @description 修改
     */
    commonpromotionpersonnelUpdate: {
        url: '/commonpromotionpersonnel/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 删除
     */
    commonquotationconfigDelete: {
        url: '/commonquotationconfig/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 查看详细信息
     */
    commonquotationconfigInfo: {
        url: '/commonquotationconfig/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 通过编号详细信息
     */
    commonquotationconfigInfoBycode: {
        url: '/commonquotationconfig/infoBycode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 获取列表
     */
    commonquotationconfigList: {
        url: '/commonquotationconfig/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 逻辑删除
     */
    commonquotationconfigLogicDelete: {
        url: '/commonquotationconfig/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 保存
     */
    commonquotationconfigSave: {
        url: '/commonquotationconfig/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单
     * @description 修改
     */
    commonquotationconfigUpdate: {
        url: '/commonquotationconfig/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 删除
     */
    commonquotationconfigdetailsDelete: {
        url: '/commonquotationconfigdetails/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 查看详细信息
     */
    commonquotationconfigdetailsInfo: {
        url: '/commonquotationconfigdetails/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 获取列表
     */
    commonquotationconfigdetailsList: {
        url: '/commonquotationconfigdetails/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 获取列表
     */
    commonquotationconfigdetailsListConfigByGoodName: {
        url: '/commonquotationconfigdetails/listConfigByGoodName',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 逻辑删除
     */
    commonquotationconfigdetailsLogicDelete: {
        url: '/commonquotationconfigdetails/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 保存
     */
    commonquotationconfigdetailsSave: {
        url: '/commonquotationconfigdetails/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 报价配置单详情表
     * @description 修改
     */
    commonquotationconfigdetailsUpdate: {
        url: '/commonquotationconfigdetails/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 删除
     */
    commonserviceproviderDelete: {
        url: '/commonserviceprovider/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 查看详细信息
     */
    commonserviceproviderInfo: {
        url: '/commonserviceprovider/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 根据CODE查看详细信息
     */
    commonserviceproviderInfoBycode: {
        url: '/commonserviceprovider/infoBycode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 获取列表
     */
    commonserviceproviderList: {
        url: '/commonserviceprovider/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 逻辑删除
     */
    commonserviceproviderLogicDelete: {
        url: '/commonserviceprovider/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 保存
     */
    commonserviceproviderSave: {
        url: '/commonserviceprovider/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 服务商
     * @description 修改
     */
    commonserviceproviderUpdate: {
        url: '/commonserviceprovider/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 供应商供应商品表
     * @description 删除
     */
    commonsuppliercommodityDelete: {
        url: '/commonsuppliercommodity/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 供应商供应商品表
     * @description 查看详细信息
     */
    commonsuppliercommodityInfo: {
        url: '/commonsuppliercommodity/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 供应商供应商品表
     * @description 获取列表
     */
    commonsuppliercommodityList: {
        url: '/commonsuppliercommodity/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 供应商供应商品表
     * @description 逻辑删除
     */
    commonsuppliercommodityLogicDelete: {
        url: '/commonsuppliercommodity/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 供应商供应商品表
     * @description 保存
     */
    commonsuppliercommoditySave: {
        url: '/commonsuppliercommodity/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 供应商供应商品表
     * @description 修改
     */
    commonsuppliercommodityUpdate: {
        url: '/commonsuppliercommodity/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 删除
     */
    commonsupplierinfoDelete: {
        url: '/commonsupplierinfo/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 查看详细信息
     */
    commonsupplierinfoInfo: {
        url: '/commonsupplierinfo/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 根据编码查看详细信息
     */
    commonsupplierinfoInfoBycode: {
        url: '/commonsupplierinfo/infoBycode/{code}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 逻辑删除
     */
    commonsupplierinfoLogicDelete: {
        url: '/commonsupplierinfo/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 分页获取列表
     */
    commonsupplierinfoPagelist: {
        url: '/commonsupplierinfo/pagelist',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 商品供应分类查询
     */
    commonsupplierinfoQueryListClassification: {
        url: '/commonsupplierinfo/queryListClassification',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 保存
     */
    commonsupplierinfoSave: {
        url: '/commonsupplierinfo/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 供应商信息表
     * @description 修改
     */
    commonsupplierinfoUpdate: {
        url: '/commonsupplierinfo/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 业务设置配置表
     * @description 根据类型查看配置信息(1-销售,2-库房,3-财务)
     */
    commonsystemconfigInfo: {
        url: '/commonsystemconfig/info/{configType}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 业务设置配置表
     * @description 保存
     */
    commonsystemconfigSave: {
        url: '/commonsystemconfig/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 业务设置报表配置表
     * @description 删除
     */
    commonsystemreportDelete: {
        url: '/commonsystemreport/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 业务设置报表配置表
     * @description 查看详细信息
     */
    commonsystemreportInfo: {
        url: '/commonsystemreport/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 业务设置报表配置表
     * @description 获取列表
     */
    commonsystemreportList: {
        url: '/commonsystemreport/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 业务设置报表配置表
     * @description 逻辑删除
     */
    commonsystemreportLogicDelete: {
        url: '/commonsystemreport/logicDelete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 业务设置报表配置表
     * @description 保存
     */
    commonsystemreportSave: {
        url: '/commonsystemreport/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 业务设置报表配置表
     * @description 修改
     */
    commonsystemreportUpdate: {
        url: '/commonsystemreport/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 自定义列表
     * @description 删除
     */
    customcolumnDelete: {
        url: '/customcolumn/delete',
        methods: 'delete',
        mock: isUseMock
    },
    /**
     * @tag 自定义列表
     * @description 获取列表--不分页
     */
    customcolumnGetListAll: {
        url: '/customcolumn/getListAll',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 自定义列表
     * @description 查看详细信息
     */
    customcolumnInfo: {
        url: '/customcolumn/info/{id}',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 自定义列表
     * @description 获取列表--分页
     */
    customcolumnList: {
        url: '/customcolumn/list',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 自定义列表
     * @description 保存
     */
    customcolumnSave: {
        url: '/customcolumn/save',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 自定义列表
     * @description 修改
     */
    customcolumnUpdate: {
        url: '/customcolumn/update',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag EXCEL 导入导出操作
     * @description 导出
     */
    excelExport: {
        url: '/excel/export',
        methods: 'post',
        mock: isUseMock
    },
    /**
     * @tag 首页
     * @description 查询待办
     */
    homePageQueryList: {
        url: '/homePage/queryList',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页
     * @description 查看详细信息
     */
    homePageQueryTab: {
        url: '/homePage/queryTab',
        methods: 'get',
        mock: isUseMock
    },
    /**
     * @tag 首页
     * @description 保存用户页签
     */
    homePageSaveCommonUserTabEntity: {
        url: '/homePage/saveCommonUserTabEntity',
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