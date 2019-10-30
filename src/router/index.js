/*
 * @Author: web.王晓冬
 * @Date: 2019-09-24 14:11:28
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-30 15:09:18
 * @Description: 路由文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import {
  systemRoute
} from 'see-web-system'
// 登录
import Login from '@/components/login'


// 采购
import OrderRoute from '@/views/order/route.js'
import ContractRoute from '@/views/contract/route.js'

// 销售路由
import salesRoute from '@/views/sales/route.js'


// 框架
import Layout from '@/components/layout'

// 库房路由
import storageRoute from '@/views/storage/route.js'

// TODO 使用这种方式报错 谁懂看一下?
// 解决方案 .eslintrc.js 添加 parserOptions:{parser: 'babel-eslint'}
// https://github.com/vuejs/eslint-plugin-vue/issues/204
// const college = () => import('@/views/contents/college') // 店长服务

// 首页
const Home = () => import('@/views/home')

//  辅助管理
import assistant from '@/views/asistant/route'

import basicSetting from '@/views/basicSetting/route'

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
    ...assistant, // 辅助管理模块
    ...Object.values(systemRoute), // 系统设置
    ...salesRoute, // 销售路由配置
    ...OrderRoute, // 采购模块路由配置
    ...ContractRoute, // 合同模块路由配置
    ...storageRoute, // 库房模块路由配置
    ...basicSetting // 基础配置
    ]
  },
  // 404
  {
    path: '*', // 如果找不到页面跳转到404
    redirect: '/404'
  }
  ]
})
