import * as apis from '@/api/commonApi'

//自动注册接口actions
const actions = {};
for (let key of Object.keys(apis)){
  actions[key] = (store, params) => {
    return apis[key](params);
  }
}

/**
 * 文件上传
 * @param store
 * @param file 文件
 * @returns {*}
 */
actions.uploadImage = (store, file) => {
  let formData = new FormData();
  formData.append("file",file);
  return apis['uploadImage'](formData);
}


export default actions
