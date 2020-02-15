import request from "../../utils/axios"


/**
 * 修改文章状态
 * @param params {articleId，articleStatus}
 * @returns {*}
 */
export const saveArticleStatus = (params) => request.request({
  api: '/admin/articles/' + params.articleId + "/" + params.articleStatus,
  method: 'put'
});

/**
 * 获取文章列表
 * @param params
 * @returns {*}
 */
export const getArticles = (params) => request.request({
  api: '/admin/articles',
  method: 'get',
  params: params
});


/**
 * 修改文章信息
 * @param params {articleId}
 * @returns {*}
 */
export const saveArticle = (params) => request.request({
  api: '/admin/articles/' + params.articleId,
  method: 'put',
  params: params
});
