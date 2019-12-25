/*
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:59:21
 * @LastEditors  : 赵伦
 * @LastEditTime : 2019-12-25 14:27:02
 * @Description: description
 */
import quotation from './quotation' // 报价单设置
import facilitator from './facilitator' // 服务商
import commodityLibrary from './commodityLibrary' // 商品库
import goodsCategory from './goodsCategory' // 商品管理
import objective from './objective' // 目标管理
import promotion from './promotion' // 促销管理
import storeroom from './storeroom' // 库房

export default [
  {
    path: '/psi/pricelist', // 报价单设置
    name: 'pricelist',
    component: quotation,
    meta: {
      parent: '基础配置',
      title: '报价单设置'
    }
  },
  {
    path: '/psi/serviceprovider', // 服务商
    name: '/psi/serviceprovider',
    component: facilitator,
    meta: {
      parent: '基础配置',
      title: '服务商'
    }
  },
  {
    path: '/psi/goods', // 商品库
    name: '/psi/goods',
    component: commodityLibrary,
    meta: {
      parent: '基础配置',
      title: '商品库'
    }
  },
  {
    path: '/psi/goodskind', // 商品管理
    name: '/psi/goodskind',
    component: goodsCategory,
    meta: {
      parent: '基础配置',
      title: '商品管理'
    }
  },
  {
    path: '/psi/objectives', // 目标管理
    name: '/psi/objectives',
    component: objective,
    meta: {
      parent: '基础配置',
      title: '目标管理'
    }
  },
  {
    path: '/psi/promotion', // 促销管理
    name: '/psi/promotion',
    component: promotion,
    meta: {
      parent: '基础配置',
      title: '促销管理'
    }
  },
  {
    path: '/psi/warehouse', // 库房
    name: '/psi/warehouse',
    component: storeroom,
    meta: {
      parent: '基础配置',
      title: '库房'
    }
  },
  {
    path: '/psi/productConfig', // 整机配置
    name: '/psi/productConfig',
    component: ()=>import('./productConfig'),
    meta: {
      parent: '基础配置',
      title: '整机配置单'
    }
  }
]

