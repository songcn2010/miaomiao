// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '../public/common.css'
import '../public/iconfont/iconfont.css'

import Scroller from './components/Scroller/Scroller'
Vue.component('Scroller',Scroller);

import Loader from './components/loader/loader'
Vue.component('Loader',Loader);


import axios from 'axios'

// import Global from '@/components/Global/Global'
// Vue.prototype.Global = Global;
// //其他组件中就可以通过this.Global.apiUrl获取到

//全局过滤器，替换地址中的w·h
Vue.filter("SetWH",(url,arg)=>{
  return url.replace(/w\.h/,arg)
})

Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
