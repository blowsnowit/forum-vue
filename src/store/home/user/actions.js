import * as api from '@/api/home/userApi'

const actions = {
  /**
   * 获取文章列表
   * @param store
   * @param params
   * @returns {*}
   */
  getArticlesAction: (store, params) => {
    return api.getArticles(params);
  },

  /**
   * 获取指定文章
   * @param store
   * @param params 文章id
   * @returns {*}
   */
  getArticleAction: (store, params) => {
    return api.getArticle(params);
  },

  /**
   * 发布文章
   * @param store
   * @param params
   * @returns {*}
   */
  addArticleAction: (store, params) => {
    return api.addArticle(params);
  },

  /**
   * 编辑文章
   * @param store
   * @param params
   * @returns {*}
   */
  saveArticleAction: (store, params) => {
    return api.saveArticle(params);
  },
};


export default actions
