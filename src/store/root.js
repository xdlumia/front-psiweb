/*
 * @Author: 高大鹏
 * @Date: 2019-10-25 11:23:44
 * @LastEditors: 高大鹏
 * @LastEditTime: 2019-11-04 16:39:05
 * @Description: description
 */

// 获取所有菜单列表
function recursionNav(list) {
  const result = [].concat(...list.map(item => {
    if (item.children && item.children.length) {
      return [].concat(...recursionNav(item.children).concat(item.url))
    } else {
      return item.url
    }
  })).filter(item => item)
  return result
}
export const state = {
  navData: []
}
export const getters = {
  navData: state => state.navData
}
export const mutations = {
  setNavData(state, list) {
    list = list || JSON.parse(localStorage.getItem('navData')) || []
    const navList = recursionNav(list).concat(['/home', '/404', '/403', '/500', '/login'])
    state.navData = navList
  }
}
export const actions = {
  setNav({ commit }) {
    commit('setNavData')
  }
}
