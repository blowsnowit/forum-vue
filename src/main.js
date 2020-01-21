import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/styles/index.styl'

Vue.config.productionTip = false;
//引入常量
Vue.prototype.$const = require('./utils/const');

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
