let state = {
  navList: []
}
let getters = {

}
let mutations = {
  // 储存按钮权限
  changeNavList (state, action) {
    state.navList = action.type
  }
}
let actions = {

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
