/*
 * @Author: web.王晓冬
 * @Date: 2019-09-24 14:11:28
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-21 16:21:28
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
// basic配置
import { globalConfig } from 'see-web-basic'
import { systemStoreConfig } from 'see-web-system'


import './assets/css/common.scss'
import './assets/css/editor.css'
// import './assets/css/iconfont.css'
import './utils/verify.js'
import './utils/anchor.js'
import './utils/utils'
import citys from './utils/citys'

import './api'
ElementUI.Input.render = (function (old) {
  return function () {
    if (this.$attrs.placeholder === undefined) {
      this.$attrs.placeholder = '请输入'
    }

    return old.apply(this, arguments)
  }
})(ElementUI.Input.render)


// 公共组件
import commonComponents from './components/index'
import indexComponents from './views/index'
import formComponents from './components/formComponents/index'

import Schema from 'async-validator';
// 修改form必填项验证的默认提示
Schema.messages.required = () => '此处是必填项'
// import seeWebCustomerService from 'see-web-customer-service'

// 修改element ui 默认参数
ElementUI.Image.props.fit = { default: 'cover', type: String }

// 输入框默认显示字数
ElementUI.Input.props.showWordLimit.default = true
// 表格单行显示超出隐藏
// ElementUI.TableColumn.props.showOverflowTooltip.default = true

Vue.prototype.$store = store;
Vue.mixin({
  methods:{
    $getApi(path){
      return path.split('.').reduce((data,path)=>data[path],this.$api)
    }
  }
})
// Vue.use(seeWebCustomerService)
Vue.use(citys)
Vue.use(systemStoreConfig)
Vue.use(ElementUI)
Vue.use(globalConfig)
Vue.use(commonComponents)
Vue.use(indexComponents)
Vue.use(formComponents)
Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
window.router = router

