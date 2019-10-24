const MOCK_ADDRESS = '/mock/5cf4761ea7e73d3d4b295f59/pmd'
const isMock = false
export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============广告管理start=========== */
  // 修改排序
  advertisingDataSort: {
    'url': '/advertising/dataSort',
    'mock': isMock,
    'methods': 'post'
  },

  // 删除
  advertisingDelete: {
    'url': '/advertising/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  advertisingInfo: {
    'url': '/advertising/info/{id}',
    'mock': isMock
  },

  // 获取列表
  advertisingList: {
    'url': '/advertising/list',
    'mock': isMock
  },

  // 逻辑删除
  advertisingLogicDelete: {
    'url': '/advertising/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  advertisingSave: {
    'url': '/advertising/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  advertisingUpdate: {
    'url': '/advertising/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============广告管理end=========== */

  /* =============增值服务管理start=========== */
  // 批量删除增值服务信息
  appreciationServiceManagerDelete: {
    'url': '/appreciationServiceManager/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看增值服务详细信息
  appreciationServiceManagerInfo: {
    'url': '/appreciationServiceManager/info/{id}',
    'mock': isMock
  },

  // 获取增值服务列表
  appreciationServiceManagerList: {
    'url': '/appreciationServiceManager/list',
    'mock': isMock
  },

  // 保存增值服务信息
  appreciationServiceManagerSave: {
    'url': '/appreciationServiceManager/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改增值服务信息
  appreciationServiceManagerUpdate: {
    'url': '/appreciationServiceManager/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============增值服务管理end=========== */

  /* =============行政区信息表start=========== */
  // 获取列表
  areaList: {
    'url': '/area/list',
    'mock': isMock
  },
  // 获取列表
  areaListAll: {
    'url': '/area/listAll',
    'mock': isMock
  },
  /* =============行政区信息表end=========== */

  /* =============项目竞标-操作记录start=========== */
  // 查看我的竞标详细信息
  biddingoperationInfo: {
    'url': '/biddingoperation/info/{id}',
    'mock': isMock
  },

  // 获取我的竞标列表
  biddingoperationList: {
    'url': '/biddingoperation/list',
    'mock': isMock
  },
  /* =============项目竞标-操作记录end=========== */

  /* =============项目竞标-竞标记录start=========== */
  // 获取当前最高价
  biddingrecordHighestPrice: {
    'url': '/biddingrecord/highestPrice/{id}',
    'mock': isMock
  },

  // 获取列表
  biddingrecordList: {
    'url': '/biddingrecord/list',
    'mock': isMock
  },

  // 保存
  biddingrecordSave: {
    'url': '/biddingrecord/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 中标
  biddingrecordWinning: {
    'url': '/biddingrecord/winning',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目竞标-竞标记录end=========== */

  /* =============充值记录start=========== */
  // 获取列表
  rechargerecordList: {
    'url': '/rechargerecord/list',
    'mock': isMock
  },
  // 退款等操作修改
  rechargerecordUpdate: {
    'url': '/rechargerecord/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============充值记录-竞标记录end=========== */

  /* =============项目竞标-申请记录start=========== */
  // 获取列表
  biddingregistrationrecordList: {
    'url': '/biddingregistrationrecord/list',
    'mock': isMock
  },
  // 获取浏览记录列表
  biddingbrowserecordList: {
    'url': '/biddingbrowserecord/list',
    'mock': isMock
  },
  // 项目竞标记录统计
  projectbiddingRecordStatistics: {
    'url': '/projectbidding/recordStatistics/{id}',
    'mock': isMock
  },
  // 获取关注记录列表
  biddingattentionrecordList: {
    'url': '/biddingattentionrecord/list',
    'mock': isMock
  },

  // 通过、拒绝
  biddingregistrationrecordPassOrNot: {
    'url': '/biddingregistrationrecord/passOrNot',
    'mock': isMock,
    'methods': 'post'
  },

  // 保存
  biddingregistrationrecordSave: {
    'url': '/biddingregistrationrecord/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目竞标-申请记录end=========== */

  /* =============经纪人信息start=========== */
  // 获取列表
  brokerDetailBroker: {
    'url': '/broker/detailBroker/{id}',
    'mock': isMock
  },
  /* =============经纪人信息end=========== */

  /* =============经纪人上下架记录start=========== */
  // 删除
  brokerupunrecordingDelete: {
    'url': '/brokerupunrecording/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  brokerupunrecordingInfo: {
    'url': '/brokerupunrecording/info/{id}',
    'mock': isMock
  },

  // 获取列表
  brokerupunrecordingList: {
    'url': '/brokerupunrecording/list',
    'mock': isMock
  },

  // 修改
  brokerupunrecordingUpdate: {
    'url': '/brokerupunrecording/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============经纪人上下架记录end=========== */

  /* =============城市信息表start=========== */
  // 获取列表
  cityList: {
    'url': '/city/list',
    'mock': isMock
  },
  /* =============城市信息表end=========== */

  /* =============城市默认start=========== */
  // 查看详细信息
  citydefaultInfo: {
    'url': '/citydefault/info',
    'mock': isMock
  },

  // 保存
  citydefaultSave: {
    'url': '/citydefault/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============城市默认end=========== */

  /* =============客户申请记录管理start=========== */
  // 获取客户申请记录列表
  clientapplyrecordList: {
    'url': '/clientapplyrecord/list',
    'mock': isMock
  },

  // 保存客户申请记录
  clientapplyrecordSave: {
    'url': '/clientapplyrecord/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 批量修改客户申请记录读状态
  clientapplyrecordUpdateReadStatus: {
    'url': '/clientapplyrecord/updateReadStatus',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============客户申请记录管理end=========== */

  /* =============店长学院管理start=========== */
  // 批量删除店长学院信息
  collegeManagerDelete: {
    'url': '/collegeManager/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看店长学院详细信息
  collegeManagerInfo: {
    'url': '/collegeManager/info/{id}',
    'mock': isMock
  },

  // 获取店长学院列表
  collegeManagerList: {
    'url': '/collegeManager/list',
    'mock': isMock
  },

  // 保存店长学院信息
  collegeManagerSave: {
    'url': '/collegeManager/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改店长学院信息
  collegeManagerUpdate: {
    'url': '/collegeManager/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============店长学院管理end=========== */

  /* =============公司新闻start=========== */
  // 批量删除
  companynewsBatchDelete: {
    'url': '/companynews/batchDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 删除
  companynewsDelete: {
    'url': '/companynews/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  companynewsInfo: {
    'url': '/companynews/info/{id}',
    'mock': isMock
  },

  // 获取列表
  companynewsList: {
    'url': '/companynews/list',
    'mock': isMock
  },

  // 逻辑删除
  companynewsLogicDelete: {
    'url': '/companynews/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  companynewsSave: {
    'url': '/companynews/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  companynewsUpdate: {
    'url': '/companynews/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改置顶
  companynewsUpdateTopStatus: {
    'url': '/companynews/updateTopStatus',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============公司新闻end=========== */

  /* =============联系方式表start=========== */
  // 删除
  contactsDelete: {
    'url': '/contacts/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  contactsInfo: {
    'url': '/contacts/info/{id}',
    'mock': isMock
  },

  // 获取列表
  contactsList: {
    'url': '/contacts/list',
    'mock': isMock
  },

  // 保存
  contactsSave: {
    'url': '/contacts/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============联系方式表end=========== */

  /* =============自定义筛选start=========== */
  // 删除
  customsiftDelete: {
    'url': '/customsift/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  customsiftInfo: {
    'url': '/customsift/info/{id}',
    'mock': isMock
  },

  // 获取自定义区间
  customsiftList: {
    'url': '/customsift/list',
    'mock': isMock
  },

  // 逻辑删除
  customsiftLogicDelete: {
    'url': '/customsift/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  customsiftSave: {
    'url': '/customsift/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  customsiftUpdate: {
    'url': '/customsift/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============自定义筛选end=========== */

  /* =============客户委托-委托出租客户start=========== */
  // 删除
  entrustrentDelete: {
    'url': '/entrustrent/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  entrustrentInfo: {
    'url': '/entrustrent/info/{id}',
    'mock': isMock
  },

  // 获取列表
  entrustrentList: {
    'url': '/entrustrent/list',
    'mock': isMock
  },

  // 查找没有被关联的委托出租商铺
  entrustrentListNoRelation: {
    'url': '/entrustrent/listNoRelation',
    'mock': isMock
  },

  // 确定/取消关联
  entrustrentRelation: {
    'url': '/entrustrent/relation',
    'mock': isMock,
    'methods': 'post'
  },

  // 保存
  entrustrentSave: {
    'url': '/entrustrent/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  entrustrentUpdate: {
    'url': '/entrustrent/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============客户委托-委托出租客户end=========== */

  /* =============委托设置表start=========== */
  // 获取列表
  entrustsetList: {
    'url': '/entrustset/list',
    'mock': isMock
  },

  // 逻辑删除
  entrustsetLogicDelete: {
    'url': '/entrustset/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  entrustsetSave: {
    'url': '/entrustset/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  entrustsetUpdate: {
    'url': '/entrustset/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============委托设置表end=========== */

  /* =============图片start=========== */
  // 获取列表
  fyPicturesList: {
    'url': '/fyPictures/list/{id}',
    'mock': isMock
  },

  // 获取经纪人图片
  fyPicturesQueryBrokerPicture: {
    'url': '/fyPictures/queryBrokerPicture',
    'mock': isMock
  },

  // 获取房源图片
  fyPicturesQueryHousePicture: {
    'url': '/fyPictures/queryHousePicture',
    'mock': isMock
  },
  /* =============图片end=========== */

  /* =============关注房源start=========== */
  // 删除
  houseattentionDelete: {
    'url': '/houseattention/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 获取列表
  houseattentionList: {
    'url': '/houseattention/list',
    'mock': isMock
  },

  // 保存
  houseattentionSave: {
    'url': '/houseattention/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============关注房源end=========== */

  /* =============房产资讯start=========== */
  // 批量删除
  houseinformationBatchDelete: {
    'url': '/houseinformation/batchDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 删除
  houseinformationDelete: {
    'url': '/houseinformation/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  houseinformationInfo: {
    'url': '/houseinformation/info/{id}',
    'mock': isMock
  },

  // 获取列表
  houseinformationList: {
    'url': '/houseinformation/list',
    'mock': isMock
  },

  // 逻辑删除
  houseinformationLogicDelete: {
    'url': '/houseinformation/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  houseinformationSave: {
    'url': '/houseinformation/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  houseinformationUpdate: {
    'url': '/houseinformation/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改置顶
  houseinformationUpdateTopStatus: {
    'url': '/houseinformation/updateTopStatus',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============房产资讯end=========== */

  /* =============房源上下架记录start=========== */
  // 删除
  houseupunrecordingDelete: {
    'url': '/houseupunrecording/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  houseupunrecordingInfo: {
    'url': '/houseupunrecording/info/{id}',
    'mock': isMock
  },

  // 获取列表
  houseupunrecordingList: {
    'url': '/houseupunrecording/list',
    'mock': isMock
  },

  // 逻辑删除
  houseupunrecordingLogicDelete: {
    'url': '/houseupunrecording/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  houseupunrecordingSave: {
    'url': '/houseupunrecording/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  houseupunrecordingUpdate: {
    'url': '/houseupunrecording/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============房源上下架记录end=========== */

  /* =============房产百科start=========== */
  // 批量删除
  housewikipediaBatchDelete: {
    'url': '/housewikipedia/batchDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 删除
  housewikipediaDelete: {
    'url': '/housewikipedia/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  housewikipediaInfo: {
    'url': '/housewikipedia/info/{id}',
    'mock': isMock
  },

  // 获取列表
  housewikipediaList: {
    'url': '/housewikipedia/list',
    'mock': isMock
  },

  // 逻辑删除
  housewikipediaLogicDelete: {
    'url': '/housewikipedia/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  housewikipediaSave: {
    'url': '/housewikipedia/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  housewikipediaUpdate: {
    'url': '/housewikipedia/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改置顶
  housewikipediaUpdateTopStatus: {
    'url': '/housewikipedia/updateTopStatus',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============房产百科end=========== */

  /* =============项目招商start=========== */
  // 查看项目招商详细信息
  itemattractmerchantInfo: {
    'url': '/itemattractmerchant/info/{id}',
    'mock': isMock
  },

  // 获取项目招商列表
  itemattractmerchantList: {
    'url': '/itemattractmerchant/list',
    'mock': isMock
  },

  // 查看项目招商预览信息
  itemattractmerchantPreview: {
    'url': '/itemattractmerchant/preview/{id}',
    'mock': isMock
  },

  // 保存项目招商信息
  itemattractmerchantSave: {
    'url': '/itemattractmerchant/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改项目招商信息
  itemattractmerchantUpdate: {
    'url': '/itemattractmerchant/update',
    'mock': isMock,
    'methods': 'post'
  },
  // 项目招商浏览记录列表
  itembrowserecordList: {
    'url': '/itembrowserecord/list',
    'mock': isMock,
    'methods': 'get'
  },
  // 项目招商收藏记录列表
  itemcollectionrecordList: {
    'url': '/itemcollectionrecord/list',
    'mock': isMock,
    'methods': 'get'
  },

  // 项目招商记录统计
  itemattractmerchantRecordStatistics: {
    'url': '/itemattractmerchant/recordStatistics/{id}',
    'mock': isMock,
    'methods': 'get'
  },
  // 批量更新 上下架操作和逻辑删除操作
  itemattractmerchantUpdateBatch: {
    'url': '/itemattractmerchant/updateBatch',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目招商end=========== */

  /* =============项目招商评论start=========== */
  // 删除项目招商评论
  itemcommentDelete: {
    'url': '/itemcomment/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 获取项目招商评论列表
  itemcommentList: {
    'url': '/itemcomment/list',
    'mock': isMock
  },

  // 保存项目招商评论
  itemcommentSave: {
    'url': '/itemcomment/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改项目招商评论
  itemcommentUpdate: {
    'url': '/itemcomment/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目招商评论end=========== */

  /* =============项目招商动态start=========== */
  // 删除项目招商动态信息
  itemdynamicinfoDelete: {
    'url': '/itemdynamicinfo/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 获取项目招商动态列表
  itemdynamicinfoList: {
    'url': '/itemdynamicinfo/list',
    'mock': isMock
  },

  // 保存项目招商动态信息
  itemdynamicinfoSave: {
    'url': '/itemdynamicinfo/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目招商动态end=========== */

  /* =============项目招商登记记录start=========== */
  // 项目招商登记统计
  itemregisterinfoCount: {
    'url': '/itemregisterinfo/count/{id}',
    'mock': isMock
  },

  // 获取列表
  itemregisterinfoList: {
    'url': '/itemregisterinfo/list',
    'mock': isMock
  },

  // 保存项目招商登录记录
  itemregisterinfoSave: {
    'url': '/itemregisterinfo/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 批量更新项目招商登记记录读状态
  itemregisterinfoUpdate: {
    'url': '/itemregisterinfo/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目招商登记记录end=========== */

  /* =============贷款申请start=========== */
  // 删除
  loansapplyDelete: {
    'url': '/loansapply/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  loansapplyInfo: {
    'url': '/loansapply/info/{id}',
    'mock': isMock
  },

  // 获取列表
  loansapplyList: {
    'url': '/loansapply/list',
    'mock': isMock
  },

  // 逻辑删除
  loansapplyLogicDelete: {
    'url': '/loansapply/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  loansapplySave: {
    'url': '/loansapply/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  loansapplyUpdate: {
    'url': '/loansapply/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============贷款申请end=========== */

  /* =============贷款申请联系方式start=========== */
  // 获取列表
  loansapplycontactsList: {
    'url': '/loansapplycontacts/list',
    'mock': isMock
  },
  /* =============贷款申请联系方式end=========== */

  /* =============客户委托-定制找铺客户start=========== */
  // 删除
  lookingshopDelete: {
    'url': '/lookingshop/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  lookingshopInfo: {
    'url': '/lookingshop/info/{id}',
    'mock': isMock
  },

  // 获取列表
  lookingshopList: {
    'url': '/lookingshop/list',
    'mock': isMock
  },

  // 保存
  lookingshopSave: {
    'url': '/lookingshop/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  lookingshopUpdate: {
    'url': '/lookingshop/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============客户委托-定制找铺客户end=========== */

  /* =============商户管理start=========== */
  // 查看商户详细信息
  merchantmanagerInfo: {
    'url': '/merchantmanager/info/{id}',
    'mock': isMock
  },

  // 获取商户列表
  merchantmanagerList: {
    'url': '/merchantmanager/list',
    'mock': isMock
  },

  // 逻辑删除商户信息
  merchantmanagerLogicDelete: {
    'url': '/merchantmanager/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存商户信息
  merchantmanagerSave: {
    'url': '/merchantmanager/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改商户信息
  merchantmanagerUpdate: {
    'url': '/merchantmanager/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============商户管理end=========== */

  /* =============消息查看start=========== */
  // 批删除消息接收记录
  messageDelete: {
    'url': '/message/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 获取消息信息列表
  messageList: {
    'url': '/message/list',
    'mock': isMock
  },

  // 读消息
  messageUpdate: {
    'url': '/message/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============消息查看end=========== */

  /* =============消息管理start=========== */
  // 查看消息详细信息
  messageManageInfo: {
    'url': '/messageManage/info/{id}',
    'mock': isMock
  },

  // 获取消息信息列表
  messageManageList: {
    'url': '/messageManage/list',
    'mock': isMock
  },

  // 逻辑删除消息
  messageManageLogicDelete: {
    'url': '/messageManage/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存消息信息
  messageManageSave: {
    'url': '/messageManage/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改消息信息
  messageManageUpdate: {
    'url': '/messageManage/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============消息管理end=========== */

  /* =============业务设置图片start=========== */
  // 获取图片配置列表
  picGetPicConfig: {
    'url': '/pic/getPicConfig',
    'mock': isMock
  },

  // 获取单个图片配置信息
  picGetSinglePicConfig: {
    'url': '/pic/getSinglePicConfig',
    'mock': isMock
  },

  // 恢复默认值
  picRecoverDefaultValue: {
    'url': '/pic/recoverDefaultValue',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改图片配置
  picUpdatePicConfig: {
    'url': '/pic/updatePicConfig',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============业务设置图片end=========== */

  /* =============项目竞标start=========== */
  // 批量删除
  projectbiddingDeleteBatch: {
    'url': '/projectbidding/deleteBatch',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  projectbiddingInfo: {
    'url': '/projectbidding/info/{id}',
    'mock': isMock
  },

  // 获取列表
  projectbiddingList: {
    'url': '/projectbidding/list',
    'mock': isMock
  },

  // c端获取列表
  projectbiddingListForC: {
    'url': '/projectbidding/listForC',
    'mock': isMock
  },

  // 批量开启/批量关闭/关闭
  projectbiddingOnOffBidding: {
    'url': '/projectbidding/onOffBidding',
    'mock': isMock,
    'methods': 'post'
  },

  // 保存
  projectbiddingSave: {
    'url': '/projectbidding/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  projectbiddingUpdate: {
    'url': '/projectbidding/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============项目竞标end=========== */
  // 获取地铁列表
  metroList: {
    'url': '/metro/list',
    'mock': isMock,
    'methods': 'get'
  },
  /* =============加盟项目start=========== */
  // 删除
  projectjoinDeleteBatch: {
    'url': '/projectjoin/deleteBatch',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  projectjoinInfo: {
    'url': '/projectjoin/info/{id}',
    'mock': isMock
  },

  // 获取列表
  projectjoinList: {
    'url': '/projectjoin/list',
    'mock': isMock
  },

  // 批量上下架
  projectjoinOnOffJion: {
    'url': '/projectjoin/onOffJion',
    'mock': isMock,
    'methods': 'post'
  },

  // 保存
  projectjoinSave: {
    'url': '/projectjoin/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  projectjoinUpdate: {
    'url': '/projectjoin/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============加盟项目end=========== */

  /* =============加盟项目-关注记录start=========== */
  // 获取列表
  projectjoinfocusrecodeList: {
    'url': '/projectjoinfocusrecode/list',
    'mock': isMock
  },

  // 保存
  projectjoinfocusrecodeSave: {
    'url': '/projectjoinfocusrecode/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 获取关注总数
  projectjoinfocusrecodeTotal: {
    'url': '/projectjoinfocusrecode/total',
    'mock': isMock
  },
  /* =============加盟项目-关注记录end=========== */

  /* =============系统设置表（以公司和设置参数KEY为维度，加载到缓存中）start=========== */
  // 删除
  rmSystemParameterDelete: {
    'url': '/rmSystemParameter/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  rmSystemParameterInfo: {
    'url': '/rmSystemParameter/info/{id}',
    'mock': isMock
  },

  // 获取列表
  rmSystemParameterList: {
    'url': '/rmSystemParameter/list',
    'mock': isMock
  },

  // 根据keyword 获取列表
  rmSystemParameterQueryParam: {
    'url': '/rmSystemParameter/queryParam/{keyword}',
    'mock': isMock
  },

  // 保存
  rmSystemParameterSave: {
    'url': '/rmSystemParameter/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============系统设置表（以公司和设置参数KEY为维度，加载到缓存中）end=========== */

  /* =============数据字典/业务字典表(值)(数据权限-编码表)start=========== */
  // 删除
  rmcodedataDelete: {
    'url': '/rmcodedata/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  rmcodedataInfo: {
    'url': '/rmcodedata/info/{id}',
    'mock': isMock
  },

  // 获取列表
  rmcodedataList: {
    'url': '/rmcodedata/list',
    'mock': isMock
  },

  // 保存
  rmcodedataSave: {
    'url': '/rmcodedata/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  rmcodedataUpdate: {
    'url': '/rmcodedata/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============数据字典/业务字典表(值)(数据权限-编码表)end=========== */

  /* =============数据字典/业务字典表(类型)(数据权限-编码表)start=========== */
  // 删除
  rmcodetypeDelete: {
    'url': '/rmcodetype/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  rmcodetypeInfo: {
    'url': '/rmcodetype/info/{id}',
    'mock': isMock
  },

  // 获取列表
  rmcodetypeList: {
    'url': '/rmcodetype/list',
    'mock': isMock
  },

  // 保存
  rmcodetypeSave: {
    'url': '/rmcodetype/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============数据字典/业务字典表(类型)(数据权限-编码表)end=========== */

  /* =============小程序站点设置start=========== */
  // 查看详细信息
  sitesettingsInfo: {
    'url': '/sitesettings/info',
    'mock': isMock
  },
  /* =============小程序站点设置end=========== */

  /* =============房客源带看记录表start=========== */
  // 删除
  tdkjlDelete: {
    'url': '/tdkjl/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  tdkjlInfo: {
    'url': '/tdkjl/info/{id}',
    'mock': isMock
  },

  // 获取列表
  tdkjlList: {
    'url': '/tdkjl/list',
    'mock': isMock
  },

  // 保存
  tdkjlSave: {
    'url': '/tdkjl/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  tdkjlUpdate: {
    'url': '/tdkjl/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============房客源带看记录表end=========== */

  /* =============房源信息表start=========== */
  // 房源对比
  tfyxxCompareFy: {
    'url': '/tfyxx/compareFy',
    'mock': isMock
  },

  // 批量删除
  tfyxxDelete: {
    'url': '/tfyxx/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 首页推荐房源
  tfyxxIndexRecommend: {
    'url': '/tfyxx/indexRecommend',
    'mock': isMock
  },

  // 查看详细信息
  tfyxxInfo: {
    'url': '/tfyxx/info/{id}',
    'mock': isMock
  },

  // 获取列表
  tfyxxList: {
    'url': '/tfyxx/list',
    'mock': isMock,
    'methods': 'get'
  },

  // 更新房源
  tfyxxRefreshFy: {
    'url': '/tfyxx/refreshFy',
    'mock': isMock
  },

  // 修改
  tfyxxUpdate: {
    'url': '/tfyxx/update',
    'mock': isMock,
    'methods': 'post'
  },
  // 修改房源维护人
  tfyxxUpdateAccendant: {
    'url': '/tfyxx/updateAccendant',
    'mock': isMock,
    'methods': 'post'
  },
  // 修改对比
  tfyxxUpdateCompareFy: {
    'url': '/tfyxx/updateCompareFy',
    'mock': isMock,
    'methods': 'post'
  },

  // 推荐
  tfyxxUpdateRecommend: {
    'url': '/tfyxx/updateRecommend',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改上下架
  tfyxxUpdateUpUnShelf: {
    'url': '/tfyxx/updateUpUnShelf',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============房源信息表end=========== */

  /* =============经纪人信息表(人力地图表)start=========== */
  // 获取经纪人下拉框
  trenyuanxxBrokerDropdown: {
    'url': '/trenyuanxx/brokerDropdown',
    'mock': isMock
  },

  // 经纪人对比
  trenyuanxxCompareFy: {
    'url': '/trenyuanxx/compareFy',
    'mock': isMock
  },

  // 批量删除
  trenyuanxxDelete: {
    'url': '/trenyuanxx/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  trenyuanxxInfo: {
    'url': '/trenyuanxx/info/{id}',
    'mock': isMock
  },

  // 获取列表
  trenyuanxxList: {
    'url': '/trenyuanxx/list',
    'mock': isMock
  },

  // 获取名片信息
  trenyuanxxMyCard: {
    'url': '/trenyuanxx/myCard',
    'mock': isMock
  },

  // 更新经纪人
  trenyuanxxRefreshFy: {
    'url': '/trenyuanxx/refreshFy',
    'mock': isMock
  },

  // 公司组织树,经纪人选择所属门店
  trenyuanxxSelectOrgList: {
    'url': '/trenyuanxx/selectOrgList/{companyId}',
    'mock': isMock
  },

  // 修改
  trenyuanxxUpdate: {
    'url': '/trenyuanxx/update',
    'mock': isMock,
    'methods': 'post'
  },


  // 修改上下架
  trenyuanxxUpdateUpUnShelf: {
    'url': '/trenyuanxx/updateUpUnShelf',
    'mock': isMock,
    'methods': 'post'
  },
  // 经纪人对比保存
  trenyuanxxUpdateCompareRy: {
    'url': '/trenyuanxx/updateCompareRy',
    'methods': 'post',
    'mock': isMock
  },
  // 经纪人对比保存
  trenyuanxxAccendantInfo: {
    'url': '/trenyuanxx/accendantInfo',
    'methods': 'get',
    'mock': isMock
  },
  /* =============经纪人信息表(人力地图表)end=========== */

  /* =============省份表start=========== */
  // 获取列表
  tsfList: {
    'url': '/tsf/list',
    'mock': isMock
  },
  /* =============省份表end=========== */

  /* =============商圈信息表start=========== */
  // 获取列表
  tsqList: {
    'url': '/tsq/list',
    'mock': isMock
  },
  // 经纪人模块-商圈选择
  tselectSqList: {
    'url': '/tsq/selectSqList',
    'mock': isMock
  },
  /* =============商圈信息表end=========== */

  /* =============用户经纪人关联表start=========== */
  // 删除
  userrelationDelete: {
    'url': '/userrelation/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  userrelationInfo: {
    'url': '/userrelation/info/{id}',
    'mock': isMock
  },

  // 关注信息
  userrelationIsAttentionUser: {
    'url': '/userrelation/isAttentionUser',
    'mock': isMock
  },

  // 获取列表
  userrelationList: {
    'url': '/userrelation/list',
    'mock': isMock
  },

  // 逻辑删除
  userrelationLogicDelete: {
    'url': '/userrelation/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 关注我的人
  userrelationMyAttentionUser: {
    'url': '/userrelation/myAttentionUser',
    'mock': isMock
  },

  // 我的经纪人
  userrelationMyBroker: {
    'url': '/userrelation/myBroker',
    'mock': isMock
  },

  // 保存
  userrelationSave: {
    'url': '/userrelation/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  userrelationUpdate: {
    'url': '/userrelation/update',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============用户经纪人关联表end=========== */

  /* =============浏览记录start=========== */
  // 删除
  viewhistoryDelete: {
    'url': '/viewhistory/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  viewhistoryInfo: {
    'url': '/viewhistory/info/{id}',
    'mock': isMock
  },

  // 获取列表
  viewhistoryList: {
    'url': '/viewhistory/list',
    'mock': isMock
  },

  // 逻辑删除
  viewhistoryLogicDelete: {
    'url': '/viewhistory/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 保存
  viewhistorySave: {
    'url': '/viewhistory/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  viewhistoryUpdate: {
    'url': '/viewhistory/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 用户浏览记录
  viewhistoryViewFy: {
    'url': '/viewhistory/viewFy',
    'mock': isMock
  },

  // 房源浏览记录
  viewhistoryViewRy: {
    'url': '/viewhistory/viewRy',
    'mock': isMock
  },
  /* =============浏览记录end=========== */

  /* =============浏览记录经纪人start=========== */
  // 获取列表
  viewhistorybrokerList: {
    'url': '/viewhistorybroker/list',
    'mock': isMock
  },

  // 保存
  viewhistorybrokerSave: {
    'url': '/viewhistorybroker/save',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============浏览记录经纪人end=========== */

  /* =============会员管理start=========== */
  // 认证经纪人
  vipUserBindBroker: {
    'url': '/vipUser/bindBroker',
    'mock': isMock,
    'methods': 'post'
  },

  // 删除
  vipUserDelete: {
    'url': '/vipUser/delete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 查看详细信息
  vipUserInfo: {
    'url': '/vipUser/info/{id}',
    'mock': isMock
  },

  // 获取列表
  vipUserList: {
    'url': '/vipUser/list',
    'mock': isMock
  },

  // 逻辑删除
  vipUserLogicDelete: {
    'url': '/vipUser/logicDelete',
    'mock': isMock,
    'methods': 'delete'
  },

  // 绑定
  vipUserSave: {
    'url': '/vipUser/save',
    'mock': isMock,
    'methods': 'post'
  },

  // 解除绑定
  vipUserUnbound: {
    'url': '/vipUser/unbound/{id}',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改
  vipUserUpdate: {
    'url': '/vipUser/update',
    'mock': isMock,
    'methods': 'post'
  },

  // 修改备注
  vipUserUpdateRemark: {
    'url': '/vipUser/updateRemark',
    'mock': isMock,
    'methods': 'post'
  },
  /* =============会员管理end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': isMock
  },
  /* =============文件压缩下载（日志和配置文件）end=========== */

  /* =============业务设置用户自定义设置start=========== */
  // 恢复业务设置默认值
  commonusercfgupDelete: {
    'url': '/commonusercfgup/delete',
    'mock': isMock,
    'methods': 'delete'
  },
  // 查看业务设置用户自定义设置
  commonusercfgupGetUserCfg: {
    'url': '/commonusercfgup/getUserCfg',
    'mock': isMock
  },
  // 保存用户自定义设置
  commonusercfgupSave: {
    'url': '/commonusercfgup/save',
    'mock': isMock,
    'methods': 'post'
  },
  // 获取商铺出租月租金字典值
  commonusercfgunderneathGetCfg: {
    'url': '/commonusercfgunderneath/getCfg',
    'mock': isMock
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}
