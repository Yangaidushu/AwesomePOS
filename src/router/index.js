import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Vip from '@/components/page/Vip'
import Store from '@/components/page/Store'
import Setting from '@/components/page/Setting' 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/Vip',
      name:'Vip',
      component:Vip,
    },
    {
      path:'/Store',
      name:'Store',
      component:Store
    },
    {
      path:'/Setting',
      name:'Setting',
      component:Setting
    }
  ]
})
