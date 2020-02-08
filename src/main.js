import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/styles/index.styl'
import './plugins/markdown.js'


Vue.config.productionTip = false;
//引入常量
Vue.prototype.$const = require('./utils/const').default;
Vue.prototype.$utils = require('./utils/index').default;
Vue.prototype.gggg = "琳飞飞是傻鸡";


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
