import request from "../../utils/axios"


/**
 * 获取评论列表
 * @param params
 * @returns {*}
 */
export const getComments = (params) => request.request({
  api: '/admin/comment',
  method: 'get',
  params: params
});

/**
 * 修改文章评论状态
 * @param params articleCommentId,articleCommentStatus
 * @returns {*}
 */
export const saveArticleCommentStatus = (params) => request.request({
  api: '/admin/comment/' + params.articleCommentId + "/" + params.articleCommentStatus,
  method: 'put'
});

/**
 * 删除评论
 * @param articleCommentId 评论id
 * @returns {*}
 */
export const delComment = (articleCommentId) => request.request({
  api: '/admin/comment/' + articleCommentId,
  method: 'delete'
});
