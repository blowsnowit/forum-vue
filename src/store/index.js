import Vue from 'vue'
import Vuex from 'vuex'
import {requireContextDo} from "../utils/scanUtil";

Vue.use(Vuex);

//批量导入store模块
let files = require.context('.', true, /index.js$/);
const modules = requireContextDo(files,['./index.js']);

export default new Vuex.Store({
  // 在开发模式下开启严格模式（严格模式会记录状态变更）,只能使用mutation函数修改 state 状态
  strict: process.env.NODE_ENV !== 'production',
  // 模块式开发
  modules: modules
})

