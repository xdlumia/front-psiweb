// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueDND from 'awe-dnd'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 项目主体css
import './assets/css/style.css'
import './api'
import './utils/verify.js'
import {globalConfig} from 'see-web-basic'
// see-web-system公共包的vuex 不使用see-web-system可以删除
import { systemStoreConfig } from 'see-web-system'
Vue.use(systemStoreConfig)
Vue.use(VueDND)
Vue.use(ElementUI)
Vue.use(globalConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.router = router
