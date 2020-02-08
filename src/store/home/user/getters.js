/**
 * 默认向外暴露的对象
 */
export default {

  getIsLogin(state){
    return state.isLogin;
  },
  getToken(state){
    if (!state.userInfo){
      return null;
    }
    return state.userInfo.token;
  },
  getUserInfo(state){
    return state.userInfo;
  }
}
