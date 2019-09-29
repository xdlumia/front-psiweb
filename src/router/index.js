import Vue from 'vue'
import Router from 'vue-router'

import {systemRoute} from 'see-web-system'

// 登录
import Login from '@/components/login'
import Example from '@/views/example'
// 框架
import Layout from '@/components/layout'
Vue.use(Router)

let routes = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'a系统平台'
    }
  },
  {
    path: '/',
    component: Layout,
    // redirect: '/login',
    children: [
      // 示例页面
      {
        path: '/example',
        name: '/example',
        component: Example,
        meta: {
          parent: '示例页面',
          title: '示例页面'
        }
      },
      ...Object.values(systemRoute)
    ]
  },
  {
    path: '*', // 如果找不到页面跳转到404
    redirect: '/404'
  }
]

if (process.env.NODE_ENV === 'development') {
  const Example = () => import('@/views/example')

  routes[1].children.unshift({
    path: '/example',
    name: 'example',
    component: Example
  })
}

export default new Router({
  mode: 'history',
  routes
})
