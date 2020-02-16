import request from "../../utils/axios"


/**
 * 获取我的通知配置列表
 * @returns {*}
 */
export const getNotifyConfigs = () => request.request({
  api: 'notifyConfig/' ,
  method: 'get'
});


/**
 * 已读我的指定通知
 * @param params 通知列表
 * @returns {*}
 */
export const saveNotifyConfigs = (params) => request.request({
  api: 'notifyConfig/',
  method: 'put',
  params: params
});
