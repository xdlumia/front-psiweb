/*
 * @Author: web.王晓冬
 * @Date: 2019-09-24 14:11:28
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2019-10-30 16:29:14
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

// element ui
import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
import router from './router' // 路由
import './assets/css/common.css'
import './assets/css/editor.css'
import './assets/css/iconfont.css'
import './utils/verify.js'
import './utils/anchor.js'
import citys from './utils/citys'
import './api'
// basic配置
import { globalConfig } from 'see-web-basic'
import { systemStoreConfig } from 'see-web-system'
// 公共组件
import commonComponents from './components/index'
import indexComponents from './views/index'
// import seeWebCustomerService from 'see-web-customer-service'

// 修改element ui 默认参数
ElementUI.Image.props.fit = { default: 'cover', type: String }

Vue.prototype.$store = store;
// Vue.use(seeWebCustomerService)
Vue.use(citys)
Vue.use(systemStoreConfig)
Vue.use(ElementUI)
Vue.use(globalConfig)
Vue.use(commonComponents)
Vue.use(indexComponents)
Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.router = router

