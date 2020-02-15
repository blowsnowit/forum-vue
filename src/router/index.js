import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './home/home'
import {requireContextDo} from "../utils/scanUtil";
import store from '../store'
import {Message, Loading} from 'element-ui';

Vue.use(VueRouter);


const routes = []
//批量导入路由
let files = require.context('.', true, /.js$/);
const modules = requireContextDo(files,['./index.js']);
console.log(modules);
Object.keys(modules).forEach(key => {
  console.log(key);
  let module = modules[key];
  console.log(module);
  routes.push(...module);
})
console.log(routes);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫，路由时检查用户是否登录，若无登录信息，指向登录界面
router.beforeEach((to, from, next) => {
  //判断是否记住密码
  if (localStorage.getItem("login_user_info") && !store.getters['User/getIsLogin']){
    store.commit("User/LOGIN",JSON.parse(localStorage.getItem("login_user_info")));
  }
  //检查登录状态
  if (to.meta.auth){
    //需要登录
    if (!store.getters['User/getIsLogin']){
      Message.info('需要登录后在操作');
      router.replace({
        path: "/",
        query:{
          needlogin: true
        }
      }).catch(err => {

      })
      return false;
    }
  }
  next();
});
export default router
