import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import("@/views/home/index")
    },
    {
      path: '/interactiveFile',
      name: 'interactiveFile',
      component: ()=>import("@/views/interactiveFile/index")
    }
  ]
})
