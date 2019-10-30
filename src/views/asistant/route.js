/*
 * @Author: 高大鹏
 * @Date: 2019-10-30 14:51:57
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-10-30 14:54:02
 * @Description: 辅助管理路由设置
 */
const BusinessSetting = () => import('./businessSetting') // 业务设置管理
const TemplateManage = () => import('./templateManage') // 模板管理
const FormManagement = () => import('./formManagement') // 表单管理

export default [
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
  }
]
