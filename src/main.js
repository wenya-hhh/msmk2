import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 引入rem
import './util/rem'
// 引入过滤器   方法
import './util/filters'
import './util/plugins'

import common from "./util/index";
Object.keys(common).forEach(key => {
    Vue.filter(key, common[key]);
});
  
import './util/vant'
// 引入axios
import http from './util/request'
import './assets/common.css'

import 'vant/lib/index.css'
// 二维码
import QRCode from 'qrcodejs2';
Vue.prototype.$qrCode = QRCode;


import {
  gets,
  posts
} from './util/api'

Vue.prototype.$http = http
Vue.prototype.$get = gets
Vue.prototype.$post = posts

router.beforeEach((to, from, next) => {
  // sessionStorage.setItem('fullPath', from.fullPath)
  // console.log(to, from);
  if (to.name == 'login') {
    if (localStorage.token) {
      next(from.fullPath)
    }
    if (to.name == 'teacher') {
      next('/login')
    }
    next()
  }
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')