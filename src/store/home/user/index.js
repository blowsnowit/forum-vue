import getters from './getters'
import mutations from './mutations'
import actions from './actions'



const state = {
  a: 1
}

// 向外暴露该对象(系统状态管理)
export default {
  //模块化
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
