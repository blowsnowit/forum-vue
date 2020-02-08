import request from "../../utils/axios"


/**
 * 登录
 * @param params
 * @returns {*}
 */
export const login = (params) => request.request({
  api: '/user/login',
  method: 'post',
  params: params
});

/**
 * 注册
 * @param params
 * @returns {*}
 */
export const register = (params) => request.request({
  api: '/user/register',
  method: 'post',
  params: params
});

/**
 * 获取用户信息
 * @param userId
 * @returns {*}
 */
export const getUserInfo = (userId) => request.request({
  api: '/user/'+userId,
  method: 'get'
});

/**
 * 更新用户个人资料
 * @param params
 * @returns {*}
 */
export const updateUserInfo = (params) => request.request({
  api: '/user',
  method: 'put',
  params: params
});

/**
 * 更新用户密码
 * @param params
 * @returns {*}
 */
export const updateUserPassword = (params) => request.request({
  api: '/user/password',
  method: 'put',
  params: params
});
