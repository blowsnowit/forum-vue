import request from "../../utils/axios"


/**
 * 获取话题列表
 * @param params
 * @returns {*}
 */
export const getTopics = (params) => request.request({
  api: '/admin/topic',
  method: 'get',
  params: params
});


