import request from "../utils/axios";

/**
 * 获取图片验证码
 * @returns {*}
 */
export const captch = () => request.request({
  api: '/common/captch',
  method: 'get'
});

/**
 * 发送邮件验证码
 * 注意发送前需要验证图片验证码
 * @param params
 * @returns {*}
 */
export const sendEmailCode = (params) => request.request({
  api: '/common/sendEmailCode',
  method: 'post',
  params: params
});

/**
 * 上传图片
 * @param params
 * @returns {*}
 */
export const uploadImage = (params) => request.request({
  api: '/common/uploadImage',
  method: 'post',
  params: params
});
