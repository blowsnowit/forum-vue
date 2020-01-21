import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'


Vue.config.productionTip = false
Vue.prototype.$const = require('./utils/const');


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
