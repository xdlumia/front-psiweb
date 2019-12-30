/*
 * @Author: 高大鹏
 * @Date: 2019-10-25 11:23:44
 * @LastEditors  : web.王晓冬
 * @LastEditTime : 2019-12-30 09:40:00
 * @Description: description
 */
import Api from 'see-web-basic/dist/api/index'
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
  navData: [],
  backlogNum: 0,
  userInfo: {},
}
export const getters = {
  navData: state => state.navData
}
export const mutations = {
  setUserInfo(state, obj) {
    state.userInfo = JSON.parse(JSON.stringify(obj))
    // state.userInfo = obj
  },
  setNavData(state, list) {
    list = list || JSON.parse(localStorage.getItem('navData')) || []
    const navList = recursionNav(list).concat(['/home', '/404', '/403', '/500', '/login', '/todo'])
    state.navData = navList
  },
  setBacklogNum(state, num) {
    state.backlogNum = num
  }
}
export const actions = {
  setNav({ commit }) {
    commit('setNavData')
  },
  backlogNum({ commit }) {
    Api.seePsiCommonService.homePageQueryList().then(res => {
      const num = (res.data || []).reduce((val, item) => {
        return val + item.processNum
      }, 0)
      commit('setBacklogNum', num)
    })
  }
}
