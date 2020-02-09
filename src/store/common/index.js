import getters from './getters'
import mutations from './mutations'
import actions from './actions'



const state = {
  //用于标记key，刷新路由
  active: 1,

  //是否是手机模式访问
  isMobile: false
}

// 向外暴露该对象(系统状态管理)
export default {
  state,
  getters,
  mutations,
  actions
}
