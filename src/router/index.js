import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home/home'
import {requireContextDo} from "../utils/scanUtil";


Vue.use(VueRouter);


const routes = []
//批量导入路由
let files = require.context('.', true, /.js$/);
const modules = requireContextDo(files,['./index.js']);

Object.keys(modules).forEach(key => {
  let module = modules[key];
  routes.push(...module);
})
console.log('批量导入路由',routes);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
