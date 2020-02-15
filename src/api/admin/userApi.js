import request from "../../utils/axios"


/**
 * 获取用户列表
 * @param params
 * @returns {*}
 */
export const getUsers = (params) => request.request({
  api: '/admin/user',
  method: 'get',
  params: params
});


/**
 * 修改用户状态
 * @param params
 * userId
 * userStatus
 * @returns {*}
 */
export const saveUserStatus = (params) => request.request({
  api: '/admin/user/' + params.userId + "/" + params.userStatus,
  method: 'put'
});


/**
 * 修改用户信息
 * @param params
 * @returns {*}
 */
export const saveUserInfo = (params) => request.request({
  api: '/admin/user/' + params.userId,
  method: 'put',
  params: params
});
