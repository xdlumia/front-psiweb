/*
 * @Author: web.王晓冬
 * @Date: 2019-09-24 14:11:28
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-28 17:20:19
 * @Description: 路由文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import {
  systemRoute,
  systemRouteConfig
} from 'see-web-system'
// 登录
import Login from '@/components/login'


// 采购
import OrderRoute from '@/views/order/route.js'
import ContractRoute from '@/views/contract/route.js'

// 框架
import Layout from '@/components/layout'

// TODO 使用这种方式报错 谁懂看一下?
// 解决方案 .eslintrc.js 添加 parserOptions:{parser: 'babel-eslint'}
// https://github.com/vuejs/eslint-plugin-vue/issues/204
// const college = () => import('@/views/contents/college') // 店长服务

import common from '@/views/businessSetting/common'
import recharge from '@/views/businessSetting/recharge'
// import Quote from '@/views/sales/quote'

// 库房
// 销售 销售单
import sales from '@/views/storage/sales'

const routers = [{
  component: common,
  componentName: 'common',
  label: '公共'
}]
systemRouteConfig(systemRoute.BusinessSetting, routers)

// 首页
const Home = () => import('@/views/home')

//  辅助管理
const Tags = () => import('@/views/asistant/tags') // 标签管理
const BusinessSetting = () => import('@/views/asistant/businessSetting') // 业务设置管理
const TemplateManage = () => import('@/views/asistant/templateManage') // 模板管理
const FormManagement = () => import('@/views/asistant/formManagement') // 表单管理

// 解决多次点击同一路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '进销存管理系统'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      component: Home,
      meta: {
        parent: '首页',
        title: '首页'
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
    {
      path: '/asistant/tags', // 标签管理
      name: '/asistant/tags',
      component: Tags,
      meta: {
        parent: '辅助管理',
        title: '标签管理'
      }
    },
    {
      path: '/asistant/businessSetting', // 业务设置
      name: '/asistant/businessSetting',
      component: BusinessSetting,
      meta: {
        parent: '辅助管理',
        title: '业务设置'
      }
    },
    {
      path: '/asistant/formManagement', // 表单管理;
      name: '/asistant/formManagement',
      component: FormManagement,
      meta: {
        parent: '辅助管理',
        title: '表单管理'
      }
    },
    {
      path: '/asistant/templateManage', // 模板管理;
      name: '/asistant/templateManage',
      component: TemplateManage,
      meta: {
        parent: '辅助管理',
        title: '模板管理'
      }
    },
    ...Object.values(systemRoute), // 系统设置
    ...OrderRoute, // 采购模块路由配置
    ...ContractRoute // 合同模块路由配置
    ]
  },
  // 404
  {
    path: '*', // 如果找不到页面跳转到404
    redirect: '/404'
  }
  ]
})
