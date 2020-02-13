import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/styles/index.styl'
import './plugins/codemirror.js'
import 'highlight.js/styles/github.css' //样式文件

Vue.config.productionTip = false;
//引入常量
Vue.prototype.$const = require('./utils/const').default;
Vue.prototype.$utils = require('./utils/index').default;


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
