import request from "../../utils/axios"


/**
 * 获取配置列表
 * @returns {*}
 */
export const getConfigs = () => request.request({
  api: '/admin/config',
  method: 'get'
});

/**
 * 保存配置列表
 * @param params [{key,value}]
 * @returns {*}
 */
export const saveConfigs = (params) => request.request({
  api: '/admin/config',
  method: 'put',
  params: params
});
