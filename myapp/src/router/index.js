import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/router/home/home'
import Cinema from '@/router/cinema/cinema'
import Mine from '@/router/mine/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect: '/home'},
    Home,
    Cinema,
    Mine
  ]
})
