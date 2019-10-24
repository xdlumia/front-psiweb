/*
 * @Author: web.王晓冬
 * @Date: 2019-09-24 14:11:28
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-09-30 10:56:17
 * @Description: 路由文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import { systemRoute, systemRouteConfig } from 'see-web-system'
import { customerServiceRoute } from 'see-web-customer-service'
// 登录
import Login from '@/components/login'
import common from '@/views/businessSetting/common'
import recharge from '@/views/businessSetting/recharge'

// 采购
import BuyingRequisition from '@/views/procurement/buyingRequisition'

// 框架
import Layout from '@/components/layout'
const routers = [{ component: common, componentName: 'common', label: '公共' }]
systemRouteConfig(systemRoute.BusinessSetting, routers)

const College = () => require('@/views/contents/college') // 店长服务

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
    children: [{
      path: '/contents/college',
      component: College,
      meta: {
        parent: '房源管理',
        title: '出租商铺'
      }
    }, {
      path: '/contents/college',
      component: College,
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
      path: '/procurement/buyingRequisition',
      name: '/procurement/buyingRequisition',
      component: BuyingRequisition,
      meta: {
        parent: '采购',
        title: '采购请购单'
      }
    },
    ...Object.values(systemRoute), // 系统设置
    ...Object.values(customerServiceRoute)
    ]
  },
  // 404
  {
    path: '*', // 如果找不到页面跳转到404
    redirect: '/404'
  }
  ]
})
