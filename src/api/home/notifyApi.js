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
 * 已读我的指定通知
 * @param userNotifyId 通知id
 * @returns {*}
 */
export const readNotify = (userNotifyId) => request.request({
  api: 'notify/' +  userNotifyId,
  method: 'put'
});

/**
 * 已读我的全部通知列表
 * @returns {*}
 */
export const readAllNotify = () => request.request({
  api: 'notify/all',
  method: 'put'
});

