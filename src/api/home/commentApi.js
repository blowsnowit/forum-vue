import request from "../../utils/axios"


/**
 * 发布评论
 * @param params
 * @returns {*}
 */
export const addArticleComment = (params) => request.request({
  api: 'comment/' + params.articleId,
  method: 'post',
  params: params
});

/**
 * 修改评论
 * @param params
 * @returns {*}
 */
export const editArticleComment = (params) => request.request({
  api: 'comment/' + params.articleCommentId,
  method: 'put',
  params: params
});


/**
 * 删除评论
 * @param articleCommentId 评论id
 * @returns {*}
 */
export const delArticleComment = (articleCommentId) => request.request({
  api: 'comment/' + articleCommentId,
  method: 'delete'
});
