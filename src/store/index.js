import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { state, getters, mutations, actions } from './root'
import modules from './modules'
Vue.use(Vuex)
const store = new Store({
  state,
  getters,
  mutations,
  actions,
  strict: true,
  modules
})
export default store
