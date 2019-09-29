import Vue from 'vue'
import Vuex from 'vuex'
import demoStore from './modules/demo-store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    demoStore
  }
})

Vue.$store = store

export default store
