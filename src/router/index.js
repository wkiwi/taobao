import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Kuai9 from '@/pages/kuai9/Kuai9'
import Classify from '@/pages/classify/Classify'
import User from '@/pages/user/User'
import Detail from '@/pages/detail/Detail'
import Search from '@/pages/search/Search'
import SearchList from '@/pages/searchlist/SearchList'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/kuai9',
      name: 'Kuai9',
      component: Kuai9
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchlist/:key',
      name: 'SearchList',
      component: SearchList
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
