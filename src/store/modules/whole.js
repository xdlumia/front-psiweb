const state = {
  navList: []
}
const getters = {

}
const mutations = {
  // 储存按钮权限
  changeNavList(state, action) {
    state.navList = action.type
  }
}
const actions = {

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
