import request from "../../utils/axios"


/**
 * 获取指定标签信息
 * @param tagName
 * @returns {*}
 */
export const getTagInfo = (tagName) => request.request({
  api: 'tag/' + tagName,
  method: 'get'
});
