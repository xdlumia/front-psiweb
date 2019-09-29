/**
 * @author 徐贺
 * @description resourceService的url
 * @date 2018/7/7
 * @host 8113
 */
import { Api } from 'see-web-basic'
let baseURL = window.g.ApiUrl

const apiURL = {
  /**
   * @description  楼盘信息
   */
  getBuildingNameList: '/basecommunity/communityNameList',
  // 获取楼盘列表
  getBuildingList: '/basecommunity/list',
  // 查看详细信息
  getBuildingInfo: '/basecommunity/info/',
  // 保存楼盘信息
  saveBuildingInfo: '/basecommunity/edit',
  // 删除楼盘
  delBuilding: '/basecommunity/delete',
  // 获取分类户数信息
  getQueryGroupRoomNumber: '/basecommunity/queryGroupRoomNumber/',
  // 查看楼盘下的栋座
  getQueryRoomNumber: '/basecommunity/queryRoomNumber/',
  // 楼盘导入
  getBuildingImport: '/uploadInfo/downloadTemplet',
  /**
   * @description  栋座信息
   */
  // 复制栋座
  copyBuildingBlock: '/basebulidingblock/copyBulidingBlock/',
  // 删除栋座
  delBuildingBlock: '/basebulidingblock/delete',
  // 保存栋座信息
  saveBuildingBlock: '/basebulidingblock/edit',
  // 查看详细信息
  getBuildingBlock: '/basebulidingblock/info/',
  // 获取栋座列表
  getBuildingBlockList: '/basebulidingblock/list',
  // 责任权限
  getBuildingJurisdiction: '/basebulidingblock/authorization',
  // 批量删除
  deleteBatch: '/basebulidingblock/deleteBatch',
  // 查看栋座下的户数
  getDongRoomNumber: '/basebulidingblock/queryRoomNumber/',
  /**
   * @description  单元信息
   */
  // 获取单元列表
  getBaseunitList: '/baseunitinfo/list',
  // 保存单元
  saveBaseunitInfo: '/baseunitinfo/edit',
  // 删除单元
  delBaseunitInfo: '/baseunitinfo/delete',
  // 单元详细信息
  getBaseunitInfo: '/baseunitinfo/info/',

  /**
   * @description  户型信息表
   */
  // 获取户型信息列表
  getBaseRoommoList: '/baseroommodel/list',
  // 修改/保存户型信息
  saveBaseRoommo: '/baseroommodel/edit',
  // 删除户型信息
  delBaseRoommo: '/baseroommodel/delete',
  // 查看详细信息
  getBaseRoommoInfo: '/baseroommodel/info/',

  /**
   * @description  房间信息表
   */
  // 获取房间信息列表
  getBaseRoomList: '/baseroominfo/list',
  // 修改/保存房间信息
  saveBaseRoom: '/baseroominfo/edit',
  // 修改房间业主租客信息
  editOwnerTenant: '/baseroominfo/editOwnerTenant',
  // 删除户型信息
  delBaseRoom: '/baseroominfo/delete',
  // 查看详细信息
  getBaseRoomInfo: '/baseroominfo/info/',
  // 转收房
  transferRoom: '/baseroominfo/transferRoom',
  // 请求头部
  queryTopRoomInfo: '/baseroominfo/queryTopRoomInfo/',
  // 通过房间code查看房间详细信息
  queryInfo: '/baseroominfo/queryInfo/',
  queryObjectByHouseCode: '/baseroominfo/queryObjectByHouseCode/',

  /**
   * @description  楼层信息
   */
  // 保存楼层
  saveFloorInfo: '/basefloorinfo/edit',
  // 删除楼层
  delFloorInfo: '/basefloorinfo/delete',
  // 楼层详细信息
  getFloorInfo: '/basefloorinfo/info/',

  /**
   * @description  楼盘跟进
   */
  // 获取楼盘跟进列表
  getHouseFollowList: '/basehousefollow/list',
  // 删除
  delHouseFollow: '/basehousefollow/delete',
  // 查看详细信息
  getHouseFollowInfo: '/basehousefollow/info/',
  // 保存
  saveHouseFollow: '/basehousefollow/save',
  // 修改
  updateHouseFollow: '/basehousefollow/update',
  // 根据房间编号，和 类型（1:业主 2:租客） 查看当前用户是否查询过该房间的电话
  getClientPhoneVo: '/basehousefollow/getClientPhoneVo',
  // 点击查看电话，保存查看记录
  savePhoneList: '/basehousefollow/savePhone',
  /**
   * @description  标签删除
   */
  // 删除
  delLabelController: '/labelController/delete',

  /**
   * @description  楼盘相册
   */
  // 获取图片路径
  getHousePicturelist: '/pic/housePicturelist',
  // 编辑房屋照片
  editHousePicture: '/pic/editHousePicture',
  // 删除房屋照片
  deleteHousePicture: '/pic/deleteHousePicture',
  // 设置主图
  editMasterGraph: '/pic/editMasterGraph',

  /**
   * @description  成交记录
   */
  // 房源录入信息
  houseEntryInfo: '/record/houseEntryInfo',
  // 转收房信息
  transferRoomInfo: '/record/transferRoomInfo',
  /**
   * @description  同步房源至对应系统
   */
  // 发布新房
  publishNewRoom: '/synchHouseInfoController/publishNewRoom',
  //  转商业-出租
  transferBusinessLease: '/synchHouseInfoController/transferBusinessLease',
  // 转商业-出售
  transferBusinessSell: '/synchHouseInfoController/transferBusinessSell',
  // 转分散-出租
  transferDispersedApartment:
    '/synchHouseInfoController/transferDispersedApartment',
  // 转居住-出租
  transferHouseLease: '/synchHouseInfoController/transferHouseLease',
  // 转居住-出售
  transferHouseSell: '/synchHouseInfoController/transferHouseSell',
  // 转新房
  transferNewHouse: '/synchHouseInfoController/publishNewRoom',
  // 获取转招商的房间信息
  getConvertBusinessRoom: '/basecommunity/getConvertBusinessRoom',
  // 通过房间code查看同步房脉动房间详细信息
  querySynchFmdInfo: '/baseroominfo/querySynchFmdInfo/'
}

export default {
  /**
   * @description  楼盘信息
   */
  getBuildingNameList (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBuildingNameList,
      params
    )
  },
  getBuildingList (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.getBuildingList, params)
  },
  getBuildingInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBuildingInfo + params
    )
  },
  saveBuildingInfo (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.saveBuildingInfo,
      params
    )
  },
  delBuilding (params) {
    return Api.del(baseURL.seeBaseHouseService + apiURL.delBuilding, params)
  },
  getQueryGroupRoomNumber (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getQueryGroupRoomNumber + params
    )
  },
  getQueryRoomNumber (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getQueryRoomNumber + params
    )
  },
  getBuildingImport (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBuildingImport,
      params
    )
  },
  // 转酒店
  fconvertHotel(params) {
    return Api.post(baseURL.seeBaseHouseService + '/basecommunity/convertHotel', params);
  },
  // 商业楼盘转招商操作
  getBuildingConvertBusiness (params) {
    return Api.post(
      baseURL.seeBaseHouseService + '/basecommunity/convertBusiness',
      params
    )
  },
  // 楼盘单元房间拖拽
  fdragReorder(params) {
    return Api.post(
      baseURL.seeBaseHouseService + '/basecommunity/dragReorder',params
    )
  },
  //获取楼盘统计信息
  getCommunityStatisticInfo(params){
  	return Api.get(
      baseURL.seeBaseHouseService + '/basecommunity/getCommunityStatisticInfo',params
    )
  },
   //获取楼盘统计信息
  getHaveSameName(params){
  	return Api.get(
      baseURL.seeBaseHouseService + '/basecommunity/isHaveSameNameInBusinessCircle',params
    )
  },
  /**
   * @description  楼盘权限
   */
  getAuthorization(params){
  	return Api.post(
      baseURL.seeBaseHouseService + '/basecommunity/authorization',params
    )
  },
  /**
   * @description  酒店房型
   */
  //保存/编辑房型详情
  getBaseRoomTypeEdit(params){
  	return Api.post(
      baseURL.seeBaseHouseService + '/baseRoomType/edit',params
    )
  },
  //获取房型列表
  getBaseRoomTypeList(params){
  	return Api.get(
      baseURL.seeBaseHouseService + '/baseRoomType/list/' + params
    )
  },
  //获取房型详情
  getBaseRoomTypeInfo(params){
  	return Api.get(
      baseURL.seeBaseHouseService + '/baseRoomType/queryObject/' + params
    )
  },
  //删除房型
  deleteBaseRoomTypeInfo(params){
  	return Api.del(
      baseURL.seeBaseHouseService + '/baseRoomType/delete',params
    )
  },
  
  /**
   * @description  栋座信息
   */
  getBuildingBlockList (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBuildingBlockList,
      params
    )
  },
  copyBuildingBlock (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.copyBuildingBlock + params
    )
  },
  delBuildingBlock (params) {
    return Api.del(
      baseURL.seeBaseHouseService + apiURL.delBuildingBlock,
      params
    )
  },
  saveBuildingBlock (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.saveBuildingBlock,
      params
    )
  },

  getBuildingBlock (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBuildingBlock + params
    )
  },
  getBuildingJurisdiction (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.getBuildingJurisdiction,
      params
    )
  },
  deleteBatch (params) {
    return Api.del(baseURL.seeBaseHouseService + apiURL.deleteBatch, params)
  },
  getDongRoomNumber (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getDongRoomNumber + params
    )
  },
  /**
   * @description  单元信息
   */
  getBaseunitList (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.getBaseunitList, params)
  },
  saveBaseunitInfo (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.saveBaseunitInfo,
      params
    )
  },
  delBaseunitInfo (params) {
    return Api.del(baseURL.seeBaseHouseService + apiURL.delBaseunitInfo, params)
  },
  getBaseunitInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBaseunitInfo + params
    )
  },

  /**
   * @description  户型信息表
   */

  getBaseRoommoList (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBaseRoommoList,
      params
    )
  },
  saveBaseRoommo (params) {
    return Api.post(baseURL.seeBaseHouseService + apiURL.saveBaseRoommo, params)
  },
  delBaseRoommo (params) {
    return Api.del(baseURL.seeBaseHouseService + apiURL.delBaseRoommo, params)
  },

  getBaseRoommoInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBaseRoommoInfo + params
    )
  },

  /**
   * @description  房间信息表
   */

  getBaseRoomList (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.getBaseRoomList, params)
  },
  saveBaseRoom (params) {
    return Api.post(baseURL.seeBaseHouseService + apiURL.saveBaseRoom, params)
  },
  editOwnerTenant (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.editOwnerTenant,
      params
    )
  },
  delBaseRoom (params) {
    return Api.del(baseURL.seeBaseHouseService + apiURL.delBaseRoom, params)
  },
  getBaseRoomInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getBaseRoomInfo + params
    )
  },
  // 通过房间code查看房间位置信息
  queryHousingResources (params) {
    return Api.get(
      baseURL.seeBaseHouseService +
        '/baseroominfo/queryHousingResources/' +
        params
    )
  },
  /**
   * @description  楼层信息
   */

  saveFloorInfo (params) {
    return Api.post(baseURL.seeBaseHouseService + apiURL.saveFloorInfo, params)
  },
  delFloorInfo (params) {
    return Api.del(baseURL.seeBaseHouseService + apiURL.delFloorInfo, params)
  },
  getFloorInfo (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.getFloorInfo + params)
  },

  /**
   * @description  房间信息表
   */

  getHouseFollowList (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getHouseFollowList,
      params
    )
  },
  delHouseFollow (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.delHouseFollow + params)
  },
  getHouseFollowInfo (params) {
    return Api.del(
      baseURL.seeBaseHouseService + apiURL.getHouseFollowInfo,
      params
    )
  },
  saveHouseFollow (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.saveHouseFollow,
      params
    )
  },
  updateHouseFollow (params) {
    return Api.del(
      baseURL.seeBaseHouseService + apiURL.updateHouseFollow,
      params
    )
  },
  getClientPhoneVo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getClientPhoneVo,
      params
    )
  },
  savePhoneList (params) {
    return Api.post(baseURL.seeBaseHouseService + apiURL.savePhoneList, params)
  },

  /**
   * @description  房间信息表
   */

  delLabelController (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.delLabelController,
      params
    )
  },
  /**
   * @description  员工管理 人员调动
   */
  // 获取某责任人负责的栋座信息
  getBuildingInfoByResponserId(params) {
    return Api.get(baseURL.seeBaseHouseService + '/basebulidingblock/getBuildingInfoByResponserId/' + params);
  },
  // 更换栋座的责任人
  updateBuildingResponser(params) {
    return Api.post(baseURL.seeBaseHouseService + '/basebulidingblock/updateBuildingResponser', params);
  },
  /**
   * @description  房屋照片
   */

  getHousePicturelist (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getHousePicturelist,
      params
    )
  },
  editHousePicture (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.editHousePicture,
      params
    )
  },
  deleteHousePicture (params) {
    return Api.del(
      baseURL.seeBaseHouseService + apiURL.deleteHousePicture,
      params
    )
  },
  editMasterGraph (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.editMasterGraph,
      params
    )
  },

  queryTopRoomInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.queryTopRoomInfo + params
    )
  },
  queryInfo (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.queryInfo + params)
  },
  queryObjectByHouseCode (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.queryObjectByHouseCode + params
    )
  },
  transferRoom (params) {
    return Api.post(
      baseURL.seeBaseHouseService +
        apiURL.transferRoom +
        '?' +
        'roomInfoId=' +
        params
    )
  },
  houseEntryInfo (params) {
    return Api.get(baseURL.seeBaseHouseService + apiURL.houseEntryInfo, params)
  },
  transferRoomInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.transferRoomInfo,
      params
    )
  },
  publishNewRoom (params) {
    return Api.post(baseURL.seeBaseHouseService + apiURL.publishNewRoom, params)
  },
  transferBusinessLease (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.transferBusinessLease,
      params
    )
  },
  transferBusinessSell (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.transferBusinessSell,
      params
    )
  },
  transferDispersedApartment (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.transferDispersedApartment,
      params
    )
  },
  transferHouseLease (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.transferHouseLease,
      params
    )
  },
  transferHouseSell (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.transferHouseSell,
      params
    )
  },
  transferNewHouse (params) {
    return Api.post(
      baseURL.seeBaseHouseService + apiURL.transferNewHouse,
      params
    )
  },
  getConvertBusinessRoom (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.getConvertBusinessRoom,
      params
    )
  },
  querySynchFmdInfo (params) {
    return Api.get(
      baseURL.seeBaseHouseService + apiURL.querySynchFmdInfo + params
    )
  }
}
