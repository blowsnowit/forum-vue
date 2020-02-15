import request from "../../utils/axios"


/**
 * 获取标签列表
 * @param params
 * @returns {*}
 */
export const getTags = (params) => request.request({
  api: '/admin/tag',
  method: 'get',
  params: params
});


