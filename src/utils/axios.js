import axios from 'axios';
import {Message, Loading} from 'element-ui';
import router from '@/router'
import store from '@/store'
import Const from '@/utils/const'
import qs from 'qs'
let loading;

// 是否是生产环境，日志只对非生成环境生效
let noProduction = process.env.NODE_ENV !== 'production';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;           // 多环境地址
axios.defaults.timeout = 45000;                   // 响应时间
// axios.defaults.withCredentials = true;                 // 允许跨域请求Cookie
// axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

const CODE_SUCCESS = Const.CODE_SUCCESS;
const CODE_NO_LOGIN = Const.CODE_NO_LOGIN;

// 全局请求拦截器配置
/**
 * 请求拦截器
 */
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 将token加入请求头里面
  config.headers[Const.AUTHORIZATION] = store.getters['User/getToken'] || "";
  if (noProduction) {
    console.log("请求配置：", config);
  }
  return config;
}, function (error) {
  // Do something with request error
  if (noProduction) {
    console.log("请求错误");
    console.log(error);
  }
});

/**
 * 响应拦截器
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (noProduction) {
    console.log("拦截器返回数据", response);
  }
  if (loading != null) {
    loading.close();
  }
  if (response.data.resultCode === CODE_NO_LOGIN) {
    Message({
      message: response.data.message,
      type: 'error'
    });
    store.dispatch('signOut');
    router.push({
      path: '/',
      query: {needlogin: true}
    });
  }
  return response;
}, function (error) {
  // Do something with response error
  if (loading != null) {
    loading.close();
  }
  if (noProduction) {
    console.log("拦截器返回错误:", error);
  }
});

/**
 * 默认向外暴露一个请求对象，不建议全部import，尽量按需引入
 */
export default {

  /**
   * 请求之前的检查
   *  校验参数的正确性，以及loading的处理
   * @param options
   */
  requestBeforeCheck(options) {
    if (!options.api) {
      throw new Error('api 不能为空');
    }
    // 不传递默认开启loading
    if (options.loadingVisble == null) {
      options.loadingVisble = true
    }
    if (!options.loadingText) {
      options.loadingText = '加载中...'
    }
    if (!options.loading) {
      options.loading = {
        text: options.loadingText
      }
    }
    if (options.loadingVisble) {
      loading = Loading.service(options.loading);
    }
  },

  request(options){
    this.requestBeforeCheck(options);
    return new Promise((resolve, reject) => {
      let request = {
        url: options.api,
        method: options.method,
      }
      if (options.method === "get"){
        request.params = options.params;
      }else{
        request.data = options.params;
      }
      axios.request(request).then(response=>{
        //请求成功
        if (response != null && response.status === 200) {
          if (response.data.code === CODE_SUCCESS) {
            resolve(response.data);
          } else {
            if (!options.noMessage){
              Message.error(response.data.message);
            }
            reject(response.data.message);
          }
        } else {
          if (noProduction) {
            console.log("requestPost.then ！= 200：", response);
          }
          Message.error("网络请求发生异常！");
          reject("网络请求发生异常！");
        }
      }, error => {
        reject(error);
      }).catch(throws=>{
        if (noProduction) {
          console.log("requestPost.catch返回：", throws);
        }
        Message.error("网络异常！");
        reject("网络异常！")
      })
    })
  },
  /**
   * post请求
   * @param options 请求数据对象
   * @returns {Promise<any>}
   */
  requestPost(options) {
    //如果后端使用 requestbody 则 注释这句
    //options.param = qs.stringify(options.param);
    options.method = "post";
    return this.request(options);
  },

  /**
   * get请求
   * @param options   请求数据对象
   * @returns {Promise<any>}
   */
  requestGet(options) {
    options.method = "get";
    return this.request(options);
  },
}
