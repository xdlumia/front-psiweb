/*
 * @Author: web.王晓冬
 * @Date: 2019-09-24 14:11:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-10-26 10:35:41
 * @Description: 路由文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import { systemRoute, systemRouteConfig } from 'see-web-system'
// 登录
import Login from '@/components/login'


// 采购
import OrderRoute from '@/views/order/route.js'
import ContractRoute from '@/views/contract/route.js'

// 框架
import Layout from '@/components/layout'

// TODO 使用这种方式报错 谁懂看一下?
// const college = () => import('@/views/contents/college') // 店长服务

import common from '@/views/businessSetting/common'
import recharge from '@/views/businessSetting/recharge'
import Quote from '@/views/sales/quote'

//库房
//销售 销售单
import sales from '@/views/storage/sales'

const routers = [{ component: common, componentName: 'common', label: '公共' }]
systemRouteConfig(systemRoute.BusinessSetting, routers)


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '铺脉动后台管理系统'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/house/rent',
    children: [
      {
        path: '/sales/quote',
        component: Quote,
        meta: {
          parent: '内容管理',
          title: '店长学院'
        }
      },
      {
        path: '/businessSetting/recharge',
        name: '/businessSetting/recharge',
        component: recharge,
        meta: {
          parent: '辅助设置',
          title: '充值记录'
        }
      },
      {
        path: '/storage/sales',
        name: '/storage/sales',
        component: sales,
        meta: {
          parent: '库房',
          title: '库房销售单'
        }
      },
      ...Object.values(systemRoute), // 系统设置
      ...OrderRoute, // 采购模块路由配置
      ...ContractRoute, // 合同模块路由配置
    ]
  },
  // 404
  {
    path: '*', // 如果找不到页面跳转到404
    redirect: '/404'
  }
  ]
})
