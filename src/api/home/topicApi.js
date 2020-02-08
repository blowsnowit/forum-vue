import request from "../../utils/axios"


/**
 * 获取指定话题信息
 * @param topicName
 * @returns {*}
 */
export const getTopicInfo = (topicName) => request.request({
  api: 'topic/' + topicName,
  method: 'get'
});

/**
 * 获取热门话题
 * @returns {*}
 */
export const getHotTopics = () => request.request({
  api: 'topic/hot',
  method: 'get'
});
