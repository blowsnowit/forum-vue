import request from "../../utils/axios"


/**
 * 发布文章
 * @param params
 * @returns {*}
 */
export const addArticle = (params) => request.request({
  api: 'articles',
  method: 'post',
  params: params
});

/**
 * 保存文章
 * @param articleId
 * @param params
 * @returns {*}
 */
export const saveArticle = (params) => request.request({
  api: 'articles/' + params.articleId,
  method: 'put',
  params: params
});

/**
 * 修改文章状态
 * @param params
 * @returns {*}
 */
export const saveArticleStatus = (params) => request.request({
  api: 'articles/' + params.articleId + "/" + params.articleStatus,
  method: 'put'
});

/**
 * 获取文章列表
 * @param params
 * @returns {*}
 */
export const getArticles = (params) => request.request({
  api: 'articles',
  method: 'get',
  params: params
});

/**
 * 获取热门文章列表
 * @param params
 * @returns {*}
 */
export const getHotArticles = (params) => request.request({
  api: 'articles/hot',
  method: 'get',
  params: params
});


/**
 * 获取文章信息
 * @param articleId
 * @returns {*}
 */
export const getArticle = (articleId) => request.request({
  api: 'articles/' + articleId,
  method: 'get'
});

/**
 * 添加文章阅览记录
 * @param articleId
 * @returns {*}
 */
export const addArticleView = (articleId) => request.request({
  api: 'articles/view/' + articleId,
  method: 'post'
});
