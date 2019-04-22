import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home.vue'
import Vip from '@/page/Vip.vue'
import Kaiyuan from '@/page/Kaiyuan.vue'
Vue.use(Router)
const router = new Router({
  
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
      path: '/Home',
      name: 'Home',
      component: Home,
    },{
        path: '/',
        name: 'Vip',
        component: Vip,
      },{
        path: '/Kaiyuan',
        name: 'Kaiyuan',
        component: Kaiyuan,
      },]
})
export default router
