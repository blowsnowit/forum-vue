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



/**
 * 修改话题描述
 * @param params topicName  topicDesc
 * @returns {*}
 */
export const saveTopicDesc = (params) => request.request({
  api: '/admin/topic/desc/' + params.topicName,
  method: 'put',
  params: params
});

