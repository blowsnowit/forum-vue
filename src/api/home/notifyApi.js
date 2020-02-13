import request from "../../utils/axios"


/**
 * 获取我的通知列表
 * @param params
 * @returns {*}
 */
export const getNotifys = (params) => request.request({
  api: 'notify/' ,
  method: 'get',
  params: params
});

/**
 * 获取我的通知列表
 * @param userNotifyId 通知id
 * @returns {*}
 */
export const readNotify = (userNotifyId) => request.request({
  api: 'notify/' +  userNotifyId,
  method: 'put'
});

/**
 * 获取我的通知列表
 * @returns {*}
 */
export const readAllNotify = () => request.request({
  api: 'notify/all',
  method: 'put'
});
