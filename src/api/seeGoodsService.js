/*
 * @Author: 高大鹏
 * @Date: 2019-10-31 15:09:35
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-07 10:24:23
 * @Description: description
 */
/**
 * @author 徐贺
 * @description
 * @date 2018/8/17
 * @host 8132
 */

import { Api } from 'see-web-basic'
const baseURL = window.g.ApiUrl

const apiURL = {
  /**
   * @description  物品 物品管理
   */
  // 查询物品列表
  getGoodsList: '/goods/getGoodsList',
  // 物品新增
  saveGoodsList: '/goods/save',
  // 物品批量删除
  deleteGoodsList: '/goods/delete',
  // 查询物品详情
  getGoodsDetailV2: '/goods/getGoodsDetail/v2',
  // 新增物品
  saveGoodsInfo: '/goods/save',
  // 编辑物品
  editGoodsInfo: '/goods/edit',
  editGoodsInfoV2: '/goods/edit/v2',
  // 查询物品详情包含所有规格
  getAllGoods: '/goods/getGoods',
  // 添加物品规格
  addGoodsSpec: '/goods/addGoodsSpec',
  // 根据分类id查询物品列表
  getGoodsListByClassId: '/goods/getGoodsListByClassId',
  /* 构建物品分类树 */
  GoodTree: '/decorategoodsclass/tree',
  // 根据物品规格ID和规格值 查询物品详情
  getGoodsInfoByIdAndSpec: '/goods/getGoodsInfoByIdAndSpec',
  /**
   * @description  物品 类目管理
   */
  // 获取物品类目一级列表
  fgoodsFirstClassList: '/goodsClass/goodsFirstClassList',
  // 获取下级类目
  fgetChildClassList: '/goodsClass/getChildClassList',
  // 类目修改
  handelGoodsChild: '/goodsClass/edit',
  // 类目新增
  saveGoodsChild: '/goodsClass/save',
  // 删除类目
  deleteGoodsInfo: '/goodsClass/delete'
}

export default {
  /**
   * @description 物品 物品管理
   */
  getGoodsList(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.getGoodsList, params)
  },
  GoodTree(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.GoodTree, params)
  },
  saveGoodsList(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.saveGoodsList, params)
  },
  deleteGoodsList(params) {
    return Api.del(baseURL.seeGoodsService + apiURL.deleteGoodsList, params)
  },
  deleteGood(params) {
    return Api.del(baseURL.seeGoodsService + '/goods/jxc/delete', params)
  },
  getGoodsDetailV2(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.getGoodsDetailV2, params)
  },
  editGoodsInfoV2(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.editGoodsInfoV2, params)
  },
  saveGoodsInfo(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.saveGoodsInfo, params)
  },
  editGoodsInfo(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.editGoodsInfo, params)
  },
  getAllGoods(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.getAllGoods, params)
  },
  addGoodsSpec(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.addGoodsSpec, params)
  },
  getGoodsListByClassId(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.getGoodsListByClassId, params)
  },
  getGoodsInfoByIdAndSpec(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.getGoodsInfoByIdAndSpec, params)
  },
  /**
   * @description  物品 类目管理
   */
  fgoodsFirstClassList(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.fgoodsFirstClassList, params)
  },
  fgetChildClassList(params) {
    return Api.get(baseURL.seeGoodsService + apiURL.fgetChildClassList, params)
  },
  handelGoodsChild(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.handelGoodsChild, params)
  },
  saveGoodsChild(params) {
    return Api.post(baseURL.seeGoodsService + apiURL.saveGoodsChild, params)
  },
  deleteGoodsInfo(params) {
    return Api.del(baseURL.seeGoodsService + apiURL.deleteGoodsInfo, params)
  },

  // /goodsClass/tree
  getGoodsClass(params) {
    return Api.get(baseURL.seeGoodsService + '/goodsClass/tree', params)
  },
  /**
   * @tag 物品
   * @description 选择物品列表
   */
  goodsSelectGoodsList(params) {
    return Api.post(`${baseURL.seeGoodsService}/goods/selectGoodsList`, params, { isShowMessage: false })
  }

}
